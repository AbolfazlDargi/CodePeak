import React, { use, useEffect, useState } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useSearchParams } from "next/navigation";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveCaseID] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(problem.starterCode);
  const [user] = useAuthState(auth);
  const serachparams = useSearchParams();
  const pid = serachparams.get("pid");

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit the code", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    try {
      const cb = new Function(`retrun ${userCode}`)();
      const result = problems[pid as string].handlerFunction(cb);
      if (result) {
        toast.success("congrats! All tests passed!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 4000);

        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, {
          solvedProblems: arrayUnion(pid),
        });
        setSolved(true);
      }
    } catch (error: any) {
      if (
        error.message.startwith(
          "Error: AssertionError [ERR_ASSERTION]: Expected values to be strictly depp-equal"
        )
      ) {
        toast.error("Some test cases failed. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      } else {
        toast.error("There is an error in your code. Please check again.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem(`codePeak-${pid}`);
    if (user){
      setUserCode(savedCode ? JSON.parse(savedCode) : problem.starterCode)
    } else{
      setUserCode(problem.starterCode)
    }
  }, [pid, problem, user, problem.starterCode]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`codePeak-${pid}`, value);
  };

  return (
    <div className="flex flex-col bg-[rgb(40,40,40)] relative overflow-x-hidden">
      <PreferenceNav />
      <Split
        className="flex flex-col h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        gutterSize={8}
        gutterAlign="center"
        gutter={(index, direction) => {
          const gutter = document.createElement("div");
          gutter.className =
            "bg-[#9ca3af] hover:bg-[#374151] transition-colors duration-200 ease-in-out";
          if (direction === "horizontal") {
            gutter.classList.add("cursor-col-resize", "w-2");
          } else {
            gutter.classList.add("cursor-row-resize", "h-2");
          }
          return gutter;
        }}>
        <div className="w-full overflow-auto">
          <ReactCodeMirror
            value={userCode}
            theme={vscodeDark}
            onChange={onChange}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                TestCase
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 text-white"
                key={example.id}
                onClick={() => setActiveCaseID(index)}>
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.14)] relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                  ${activeTestCaseId === index ? "text-white" : "text-gray-500"}
                  `}>
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-semibold my-10">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-[hsla(0,0%,100%,.1)] border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-[hsla(0,0%,100%,.1)] border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export default Playground;

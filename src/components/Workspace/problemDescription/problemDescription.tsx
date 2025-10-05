import React, { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { DBProblem, Problem } from "@/utils/types/problem";
import RectangleSkeleton from "@/components/Skeleton/RectangleSkeleton";
import CircleSkeleton from "@/components/Skeleton/CircleSkeleton";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { auth, fireStore } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type problemDescriptionProps = {
  problem: Problem;
};

const ProblemDescription: React.FC<problemDescriptionProps> = ({ problem }) => {
  const { loading, currentProblem, problemDiffcultyClass } =
    useGetCurrentProblem(problem.id);

  const { liked, disliked, solved, setData, starred } =
    UseGetUsersDataOnProblem(problem.id);
  const [user] = useAuthState(auth);

  const handleLike = async () => {
    if (!user) {
      toast.error("You mus be logged in to like a problem", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }
    await runTransaction(fireStore, async (transaction) => {
      const userRef = doc(fireStore, "users", user?.uid);
      const problemRef = doc(fireStore, "problems", problem.id);
      const UserDoc = await transaction.get(userRef)
      const ProblemDoc = await transaction.get(problemRef)
      if(!UserDoc.exists() || !ProblemDoc.exists()){
        if(liked){
          transaction.update(userRef,{
            likedProblems: UserDoc.data().likedProblems.filter((pid:string) => pid !== problem.id)
         })
         transaction.update(problemRef,{
          likes: ProblemDoc.data().likes - 1
         })
         setcurrentProblem

        }
          
      }
    });
    
  };

  return (
    <div className="bg-[rgb(40,40,40)] min-h-screen">
      {/* (Tab section) */}
      <div className="flex h-11 w-full items-center pt-2 bg-[rgb(26,26,26)] text-white overflow-x-auto">
        <div className="bg-[rgb(40,40,40)] rounded-t-[5px] px-4 py-2 text-xs cursor-pointer whitespace-nowrap">
          Description
        </div>
      </div>

      {/* main content */}
      <div className="flex h-auto md:h-[calc(100vh-70px)] overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto px-3 md:px-6">
          <div className="p-3 md:p-6">
            {/* Title */}
            <div className="text-base md:text-lg text-white font-medium mb-4">
              {problem?.title}
            </div>

            <div className="text-white text-sm mt-6 md:mt-10">
              {/* Problem info */}
              <div className="mt-4">
                {!loading && currentProblem && (
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <div
                      className={`${problemDiffcultyClass} text-[rgb(0,184,163)] bg-[rgb(5,77,68)] inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}>
                      {currentProblem.difficulty}
                    </div>
                    <div className="rounded p-[3px] text-lg transition-colors duration-200 text-[rgb(44,187,93)]">
                      <BsCheck2Circle />
                    </div>
                    <div
                      className="flex items-center cursor-pointer hover:bg-[hsla(0,0%,100%,.1)] gap-1 rounded p-[3px] text-lg transition-colors duration-200 text-[rgb(179,179,179)]"
                      onClick={handleLike}>
                      {liked && (
                        <AiFillLike className="text-[rgb(10,132,255)]" />
                      )}
                      {!liked && <AiFillLike />}
                      <span className="text-xs">{currentProblem.likes}</span>
                    </div>
                    <div className="flex items-center cursor-pointer hover:bg-[hsla(0,0%,100%,.1)] gap-1 rounded p-[3px] text-lg transition-colors duration-200 text-[rgb(179,179,179)]">
                      <AiFillDislike />
                      <span className="text-xs">{currentProblem.dislike}</span>
                    </div>
                    <div className="flex items-center cursor-pointer hover:bg-[hsla(0,0%,100%,.1)] gap-1 rounded p-[3px] text-lg transition-colors duration-200 text-[rgb(179,179,179)]">
                      <TiStarOutline />
                    </div>
                  </div>
                )}
              </div>

              {/* Loading Skeleton */}
              {loading && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <RectangleSkeleton />
                  <CircleSkeleton />
                  <RectangleSkeleton />
                  <RectangleSkeleton />
                  <CircleSkeleton />
                </div>
              )}

              {/* Problem Statement */}
              <div
                className="text-white text-sm mt-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              />

              {/* Examples */}
              <div className="mt-6">
                {problem.examples.map((example, index) => (
                  <div key={example.id} className="mb-6">
                    <p className="font-medium text-white">
                      Example {index + 1}:
                    </p>
                    <div className="bg-[hsla(0,0%,100%,0.1)] rounded-lg text-[rgba(239,241,246,0.85)] text-sm md:text-base leading-5 mt-3 p-3 md:p-4 whitespace-pre-wrap overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-words">
                        <strong className="text-white">Input: </strong>
                        {example.inputText}
                        <br />
                        <strong className="text-white">Output:</strong>{" "}
                        {example.outputText}
                        <br />
                        {example.explanation && (
                          <>
                            <strong className="text-white">Explanation:</strong>{" "}
                            {example.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="my-6 md:my-8 pb-4">
                <div className="text-white text-sm font-medium">
                  Constraints:
                </div>
                <ul
                  className="text-white ml-4 list-disc mt-2 space-y-1 text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: problem.constraints }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDescription;

function useGetCurrentProblem(problemsId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDiffcultyClass, setProblemDiffcultyClass] =
    useState<string>("");

  useEffect(() => {
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(fireStore, "problems", problemsId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
        setProblemDiffcultyClass(
          problem.difficulty === "Easy"
            ? "bg-olive text-olive"
            : problem.difficulty === "Medium"
            ? "bg-dark-yellow text-dark-yellow"
            : " bg-dark-pink text-dark-pink"
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemsId]);
  return { currentProblem, loading, problemDiffcultyClass };
}

function UseGetUsersDataOnProblem(problemsId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const GetUsersDataOnProblem = async () => {
      const useRef = doc(fireStore, "users", user!.uid);
      const userSnap = await getDoc(useRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          solvedProblems,
          likedProblems,
          dislikedProblems,
          starredPRoblems,
        } = data;
        setData({
          liked: likedProblems.includes(problemsId), // likedProblems["two-sum","jump-game"]
          disliked: dislikedProblems.includes(problemsId),
          starred: starredPRoblems.includes(problemsId),
          solved: solvedProblems.includes(problemsId),
        });
      }
    };

    if (user) GetUsersDataOnProblem();
    return () =>
      setData({ liked: false, disliked: false, starred: false, solved: false });
  }, [problemsId, user]);

  return { ...data, setData };
}

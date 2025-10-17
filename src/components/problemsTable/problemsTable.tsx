"use client";
import React, { useActionState, useEffect, useState } from "react";
import { problems } from "../../mockProblems/problems";
import { BiSolidCheckCircle } from "react-icons/bi";
import { createPortal } from "react-dom";
import { getDoc } from "firebase/firestore";
import { AiFillYoutube } from "react-icons/ai";
import Link from "next/link";
import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";
import { collection, orderBy, query, getDocs, doc } from "firebase/firestore";
import { auth, firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsCheckCircle } from "react-icons/bs";

type problemsTableProps = {
  setLoadingProblems?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<problemsTableProps> = ({
  setLoadingProblems,
}) => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });

  const problems = useGetProblems(setLoadingProblems);
  const solvedProblems = useGetSolvedProblems();

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
      window.addEventListener("keydown", handleEsc);
    };
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <tbody className="text-white">
        {problems.map((doc, idx) => {
          const difficulycolor =
            doc.difficulty === "Easy"
              ? "text-[rgb(44,187,93)]"
              : doc.difficulty === "Medium"
              ? "text-yellow-500"
              : doc.difficulty === "Hard"
              ? "text-red-500"
              : null;
          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-[rgb(40,40,40)]" : ""}`}
              key={doc.id}>
              <th className="px-2 py-4 font-medium whitespace-nowrap text-[rgb(44,187,93)]">
                {solvedProblems.includes(doc.id) && (
                  <BsCheckCircle fontSize={"18"} width={"18"} />
                )}
              </th>
              <td className="px-6 py-4">
                {doc.link ? (
                  <Link
                    href={doc.link}
                    className="hover:text-blue-600 cursor-pointer"
                    target="_blank"></Link>
                ) : (
                  <Link
                    className="hover:text-blue-600 cursor-pointer"
                    href={`/problems/${doc.id}`}>
                    {doc.title}
                  </Link>
                )}
              </td>
              <td className={`px-6 py-4 ${difficulycolor}`}>
                {doc.difficulty}
              </td>
              <td className="px-6 py-4">{doc.catgeroy}</td>
              <td className="px-6 py-4">
                {doc.videoId ? (
                  <AiFillYoutube
                    fontSize={"28"}
                    className="cursor-pointer hover:text-red-600"
                    onClick={() =>
                      setYoutubePlayer({
                        isOpen: true,
                        videoId: doc.videoId as string,
                      })
                    }
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {youtubePlayer.isOpen &&
        createPortal(
          <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50">
            <div
              className="absolute top-0 left-0 w-full h-full bg-black opacity-70"
              onClick={closeModal}
            />
            <div className="relative z-10 w-full max-w-4xl px-6">
              <IoClose
                fontSize={35}
                className="cursor-pointer absolute -top-16 right-0 text-white"
                onClick={closeModal}
              />
              <YouTube
                videoId={youtubePlayer.videoId}
                iframeClassName="w-full min-h-[500px]"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
export default ProblemsTable;

function useGetProblems(
  setLoadingProblems?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problemsData, setProblemsData] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      if (setLoadingProblems) setLoadingProblems(true);
      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);
      const tmp: DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      setProblemsData(tmp);
      if (setLoadingProblems) setLoadingProblems(false);
    };
    getProblems();
  }, [setLoadingProblems]);
  return problemsData;
}

function useGetSolvedProblems() {
  const [solvedProblems, setsolvedProblems] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setsolvedProblems(userDoc.data().solvedProblems);
      }
    };
    if (user) getSolvedProblems();
  }, [user]);
  return solvedProblems;
}

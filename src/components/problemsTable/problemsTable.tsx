"use client";
import React, { useEffect, useState } from "react";
import { problems } from "../../mockProblems/problems";
import { BiSolidCheckCircle } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import Link from "next/link";
import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";
import { collection, orderBy, query, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { DBProblem } from "@/utils/types/problem";

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

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
      window.addEventListener("keydown", handleEsc);

      return () => window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <tbody className="text-white">
        {problems.map((doc, idx) => {
          const difficulycolor =
            doc.difficulty === "Easy"
              ? "text-[rgb(44,187,93)]"
              : doc.difficulty === "Medium"
              ? "text-[rgb(255,192,30)]"
              : "text-red-600";
          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-[rgb(40,40,40)]" : ""}`}
              key={doc.id}>
              <th className="px-2 py-4 font-medium whitespace-nowrap text-[rgb(44,187,93)]">
                <BiSolidCheckCircle fontSize={"25"} width={"25"} />
              </th>
              <td className="px-6 py-4">
                {doc.link ?  (
                  <Link href={doc.link} className="hover:text-blue-600 cursor-pointer" target="_blank"></Link>
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
              <td className="px-6 py-4">{doc.category}</td>
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
      {youtubePlayer.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModal}></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <IoClose
                  fontSize={"35"}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={closeModal}
                />
                <YouTube
                  videoId={youtubePlayer.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
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
      const tmp:DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tmp.push({ id: doc.id,...doc.data()} as DBProblem);
      });
      setProblemsData(tmp);
      if (setLoadingProblems) setLoadingProblems(false);
    };
    getProblems();
  }, [setLoadingProblems]);
  return problemsData;
}

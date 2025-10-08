"use client";

import TopBar from "@/components/topBar/TopBar";
import ProblemsTable from "@/components/problemsTable/problemsTable";
import { useState } from "react";
import useHasMounted from "../hooks/useHasMounted";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const HasMounted = useHasMounted();

  if(!HasMounted )return null

  return (
    <>
      <main className="bg-[rgb(26,26,26)] min-h-screen">
        <TopBar />
        <h1
          className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5">
          &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
        </h1>

        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}
          <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && (
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
                <tr>
                  <th scope="col" className="px-1 py-3 w-0 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Difficulty
                  </th>

                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Solution
                  </th>
                </tr>
              </thead>
            )}
            <ProblemsTable setLoadingProblems={setLoadingProblems} />
          </table>
        </div>
      </main>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-8 h-8 shrink-0 rounded-full bg-[rgb(40,40,40)]"></div>
      <div className="h-6 sm:w-72  w-50  rounded-full bg-[rgb(40,40,40)]"></div>
      <div className="h-6 sm:w-72  w-32 rounded-full bg-[rgb(40,40,40)]"></div>
      <div className="h-6 sm:w-72 w-32 rounded-full bg-[rgb(40,40,40)]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

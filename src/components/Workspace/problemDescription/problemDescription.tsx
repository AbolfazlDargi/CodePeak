import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { Problem } from "@/utils/types/problem";

type problemDescriptionProps = {
  problem: Problem;
};

const problemDescription: React.FC<problemDescriptionProps> = ({
  problem,
}) => {
  return (
    <div className="bg-[rgb(40,40,40)]">
      {/* (Tab section) */}
      <div className="flex h-11 w-full items-center pt-2 bg-[rgb(26,26,26)] text-white overflow-x-hidden">
        <div className="bg-[rgb(40,40,40)] rounded-t[5px] px-5 py-[10px] text-xs cursor-pointer">
          Description
        </div>
      </div>

      {/* main content */}
      <div className="flex  h-[calc(100vh-)] overflow-y-auto">
        <div className="px-2">
          <div className="w-full">
            <div className="p-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </div>
              <div className="text-white text-sm mt-10">
                <div className="mt-4">
                  <div className="flex items-center mt-3">
                    <div className="text-[rgb(0,184,163)] bg-[rgb(5,77,68)] inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize">
                      Easy
                    </div>
                    <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-[rgb(44,187,93)]">
                      <BsCheck2Circle />
                    </div>
                    <div className="flex items-center cursor-pointer hover:bg-[hsla(0,0%,100%,.1)] space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-[rgb(179,179,179)]">
                      <AiFillLike />
                      <span className="text-xs">120</span>
                    </div>
                    <div className="flex items-center cursor-pointer hover:bg-[hsla(0,0%,100%,.1)] space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-[rgb(179,179,179)]">
                      <AiFillDislike />
                      <span className="text-xs">2</span>
                    </div>
                    <div className="flex items-center cursor-pointer hover:bg-[hsla(0,0%,100%,.1)] space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-[rgb(179,179,179)]">
                      <TiStarOutline />
                    </div>
                  </div>
                </div>
                <div
                  className="text-white text-sm"
                  dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
                />

                {/* Examples */}
                <div className="mt-4">
                  {problem.examples.map((example, index) => (
                    <div key={example.id}>
                      <p className="font-medium text-white">
                        Example {index + 1}:
                      </p>
                      <div className="bg-[hsla(0,0%,100%,0.1)] rounded-[0.5rem] text-[rgba(239,241,246,0.75)] font-[0.98rem] leading-5 mb-4 mt-4 p-4 whitespace-pre">
                        <pre>
                          <strong className="text-white">Input: </strong>
                          {example.inputText}
                          <br />
                          <strong className="text-white">Output:</strong>
                          {example.outputText}
                          <br />
                          {example.explanation && (
                            <>
                              <strong className="text-white">
                                Explanation:
                              </strong>
                              {example.explanation}
                            </>
                          )}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="my-8 pb-4">
                  <div className="text-white text-sm font-medium">
                    Constraints:
                  </div>
                  <ul
                    className="text-white ml-5 list-disc"
                    dangerouslySetInnerHTML={{ __html: problem.constraints }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default problemDescription;

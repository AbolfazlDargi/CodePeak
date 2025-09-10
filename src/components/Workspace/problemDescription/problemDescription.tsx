import React from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

// type problemDescriptionProps = {

// };

const problemDescription: React.FC = () => {
  return (
    <div className="bg-[rgb(40,40,40)]">
      {/* (Tab section) */}
      <div className="flex h-11 w-full items-center pt-2 bg-[rgb(26,26,26)] text-white overflow-x-hidden">
        <div className="bg-[rgb(40,40,40)] rounded-t[5px] px-5 py-[10px] text-xs cursor-pointer">
          Description
        </div>
      </div>

      {/* main content */}
      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          <div className="w-full">
            4
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                Title
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

                  <p className="mt-3">
                    Given an array of integers <code>nums</code> and an integer{" "}
                    <code>target</code>, return
                    <em>
                      indices of the two numbers such that they add up to
                    </em>{" "}
                    <code>target</code>.
                  </p>
                  <p className="mt-3">
                    You may assume that each input would have{" "}
                    <strong>exactly one solution</strong>, and you may not use
                    thesame element twice.
                  </p>
                  <p className="mt-3">
                    You can return the answer in any order.
                  </p>
                </div>

                <div className="mt-10">
                  <p className="font-medium text-white">Example 1:</p>
                  <div className="bg-[hsla(0,0%,100%,0.1)] rounded-[0.5rem] text-[rgba(239,241,246,0.75)] font-[0.98rem] leading-5 mb-4 mt-4 p-4 whitespace-pre">
                    <pre>
                      <strong className="text-white size-4">
                        {" "}
                        nums = [3,2,4], target = 6{" "}
                      </strong>
                      <br />
                      <strong className="text-white size-4">Output:</strong>
                      [1,2]
                      <br />
                      <strong className="text-white size-4">
                        Explanation:
                      </strong>
                      Because nums[1] + nums[2] == 6, we retrun [1,2]
                    </pre>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="font-medium text-white mt-4">
                    Example 2:
                    <div className="bg-[hsla(0,0%,100%,0.1)] rounded-[0.5rem] text-[rgba(239,241,246,0.75)] font-[0.98rem] leading-5 mb-4 mt-4 p-4 whitespace-pre">
                      <pre>
                        <strong className="text-white size-4">
                          {" "}
                          nums = [3,2,4], target = 6{" "}
                        </strong>
                        <br />
                        <strong className="text-white size-4">Output:</strong>
                        [1,2]
                        <br />
                        <strong className="text-white size-4">
                          Explanation:
                        </strong>
                        Because nums[1] + nums[2] == 6, we retrun [1,2]
                      </pre>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-white ">Example 3: </p>
                  <div className="bg-[hsla(0,0%,100%,0.1)] rounded-[0.5rem] text-[rgba(239,241,246,0.75)] font-[0.98rem] leading-5 mb-4 mt-4 p-4 whitespace-pre">
                    <pre>
                      <strong className="text-white">Input: </strong> nums =
                      [3,3], target = 6
                      <br />
                      <strong>Output:</strong> [0,1] <br />
                    </pre>
                  </div>
                </div>

                <div className="my-5">
                  <div className="text-white text-sm font-medium">
                    Constraints:
                  </div>
                  <ul className="text-white ml-5 list-disc">
                    <li className="mt-2">
                      <code>2 ≤ nums.length ≤ 10</code>
                    </li>

                    <li className="mt-2">
                      <code>-10 ≤ nums[i] ≤ 10</code>
                    </li>
                    <li className="mt-2">
                      <code>-10 ≤ target ≤ 10</code>
                    </li>
                    <li className="mt-2 text-sm">
                      <strong className="text-white size-4">
                        Only one valid answer exists.
                      </strong>
                    </li>
                  </ul>
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

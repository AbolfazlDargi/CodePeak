"use client";

import React from "react";
import Split from "react-split";
import ProblemDescription from "./problemDescription/problemDescription";
import Playground from "./Playground/Playground";
import { Problem } from "@/utils/types/problem";

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  return (
    <Split
      className="flex flex-row h-screen relative"
      sizes={[40, 60]}
      minSize={0}
      gutterSize={8}
      direction="horizontal"
      cursor="col-resize"
      gutter={(index, direction) => {
        const gutterDiv = document.createElement("div");
        gutterDiv.className = "bg-gray-700 relative";
        gutterDiv.style.width = "8px";
        gutterDiv.style.cursor = "col-resize";

        gutterDiv.addEventListener("mouseleave", () => {
            gutterDiv.style.backgroundColor = "#9ca3af";
            dot.style.backgroundColor = "#fbbf24";
        })

        gutterDiv.addEventListener("mouseenter", () => {
            gutterDiv.style.backgroundColor = "#374151";
            dot.style.backgroundColor = "#9ca3af";
        })

        const dot = document.createElement("div");
        dot.className = "bg-gray-400 rounded-full absolute";
        dot.style.width = "12px";
        dot.style.height = "12px";
        dot.style.top = "50%";
        dot.style.left = "50%";
        dot.style.transform = "translate(-50%, -50%)";

        gutterDiv.appendChild(dot);
        return gutterDiv;
      }}>
      <ProblemDescription problem={problem}/>
      <Playground problem={problem}/>
    </Split>
  );
};

export default Workspace;

import React from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

const Playground: React.FC = () => {
  return (
    <div className="flex flex-col bg-[rgb(40,40,40)] relative">
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
            value="const a = 1"
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <div className="w-full overflow-auto flex items-center justify-center text-white">
          testcase
        </div>
      </Split>
    </div>
  );
};

export default Playground;

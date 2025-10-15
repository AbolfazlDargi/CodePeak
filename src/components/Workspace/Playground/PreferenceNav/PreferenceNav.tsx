import React, { useEffect, useState } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from "react-icons/ai";
import { Isettings } from "../Playground";
import SettingsModal from "@/components/Models/SettingsModal";


type PreferenceNavProps = {
  setting: Isettings;
  setSetting: React.Dispatch<React.SetStateAction<Isettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  setSetting,
  setting,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    function exitHanlder(e: any) {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
        return;
      }
      setIsFullScreen(false);
    }
    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHanlder);
      document.addEventListener("webkitfullscreenchange", exitHanlder);
      document.addEventListener("mozfullscreenchange", exitHanlder);
      document.addEventListener("MSFullscreenChange", exitHanlder);
    }
  });

  return (
    <div className="flex items-center justify-between bg-[rgb(26,26,26)] h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-[hsla(0,0%,100%,.1)] text-[rgba(239,241,246,0.75)] hover:bg-[hsla(0,0%,100%,.14)] px-2 py-1.5 font-medium ">
          <div className="flex items-center px-1">
            <div className="text-xs text-[rgba(239,241,246,0.75)] dark:text-[rgba(239,241,246,0.75)]">
              JavaScript
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2">
        <button className="group relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-[hsla(0,0%,100%,.1)] cursor-pointer ">
          <div className="h-4 w-4 text-[rgb(138,138,138)] font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div className="absolute w-auto p-2 text-sm m-2 min-w-max translate-x-5 right-0 top-5 z-10 rounded-md shadow-md text-[rgb(26,26,26)] bg-gray-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100">
            Settings
          </div>
        </button>

        <button
          className="group  relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-[hsla(0,0%,100%,.1)] cursor-pointer"
          onClick={handleFullScreen}>
          <div className="h-4 w-4 text-[rgb(138,138,138)] font-bold text-lg">
            {!isFullScreen ? (
              <AiOutlineFullscreen />
            ) : (
              <AiOutlineFullscreenExit />
            )}
          </div>
          <div className=" absolute w-auto p-2 text-sm m-2 min-w-max translate-x-6 right-0 top-5 z-10 rounded-md shadow-md text-[rgb(26,26,26)] bg-gray-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100">
            Full Screen
          </div>
        </button>
      </div>
      {setting.settingsModalIsopen && (
        <SettingsModal settings={setting} setSettings={setSetting} />
      )}
    </div>
  );
};
export default PreferenceNav;

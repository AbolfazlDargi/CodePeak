import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Time from "../../../svg/timer-svgrepo-com.svg";
import Image from "next/image";

// type TimerProps = {

// };

const Timer: React.FC = () => {
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours < 10 ? "0" + hours : hours}: ${
      minutes < 10 ? "0" + minutes : minutes
    }: ${seconds < 10 ? "0" + seconds : seconds}`
    };

  useEffect(() => {
    let interValid: NodeJS.Timeout;

    if (showTimer) {
      interValid = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interValid);
  }, [showTimer]);

  return (
    <>
      <div>
        {showTimer ? (
          <div className="flex items-center space-x-2 bg- p-1.5 cursor-pointer rounded hover:bg-">
            <div>{formatTime(time)}</div>
            <FiRefreshCcw
              onClick={() => {
                setShowTimer(false);
                setTime(0);
              }}
            />
          </div>
        ) : (
          <div
            className="flex items-center p-1 h-8 hover:bg- rounded cursor-pointer"
            onClick={() => setShowTimer(true)}>
            <Image
              src={Time}
              alt={"time"}
              width={30}
              height={50}
              ></Image>
          </div>
        )}
      </div>
    </>
  );
};
export default Timer;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoFull from "../../../public/logo-full.png"

// type topBarProps = {

// };

const topBar: React.FC = () => {
  return (
    <nav className="relative fle h-[50px] w-full shrink-0 items-center px-5 bg-[rgb(40,40,40)] text-[rgb(179,179,179)] p-2">
      <div className="flex w-full items-center justify-center max-w-[1200px] mx-auto">
        <Link href="/" className="h-[30px] flex-1">
          <Image
            src={LogoFull}
            alt="Logo"
            className="h-full"
            width={150}
            height={120}
          />
        </Link>
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href="https://www.buymecoffee.com"
              target="_blank"
              rel="noreferrer"
              className="bg-[hsla(0,0%,100%,.1)] py-1 px-2 cursor-pointer rounded-lg text-[#FF9916] hover:bg-[hsla(0,0%,100%,.14)]">
              premium
            </a>
          </div>
          <Link href="/auth">
            <button className="bg-[hsla(0,0%,100%,.1)] py-1 px-2 cursor-pointer rounded-lg hover:bg-[hsla(0,0%,100%,.14)]">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default topBar;

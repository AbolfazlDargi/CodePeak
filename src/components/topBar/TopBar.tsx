"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoFull from "../../../public/CodePeak.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Avatar from "../../../public/avatar.png";
import Logout from "../Buttons/Logout";
import { useAuthStore } from "@/stores/authModalAtom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";

type TopBarProps = {
  problemPage?: boolean;
};

const TopBar: React.FC<TopBarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const openModal = useAuthStore((state) => state.openModal);
  const [showForm, setShowFrom] = useState(false);

  const handleClick = () => {
    openModal("login");
  };

  return (
    <nav className="relative fle h-[50px] w-full shrink-0 items-center px-5 bg-[rgb(40,40,40)] text-[rgb(179,179,179)] p-2">
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? " max-w-[1200px] mx-auto" : ""
        }  `}>
        <Link href="/" className="h-[30px] flex-1">
          <Image
            src={LogoFull}
            alt="Logo"
            className="h-full"
            width={150}
            height={120}
          />
        </Link>

        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div className="flex  items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.14)] h-8 w-8 cursor-pointer">
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-[rgb(219,219,219)] cursor-pointer">
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div className="flex  items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.1)] hover:bg-[hsla(0,0%,100%,.14)] h-8 w-8  cursor-pointer">
              <FaChevronRight />
            </div>
          </div>
        )}
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
          <div className="bg-[hsla(0,0%,100%,.1)] py-1 px-2 cursor-pointer rounded-lg text-[#FF9916] hover:bg-[hsla(0,0%,100%,.14)]">
            <Link href="../formdatabase">Problem Database Form</Link>
          </div>
          {!user && (
            <Link href="/auth" onClick={handleClick}>
              <button className="bg-[hsla(0,0%,100%,.1)] py-1 px-2 cursor-pointer rounded-lg hover:bg-[hsla(0,0%,100%,.14)]">
                Sign In
              </button>
            </Link>
          )}

          {problemPage && <Timer />}

          {user && (
            <div className="cursor-pointer group relative">
              <Image
                src={Avatar}
                alt="user profile img"
                className="h-8 w-8 rounded-full"></Image>
              <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-[rgb(40,40,40)] text-[rgb(255,161,22)] p-2 rounded-lg shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;

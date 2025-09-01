"use client";

import Navbar from "@/components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "../../../public/hero.png";
import AuthModal from "@/components/Models/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from 'next/navigation';

const Authpage: React.FC = () => {

  const [user, loading, error] = useAuthState(auth)
  const [pageLoading, setPageLoading] = useState(true)

  const router = useRouter()

  useEffect(() =>{
    if(user){
      router.push("/")
    }
    if (!loading && !user && !error){
      setPageLoading(false)
    } else if(error){
      alert("Try Again")
    }
  },[user, loading, router, error])

  if (pageLoading){
    return null
  }
  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <Image src={Hero} alt="Hero img"></Image>
        </div>
        <AuthModal />
      </div>
    </div>
  );
};

export default Authpage;

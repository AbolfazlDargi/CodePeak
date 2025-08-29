import React from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login"
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { useAuthStore } from "@/stores/authModalAtom";


// type Props = {}

const AuthModal: React.FC = () => {

  const { isOpen, type, closeModal} = useAuthStore()

  if(!isOpen) return null


  return (
    <>
      <div className="absolute top-0 left-0 w-full flex items-center justify-center bg-black opacity-60"></div>
      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-[#FF9916] to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white cursor-pointer " onClick={closeModal}>
                <IoClose className="h-5 w-5 cursor-pointer" />
              </button>
            </div>
            <div className="p-4">
              {type === "login" && <Login />}
              {type === "register" && <Signup />}
              {type === "forgetPassword" && <ResetPassword />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;

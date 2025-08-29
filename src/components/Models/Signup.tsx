import React from 'react';
import Link from 'next/link';
import { useAuthStore } from "@/stores/authModalAtom";

// type SignupProps = {
    
// };

const Signup:React.FC = () => {

    const openModal = useAuthStore((state) => state.openModal)
    
    return (
      <div>
        <form action="" className="space-y-6 px-6 pb-4">
          <h3 className="text-xl font-medium text-white">
            Register to LeetClone
          </h3>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium block mb-2 text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-500 placeholder-gray-400 text-black"
              placeholder="name@compony.com"
            />
          </div>
          <div>
            <label
              htmlFor="displayName"
              className="text-sm font-medium block mb-2 text-gray-300">
              Display Name
            </label>
            <input
              type="displayName"
              name="displayName"
              id="displayName"
              className="border-2 outline-none sm:text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium block mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-500 placeholder-gray-400 text-black"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className=" w-full  text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#FF9916] hover:bg-[#C17A0F] cursor-pointer">
            Register
          </button>
          <div className="text-sm font-medium text-gray-300">
            Already have an account ?{" "}
            <Link href="#" className="text-blue-700 hover:underline" onClick={() =>openModal("login")}>
              Log in
            </Link>
          </div>
        </form>
      </div>
    );
}
export default Signup;
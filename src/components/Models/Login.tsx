import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

// type LoginProps = {}

const Login: React.FC = () => {
  const openModal = useAuthStore((state) => state.openModal);

  const [input, setInput] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      if (!input.email || !input.password) {
      return alert("Please fill all fields");
  };

  try {
    const newUser = await signInWithEmailAndPassword(
      input.email,
      input.password
    );

    if (!newUser) return;
    router.push("/");
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred.");
    }
  }
}

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <div>
      <form action="" className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
        <h3 className="text-xl font-medium text-white">Sign in to PeakCode</h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-gray-300">
            Your Email
          </label>
          <input
            onChange={handleChangeInput}
            type="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="name@compony.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium block mb-2 text-gray-300">
            <input
              onChange={handleChangeInput}
              type="password"
              name="password"
              id="password"
              className="border-2 outline-none sm:text-sm rounded-b-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              placeholder="********"
            />
          </label>
        </div>
        <button
          type="submit"
          className=" w-full  text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#FF9916] hover:bg-[#C17A0F] cursor-pointer">
          {loading ? "Login..." : "Login"}
        </button>
        <button className="flex w-full justify-end">
          <Link
            id="forgetPassword"
            href="#"
            className="text-sm block text-[#FF9916] hover:underline w-full text-right"
            onClick={() => openModal("forgetPassword")}>
            Forgot Password?
          </Link>
        </button>
        <div className="text-sm font-medium text-gray-300">
          Not Registered?{" "}
          <Link
            href="#"
            className="text-blue-700 hover:underline"
            onClick={() => openModal("register")}>
            create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

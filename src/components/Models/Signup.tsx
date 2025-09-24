import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authModalAtom";
import { auth, fireStore } from "@/firebase/firebase"; // ✅ use db here
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore"; // ✅ no Firestore import
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const openModal = useAuthStore((state) => state.openModal);
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const router = useRouter();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName) {
      return alert("Please fill all fields");
    }
    try {
      toast.loading("creating your account", {
        position: "top-center",
        toastId: "loadingToast",
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;

      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikeProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };

      await setDoc(doc(fireStore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (err: any) {
      toast.error(err.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message); // ✅ use toast instead of alert
    }
  }, [error]);

  return (
    <div>
      <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium text-white">Register to codePeak</h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-gray-300">
            Email
          </label>
          <input
            onChange={handleChangeInput}
            type="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-500 placeholder-gray-400 text-black"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label
            htmlFor="displayName"
            className="text-sm font-medium block mb-2 text-gray-300">
            Display Name
          </label>
          <input
            onChange={handleChangeInput}
            type="text"
            name="displayName"
            id="displayName"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
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
            onChange={handleChangeInput}
            type="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white border-gray-500 placeholder-gray-400 text-black"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#FF9916] hover:bg-[#C17A0F] cursor-pointer">
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-sm font-medium text-gray-300">
          Already have an account?{" "}
          <Link
            href="#"
            className="text-blue-700 hover:underline"
            onClick={() => openModal("login")}>
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

import { fireStore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";

// type FormDataBaseProps = {

// };

const FormDataBase: React.FC = () => {
  const [input, setInputs] = useState({
    id: "",
    title: "",
    category: "",
    difficulty: "",
    order: 0,
    videoId: "",
    link: "",
    likes: 0,
    dislike: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  console.log(input);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProblem = {
      ...input,
      order: Number(input.order.toString()),
    };

    await setDoc(doc(fireStore, "problems", input.id), newProblem);
    alert("Saved to db");
  };

  return (
    <div className="flex  justify-center items-center flex-col  ">
      <form
        action=""
        className="flex flex-col  max-w-sm gap-3 p-8 w-[100rem] bg-[rgb(26,26,26)] rounded-lg "
        onSubmit={handleSubmit}>
        <h1 className="text-white text-2xl items-center flex justify-center ">
          Problem DataBase From
        </h1>
        <div className="flex flex-col">
          <div className="flex gap-3 ">
            <h2 className="text-white pl-12">Id:</h2>

            <input
              onChange={handleInputChange}
              type="text"
              name="id"
              className="bg-[rgb(42,48,56)] text-white border border-gray-400 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-3 flex-row">
            <h2 className="text-white pl-7">Title:</h2>
            <input
              onChange={handleInputChange}
              type="text"
              name="title"
              className="bg-[rgb(42,48,56)] text-white border border-gray-400 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-3 flex-row">
            <h2 className="text-white">difficulty</h2>
            <input
              type="text"
              className="bg-[rgb(42,48,56)] text-white border border-gray-400 rounded-md"
              name="difficulty"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2">
            <h2 className="text-white">catgeroy:</h2>

            <input
              onChange={handleInputChange}
              type="text"
              name="catgeroy"
              className="bg-[rgb(42,48,56)] text-white border border-gray-400 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <h2 className="text-white pl-6">order:</h2>
            <input
              onChange={handleInputChange}
              type="number"
              name="order"
              className="bg-[rgb(42,48,56)] text-white border border-gray-400 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 pl-3">
            <h2 className="text-white">videoId:</h2>
            <input
              onChange={handleInputChange}
              type="text"
              name="videoId"
              className="bg-[rgb(42,48,56)] text-white border border-gray-400 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2">
            <h2 className="text-white pl-10">link:</h2>
            <input
              onChange={handleInputChange}
              type="text"
              name="link"
              className="bg-[rgb(42,48,56)] text-white border border-gray-400 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <button className="bg-[rgb(42,48,56)] text-white  shadow-gray-400 cursor-pointer w-30 h-8 items-center rounded-lg hover:bg-[rgb(91,97,105)] flex justify-center">
            Save to db
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormDataBase;

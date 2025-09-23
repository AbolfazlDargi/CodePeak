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
              placeholder="problem id"
              name="id"
              className="bg-white "
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-3 flex-row">
            <h2 className="text-white pl-7">Title:</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="title"
              name="title"
              className="bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-3 flex-row">
            <h2 className="text-white">difficulty</h2>
            <input
              type="text"
              className="bg-white"
              name="difficulty"
              onChange={handleInputChange}
              placeholder="difficulty"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2">
            <h2 className="text-white">catgeroy:</h2>

            <input
              onChange={handleInputChange}
              type="text"
              placeholder="catgeroy"
              name="catgeroy"
              className="bg-white"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <h2 className="text-white pl-6">order:</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="order"
              name="order"
              className="bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 pl-3">
            <h2 className="text-white">videoId:</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="videoId"
              name="videoId"
              className="bg-white"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2">
            <h2 className="text-white pl-10">link:</h2>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="link?"
              name="link"
              className="bg-white"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-white cursor-pointer w-20 flex justify-center">
            Save to db
          </button>
        </div>
      </form>
    </div>
  );
};
export default FormDataBase;

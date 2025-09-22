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
    <div className="flex  justify-center items-center ">
      <form
        action=""
        className="flex flex-col  max-w-sm gap-3 p-8 w-600 bg-[rgb(26,26,26)] rounded-lg"
        onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="problem id"
          name="id"
          className="bg-white "
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="title"
          name="title"
          className="bg-white"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="catgeroy"
          name="catgeroy"
          className="bg-white"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="order"
          name="order"
          className="bg-white"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="videoId"
          name="videoId"
          className="bg-white"
        />
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="link?"
          name="link"
          className="bg-white"
        />
        <button className="bg-white cursor-pointer">Save to db</button>
      </form>
    </div>
  );
};
export default FormDataBase;

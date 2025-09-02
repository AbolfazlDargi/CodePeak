import React from "react";
import { problems } from "../../mockProblems/problems";
import { BiSolidCheckCircle } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import Link from "next/link";

// type problemsTableProps = {

// };

const problemsTable: React.FC = () => {
  return (
    <tbody className="text-white">
      {problems.map((doc, idx) => {
        const difficulycolor =
          doc.difficulty === "Easy"
            ? "text-[rgb(44,187,93)]"
            : doc.difficulty === "Medium"
            ? "text-[rgb(255,192,30)]"
            : "text-red-600"
        return (
          <tr
            className={`${idx % 2 == 1 ? "bg-[rgb(40,40,40)]" : ""}`}
            key={doc.id}>
            <th className="px-2 py-4 font-medium whitespace-nowrap text-[rgb(44,187,93)]">
              <BiSolidCheckCircle fontSize={"25"} width={"25"} />
            </th>
            <td className="px-6 py-4">
              <Link
                className="hover:text-blue-600 cursor-pointer"
                href={`/problems/>${doc.id}`}>
                {doc.title}
              </Link>
            </td>
            <td className={`px-6 py-4 ${difficulycolor}`}>{doc.difficulty}</td>
            <td className="px-6 py-4">{doc.category}</td>
            <td className="px-6 py-4">
              {doc.videoId ? (
                <AiFillYoutube
                  fontSize={"28"}
                  className="cursor-pointer hover:text-red-600"
                />
              ) : (
                <p className="text-gray-400">Coming soon</p>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
export default problemsTable;

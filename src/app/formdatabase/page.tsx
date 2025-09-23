"use client";

import FormDataBase from "@/components/FormDataBase/FormDataBase";
import TopBar from "@/components/topBar/TopBar";

export default function FormDatabasePage() {
  return (
    <div className="bg-[rgb(26,26,26)] min-h-screen">
      <TopBar />
      <div className="flex justify-center items-center h-auto">
        <FormDataBase/>
      </div>
    </div>
  );
}

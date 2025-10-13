import TopBar from "@/components/topBar/TopBar";
import React from "react";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import useHasMounted from "../../../hooks/useHasMounted";

type pagePropsProps = {
  params: { pid: string };
};

export async function generateStaticParams() {
  return Object.keys(problems).map((key) => ({
    pid: key,
  }));
}

export default function ProblemPage({ params }: pagePropsProps) {
  const problem = problems[params.pid];
  const hasMounted = useHasMounted();

  if (!problem) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-3xl">Not Found</h1>
      </div>
    );
  }
  problem.handlerFunction = problem.handlerFunction.toString();

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      <TopBar problemPage />
      <Workspace problem={problem} />
    </div>
  );
}

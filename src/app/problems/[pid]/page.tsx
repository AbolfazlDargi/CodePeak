import ProblemClient from "./problemClient";
import { problems } from "@/utils/problems";

type pagePropsProps = {
  params: { pid: string };
};

export default function ProblemPage({ params }: pagePropsProps) {
  const problem = problems[params.pid];

  if (!problem) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-3xl">Not Found</h1>
      </div>
    );
  }

  // handlerFunction را به رشته تبدیل می‌کنیم تا قابل serialize بشه
  problem.handlerFunction = problem.handlerFunction.toString();

  return <ProblemClient problem={problem} />;
}

// ✅ این تابع مخصوص سروره، پس اینجا مجازه
export async function generateStaticParams() {
  return Object.keys(problems).map((key) => ({
    pid: key,
  }));
}

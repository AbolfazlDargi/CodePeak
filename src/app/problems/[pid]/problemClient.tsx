"use client";

import TopBar from "@/components/topBar/TopBar";
import Workspace from "@/components/Workspace/Workspace";
import useHasMounted from "@/hooks/useHasMounted";



export default function ProblemClient({ problem }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <div>
      <TopBar problemPage />
      <Workspace problem={problem} />
    </div>
  );
}

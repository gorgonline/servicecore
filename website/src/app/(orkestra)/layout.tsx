import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ServiceCore Orkestra | Control Center",
  description: "Autonomous Agent Orchestration Dashboard",
};

export default function OrchestratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-(--color-surface-base)">
      {children}
    </div>
  );
}

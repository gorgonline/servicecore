"use client";

import { useRouter } from "next/navigation";
import { ErrorPage } from "@servicecoreui/ui/custom";

export default function YetkisizPage() {
  const router = useRouter();
  return <ErrorPage variant="403" onNavigate={router.push} />;
}

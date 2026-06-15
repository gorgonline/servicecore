"use client";

import { useRouter } from "next/navigation";
import { ErrorPage } from "@servicecoreui/ui/custom";

export default function NotFound() {
  const router = useRouter();
  return <ErrorPage variant="404" onNavigate={router.push} />;
}

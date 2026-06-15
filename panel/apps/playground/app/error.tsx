"use client";

import { useRouter } from "next/navigation";
import { ErrorPage } from "@servicecoreui/ui/custom";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return <ErrorPage variant="500" onRetry={reset} onNavigate={router.push} />;
}

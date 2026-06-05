"use client";

import Link from "next/link";
import { Button } from "@servicecoreui/ui/wraps";
import { SystemMessage } from "./_components/SystemMessage";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <SystemMessage
      code="500"
      title="Bir şeyler ters gitti"
      description="Beklenmeyen bir hata oluştu. Tekrar deneyebilir ya da ana sayfaya dönebilirsin."
      action={
        <>
          <Button type="primary" size="large" onClick={reset}>
            Tekrar dene
          </Button>
          <Link href="/">
            <Button size="large">Ana sayfa</Button>
          </Link>
        </>
      }
    />
  );
}

"use client";

import Link from "next/link";
import { AuthShell, TwoFactorForm } from "@servicecoreui/ui";
import { t } from "../_lib/auth-tr";

export default function TwoFactorPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <TwoFactorForm
        t={t}
        onResend={() => undefined}
        renderLink={(href, children) => <Link href={href}>{children}</Link>}
      />
    </AuthShell>
  );
}

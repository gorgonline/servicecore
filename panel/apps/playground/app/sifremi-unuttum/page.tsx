"use client";

import Link from "next/link";
import { AuthShell, ForgotPasswordForm } from "@servicecoreui/ui";
import { t } from "../_lib/auth-tr";

export default function SifremiUnuttumPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <ForgotPasswordForm
        t={t}
        renderLink={(href, children) => <Link href={href}>{children}</Link>}
      />
    </AuthShell>
  );
}

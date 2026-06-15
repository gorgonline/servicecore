"use client";

import Link from "next/link";
import { AuthShell, ChangePasswordForm } from "@servicecoreui/ui";
import { t } from "../_lib/auth-tr";

export default function SifreDegistirPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <ChangePasswordForm
        t={t}
        renderLink={(href, children) => <Link href={href}>{children}</Link>}
      />
    </AuthShell>
  );
}

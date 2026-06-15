"use client";

import Link from "next/link";
import { AuthShell, TwoFactorSetup } from "@servicecoreui/ui";
import { t } from "../_lib/auth-tr";

export default function TwoFactorQrPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <TwoFactorSetup
        t={t}
        qrValue="otpauth://totp/ServiceCore:ornek@sirket.com?secret=JBSWY3DPEHPK3PXP&issuer=ServiceCore"
        renderLink={(href, children) => <Link href={href}>{children}</Link>}
      />
    </AuthShell>
  );
}

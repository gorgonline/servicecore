"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthShell, LoginForm } from "@servicecoreui/ui";
import { t } from "../_lib/auth-tr";

const CAPTCHAS = ["G7K9X2", "M4P8QZ", "B3N6YK"];

export default function GirisPage() {
  const [capIdx, setCapIdx] = useState(0);

  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <LoginForm
        t={t}
        captchaEnabled
        captchaContent={<>{CAPTCHAS[capIdx]}</>}
        onRefreshCaptcha={() => setCapIdx((i) => (i + 1) % CAPTCHAS.length)}
        googleEnabled
        ssoEnabled
        renderLink={(href, children) => <Link href={href}>{children}</Link>}
      />
    </AuthShell>
  );
}

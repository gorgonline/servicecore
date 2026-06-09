"use client";

import { useState } from "react";
import Link from "next/link";
import { Enterprise, Renew } from "@carbon/icons-react";
import { Heading, Text } from "@servicecoreui/ui";
import { Button, Checkbox, Divider, Input } from "@servicecoreui/ui/wraps";
import { AuthShell } from "@servicecoreui/ui/custom";
import styles from "./giris.module.css";

const CAPTCHAS = ["G7K9X2", "M4P8QZ", "B3N6YK"];

/* Google'ın resmi "G" markası — üçüncü-parti logo (token/renk kuralı dışı). */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" width={18} height={18} aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

export default function GirisPage() {
  const [capIdx, setCapIdx] = useState(0);
  const captcha = CAPTCHAS[capIdx]!;

  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <div className={styles.form}>
        <div className={styles.head}>
          <Heading level={3}>Giriş yap</Heading>
          <Text color="secondary">Hesabınla devam et</Text>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>E-posta</span>
          <Input type="email" size="large" placeholder="ornek@sirket.com" autoComplete="email" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Şifre</span>
          <Input.Password size="large" placeholder="••••••••" autoComplete="current-password" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Doğrulama kodu</span>
          <div className={styles.captchaRow}>
            <span className={styles.captchaImg} aria-label={`captcha: ${captcha}`}>
              {captcha}
            </span>
            <Button
              type="text"
              leadingIcon={<Renew size={18} />}
              aria-label="Kodu yenile"
              title="Kodu yenile"
              onClick={() => setCapIdx((i) => (i + 1) % CAPTCHAS.length)}
            />
          </div>
          <Input size="large" placeholder="Yukarıdaki kodu gir" autoComplete="off" />
        </label>

        <div className={styles.row}>
          <Checkbox>Beni hatırla</Checkbox>
          <Link href="/sifremi-unuttum" className={styles.link}>
            Şifremi unuttum
          </Link>
        </div>

        <Button type="primary" size="large" block>
          Giriş yap
        </Button>

        <Divider plain>veya</Divider>

        <div className={styles.altMethods}>
          <Button size="large" block leadingIcon={<GoogleIcon />}>
            Google ile devam et
          </Button>
          <Button size="large" block leadingIcon={<Enterprise size={18} />}>
            Kurumsal SSO ile giriş
          </Button>
        </div>

        <div className={styles.foot}>
          Hesabın yok mu?{" "}
          <Link href="/kayit" className={styles.link}>
            Kayıt ol
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

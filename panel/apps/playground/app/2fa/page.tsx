"use client";

import Link from "next/link";
import { Heading, Text } from "@servicecoreui/ui";
import { Button, Input } from "@servicecoreui/ui/wraps";
import { AuthShell } from "@servicecoreui/ui/custom";
import styles from "../giris/giris.module.css";

export default function TwoFactorPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <div className={styles.form}>
        <div className={styles.head}>
          <Heading level={3}>İki adımlı doğrulama</Heading>
          <Text color="secondary">Doğrulama uygulamandaki 6 haneli kodu gir.</Text>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Doğrulama kodu</span>
          <Input
            size="large"
            maxLength={6}
            inputMode="numeric"
            placeholder="••••••"
            className={styles.code}
            autoComplete="one-time-code"
          />
        </label>

        <Button type="primary" size="large" block>
          Doğrula
        </Button>

        <div className={styles.foot}>
          <button type="button" className={styles.link}>
            Kodu tekrar gönder
          </button>
          {" · "}
          <Link href="/giris" className={styles.link}>
            Girişe dön
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Heading, Text } from "@servicecoreui/ui";
import { Button, Input } from "@servicecoreui/ui/wraps";
import { AuthShell } from "../_components/AuthShell";
import { PasswordChecklist } from "../_components/PasswordChecklist";
import styles from "../giris/giris.module.css";

export default function SifreSifirlaPage() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const mismatch = pw2.length > 0 && pw !== pw2;

  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <div className={styles.form}>
        <div className={styles.head}>
          <Heading level={3}>Şifre sıfırla</Heading>
          <Text color="secondary">Yeni şifreni belirle ve hesabına devam et.</Text>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>Yeni şifre</span>
          <Input.Password
            size="large"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </label>

        <PasswordChecklist value={pw} />

        <label className={styles.field}>
          <span className={styles.label}>Yeni şifre (tekrar)</span>
          <Input.Password
            size="large"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            status={mismatch ? "error" : undefined}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {mismatch ? (
            <Text size="xs" color="danger">
              Şifreler eşleşmiyor.
            </Text>
          ) : null}
        </label>

        <Button type="primary" size="large" block>
          Şifreyi sıfırla
        </Button>

        <div className={styles.foot}>
          <Link href="/giris" className={styles.link}>
            Girişe dön
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Heading, Text } from "@servicecoreui/ui";
import { Button, Input } from "@servicecoreui/ui/wraps";
import { AuthShell, PasswordChecklist } from "@servicecoreui/ui/custom";
import styles from "../giris/giris.module.css";

export default function KayitPage() {
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
          <Heading level={3}>Hesap oluştur</Heading>
          <Text color="secondary">ServiceCore hesabını oluştur.</Text>
        </div>

        <div className={styles.cols}>
          <label className={styles.field}>
            <span className={styles.label}>Ad</span>
            <Input size="large" placeholder="Ad" autoComplete="given-name" />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Soyad</span>
            <Input size="large" placeholder="Soyad" autoComplete="family-name" />
          </label>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>E-posta</span>
          <Input type="email" size="large" placeholder="ornek@sirket.com" autoComplete="email" />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Şifre</span>
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
          <span className={styles.label}>Şifre (tekrar)</span>
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
          Hesap oluştur
        </Button>

        <div className={styles.foot}>
          Zaten hesabın var mı?{" "}
          <Link href="/giris" className={styles.link}>
            Giriş yap
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

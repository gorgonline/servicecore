"use client";

import Link from "next/link";
import { Heading, Text } from "@servicecoreui/ui";
import { Button, Input } from "@servicecoreui/ui/wraps";
import { AuthShell } from "@servicecoreui/ui/custom";
import styles from "../giris/giris.module.css";

export default function SifremiUnuttumPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <div className={styles.form}>
        <div className={styles.head}>
          <Heading level={3}>Şifremi unuttum</Heading>
          <Text color="secondary">E-posta adresini gir, sıfırlama bağlantısını gönderelim.</Text>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>E-posta</span>
          <Input type="email" size="large" placeholder="ornek@sirket.com" autoComplete="email" />
        </label>

        <Link href="/sifre-link-gonderildi">
          <Button type="primary" size="large" block>
            Sıfırlama bağlantısı gönder
          </Button>
        </Link>

        <div className={styles.foot}>
          <Link href="/giris" className={styles.link}>
            Girişe dön
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

"use client";

import Link from "next/link";
import { Locked } from "@carbon/icons-react";
import { Heading, Text } from "@servicecoreui/ui/typography";
import { Button } from "@servicecoreui/ui/wraps";
import { AuthShell } from "@servicecoreui/ui/custom";
import styles from "../giris/giris.module.css";

export default function YetkisizPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <div className={styles.msg}>
        <span className={styles.msgIconWarning}>
          <Locked size={48} />
        </span>
        <Heading level={3}>Erişim yetkin yok</Heading>
        <Text color="secondary">
          Bu sayfaya erişim iznin bulunmuyor. Yetkin olduğunu düşünüyorsan sistem yöneticinle
          iletişime geç.
        </Text>
        <Link href="/giris">
          <Button type="primary" size="large">
            Girişe dön
          </Button>
        </Link>
      </div>
    </AuthShell>
  );
}

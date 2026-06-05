"use client";

import Link from "next/link";
import { MailAll } from "@carbon/icons-react";
import { Heading, Text } from "@servicecoreui/ui";
import { Button } from "@servicecoreui/ui/wraps";
import { AuthShell } from "../_components/AuthShell";
import styles from "../giris/giris.module.css";

export default function SifreLinkGonderildiPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <div className={styles.msg}>
        <span className={styles.msgIconSuccess}>
          <MailAll size={48} />
        </span>
        <Heading level={3}>Bağlantı gönderildi</Heading>
        <Text color="secondary">
          Şifre sıfırlama bağlantısını e-posta adresine gönderdik. Gelen kutunu kontrol et —
          birkaç dakika içinde ulaşmazsa spam klasörüne de bak.
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

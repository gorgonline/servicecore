"use client";

import Link from "next/link";
import { Heading, Text } from "@servicecoreui/ui";
import { Button, Input, QRCode } from "@servicecoreui/ui/wraps";
import { AuthShell } from "@servicecoreui/ui/custom";
import styles from "../giris/giris.module.css";

export default function TwoFactorQrPage() {
  return (
    <AuthShell
      eyebrow="Kurumsal ITSM / ESM"
      title="Hizmet yönetiminde tek platform"
      subtitle="Olay, problem, değişiklik, varlık ve hizmet kataloğu — hepsi tek panelde."
    >
      <div className={styles.form}>
        <div className={styles.head}>
          <Heading level={3}>Doğrulayıcıyı kur</Heading>
          <Text color="secondary">
            Google Authenticator ile QR kodu tara, sonra üretilen 6 haneli kodu gir.
          </Text>
        </div>

        <div className={styles.qrWrap}>
          <QRCode value="otpauth://totp/ServiceCore:ornek@sirket.com?secret=JBSWY3DPEHPK3PXP&issuer=ServiceCore" size={176} />
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
          <Link href="/giris" className={styles.link}>
            Girişe dön
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

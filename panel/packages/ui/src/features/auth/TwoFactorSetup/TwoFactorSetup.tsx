import { useState } from "react";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { QRCode } from "../../../components/QRCode";
import { Input } from "antd";
import type { ReactNode } from "react";
import type { ScAuthKeys } from "../../../i18n/keys";
import styles from "../auth.module.css";

export interface TwoFactorSetupProps {
  /**
   * QR kod değeri (otpauth URI).
   * Örnek: "otpauth://totp/ServiceCore:user@co.com?secret=ABC&issuer=ServiceCore"
   */
  qrValue?: string;
  /** TOTP secret (manuel giriş için). */
  secret?: string;
  /** Doğrula handler'ı — kod değeri. */
  onVerify?: (data: { code: string }) => void;
  /** Giriş sayfasına dön handler'ı. */
  onBackToLogin?: () => void;
  /** Yükleme durumu. */
  loading?: boolean;
  /** Hata mesajı. */
  error?: string;
  /** i18n çeviri fonksiyonu. */
  t: (key: keyof ScAuthKeys) => string;
  /**
   * Link render prop'u — navigasyon gerektiren bağlantılar için.
   * Next.js ortamında `(href, children) => <Link href={href}>{children}</Link>`
   */
  renderLink?: (href: string, children: ReactNode) => ReactNode;
}

export function TwoFactorSetup({
  qrValue,
  onVerify,
  onBackToLogin,
  loading,
  error,
  t,
  renderLink,
}: TwoFactorSetupProps) {
  const [code, setCode] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onVerify?.({ code });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.head}>
        <Heading level={3}>{t("twoFactorSetupTitle")}</Heading>
        <Text color="secondary">{t("twoFactorSetupSubtitle")}</Text>
      </div>

      {qrValue ? (
        <div className={styles.qrWrap}>
          <QRCode value={qrValue} size={176} />
        </div>
      ) : null}

      <label className={styles.field}>
        <span className={styles.label}>{t("twoFactorCode")}</span>
        <Input
          size="large"
          maxLength={6}
          inputMode="numeric"
          placeholder={t("twoFactorCodePlaceholder")}
          className={styles.code}
          autoComplete="one-time-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </label>

      {error ? (
        <Text size="sm" color="danger">
          {error}
        </Text>
      ) : null}

      <Button
        type="primary"
        size="large"
        block
        htmlType="submit"
        loading={loading}
      >
        {t("twoFactorVerify")}
      </Button>

      <div className={styles.foot}>
        {onBackToLogin ? (
          <button
            type="button"
            className={styles.link}
            onClick={onBackToLogin}
          >
            {t("backToLoginText")}
          </button>
        ) : renderLink ? (
          renderLink(
            "/giris",
            <span className={styles.link}>{t("backToLoginText")}</span>,
          )
        ) : null}
      </div>
    </form>
  );
}

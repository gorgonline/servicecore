import { useState } from "react";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { Input } from "antd";
import type { ReactNode } from "react";
import type { ScAuthKeys } from "../../../i18n/keys";
import styles from "../auth.module.css";

export interface TwoFactorFormProps {
  /** Form submit handler — doğrulama kodu değeri. */
  onSubmit?: (data: { code: string }) => void;
  /** Kodu tekrar gönder handler'ı. */
  onResend?: () => void;
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

export function TwoFactorForm({
  onSubmit,
  onResend,
  onBackToLogin,
  loading,
  error,
  t,
  renderLink,
}: TwoFactorFormProps) {
  const [code, setCode] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({ code });
  }

  const hasResend = Boolean(onResend);
  const hasBack = Boolean(onBackToLogin) || Boolean(renderLink);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.head}>
        <Heading level={3}>{t("twoFactorTitle")}</Heading>
        <Text color="secondary">{t("twoFactorSubtitle")}</Text>
      </div>

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
        {hasResend ? (
          <button type="button" className={styles.link} onClick={onResend}>
            {t("resendCode")}
          </button>
        ) : null}
        {hasResend && hasBack ? " · " : null}
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

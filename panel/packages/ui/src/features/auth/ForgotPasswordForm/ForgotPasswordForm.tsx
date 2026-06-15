import { useState } from "react";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { Input } from "antd";
import type { ReactNode } from "react";
import type { ScAuthKeys } from "../../../i18n/keys";
import styles from "../auth.module.css";

export interface ForgotPasswordFormProps {
  /** Form submit handler — e-posta değeri. */
  onSubmit?: (data: { email: string }) => void;
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

export function ForgotPasswordForm({
  onSubmit,
  onBackToLogin,
  loading,
  error,
  t,
  renderLink,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({ email });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.head}>
        <Heading level={3}>{t("forgotPasswordTitle")}</Heading>
        <Text color="secondary">{t("forgotPasswordSubtitle")}</Text>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>{t("email")}</span>
        <Input
          type="email"
          size="large"
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {t("forgotPasswordButton")}
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

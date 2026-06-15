import { useState } from "react";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { PasswordChecklist } from "../../../components/PasswordChecklist";
import { Input } from "antd";
import type { ReactNode } from "react";
import type { ScAuthKeys } from "../../../i18n/keys";
import styles from "../auth.module.css";

export interface ChangePasswordFormProps {
  /** Form submit handler — mevcut ve yeni şifre değerleri. */
  onSubmit?: (data: { current: string; next: string }) => void;
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

export function ChangePasswordForm({
  onSubmit,
  onBackToLogin,
  loading,
  error,
  t,
  renderLink,
}: ChangePasswordFormProps) {
  const [current, setCurrent] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const mismatch = pw2.length > 0 && pw !== pw2;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mismatch) onSubmit?.({ current, next: pw });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.head}>
        <Heading level={3}>{t("changePasswordTitle")}</Heading>
        <Text color="secondary">{t("changePasswordSubtitle")}</Text>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>{t("currentPassword")}</span>
        <Input.Password
          size="large"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder={t("passwordPlaceholder")}
          autoComplete="current-password"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>{t("newPassword")}</span>
        <Input.Password
          size="large"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder={t("passwordPlaceholder")}
          autoComplete="new-password"
        />
      </label>

      <PasswordChecklist value={pw} />

      <label className={styles.field}>
        <span className={styles.label}>{t("newPasswordRepeat")}</span>
        <Input.Password
          size="large"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          status={mismatch ? "error" : undefined}
          placeholder={t("passwordPlaceholder")}
          autoComplete="new-password"
        />
        {mismatch ? (
          <Text size="xs" color="danger">
            {t("passwordMismatch")}
          </Text>
        ) : null}
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
        {t("changePasswordButton")}
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

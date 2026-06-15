import { useState } from "react";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { PasswordChecklist } from "../../../components/PasswordChecklist";
import { Input } from "antd";
import type { ReactNode } from "react";
import type { ScAuthKeys } from "../../../i18n/keys";
import styles from "../auth.module.css";

export interface ResetPasswordFormProps {
  /** Form submit handler — yeni şifre değeri. */
  onSubmit?: (data: { password: string }) => void;
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

export function ResetPasswordForm({
  onSubmit,
  loading,
  error,
  t,
  renderLink,
}: ResetPasswordFormProps) {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const mismatch = pw2.length > 0 && pw !== pw2;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mismatch) onSubmit?.({ password: pw });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.head}>
        <Heading level={3}>{t("resetPasswordTitle")}</Heading>
        <Text color="secondary">{t("resetPasswordSubtitle")}</Text>
      </div>

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
        {t("resetPasswordButton")}
      </Button>

      <div className={styles.foot}>
        {renderLink
          ? renderLink(
              "/giris",
              <span className={styles.link}>{t("backToLoginText")}</span>,
            )
          : null}
      </div>
    </form>
  );
}

import { useState } from "react";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { PasswordChecklist } from "../../../components/PasswordChecklist";
import { Input } from "antd";
import type { ReactNode } from "react";
import type { ScAuthKeys } from "../../../i18n/keys";
import styles from "../auth.module.css";

export interface RegisterFormProps {
  /** Form submit handler — ad, soyad, e-posta, şifre. */
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  /** Giriş sayfasına git handler'ı. */
  onNavigateLogin?: () => void;
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

export function RegisterForm({
  onSubmit,
  onNavigateLogin,
  loading,
  error,
  t,
  renderLink,
}: RegisterFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const mismatch = pw2.length > 0 && pw !== pw2;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mismatch) onSubmit?.({ firstName, lastName, email, password: pw });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.head}>
        <Heading level={3}>{t("registerTitle")}</Heading>
        <Text color="secondary">{t("registerSubtitle")}</Text>
      </div>

      <div className={styles.cols}>
        <label className={styles.field}>
          <span className={styles.label}>{t("firstName")}</span>
          <Input
            size="large"
            placeholder={t("firstName")}
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{t("lastName")}</span>
          <Input
            size="large"
            placeholder={t("lastName")}
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
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

      <label className={styles.field}>
        <span className={styles.label}>{t("password")}</span>
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
        <span className={styles.label}>{t("passwordRepeat")}</span>
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
        {t("registerButton")}
      </Button>

      <div className={styles.foot}>
        {t("haveAccount")}{" "}
        {onNavigateLogin ? (
          <button
            type="button"
            className={styles.link}
            onClick={onNavigateLogin}
          >
            {t("navigateLogin")}
          </button>
        ) : renderLink ? (
          renderLink(
            "/giris",
            <span className={styles.link}>{t("navigateLogin")}</span>,
          )
        ) : null}
      </div>
    </form>
  );
}

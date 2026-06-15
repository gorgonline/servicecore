import { useState } from "react";
import { Enterprise, Renew } from "@carbon/icons-react";
import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";
import { Checkbox, Divider, Input } from "antd";
import type { ReactNode } from "react";
import type { ScAuthKeys } from "../../../i18n/keys";
import styles from "../auth.module.css";

/* Google'ın resmi "G" markası — üçüncü-parti logo (token/renk kuralı dışı). */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" width={18} height={18} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

export interface LoginFormProps {
  /** Form submit handler — e-posta, şifre, beni hatırla, captcha değerleri. */
  onSubmit?: (data: {
    email: string;
    password: string;
    remember: boolean;
    captcha: string;
  }) => void;
  /** Şifremi unuttum tıklama handler'ı. */
  onForgotPassword?: () => void;
  /** Google ile giriş handler'ı. */
  onGoogleLogin?: () => void;
  /** Kurumsal SSO handler'ı. */
  onSsoLogin?: () => void;
  /** Kayıt ol navigasyon handler'ı. */
  onNavigateRegister?: () => void;
  /** Captcha alanı gösterilsin mi? */
  captchaEnabled?: boolean;
  /**
   * Captcha görseli olarak render edilecek ReactNode.
   * Tipik kullanım: metin captcha için `<>{CAPTCHAS[idx]}</>`,
   * görsel captcha için `<img src={url} alt="captcha" />`.
   */
  captchaContent?: ReactNode;
  /** Captcha yenile butonu handler'ı. */
  onRefreshCaptcha?: () => void;
  /** Google butonu gösterilsin mi? */
  googleEnabled?: boolean;
  /** SSO butonu gösterilsin mi? */
  ssoEnabled?: boolean;
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

export function LoginForm({
  onSubmit,
  onForgotPassword,
  onGoogleLogin,
  onSsoLogin,
  onNavigateRegister,
  captchaEnabled = true,
  captchaContent,
  onRefreshCaptcha,
  googleEnabled = true,
  ssoEnabled = true,
  loading,
  error,
  t,
  renderLink,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [captcha, setCaptcha] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.({ email, password, remember, captcha });
  }

  const showAltMethods = googleEnabled || ssoEnabled;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.head}>
        <Heading level={3}>{t("loginTitle")}</Heading>
        <Text color="secondary">{t("loginSubtitle")}</Text>
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
          placeholder={t("passwordPlaceholder")}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {captchaEnabled && (
        <label className={styles.field}>
          <span className={styles.label}>{t("captchaLabel")}</span>
          <div className={styles.captchaRow}>
            <span
              className={styles.captchaImg}
              aria-label={t("captchaLabel")}
            >
              {captchaContent}
            </span>
            <Button
              type="text"
              leadingIcon={<Renew size={18} />}
              aria-label={t("captchaRefresh")}
              title={t("captchaRefresh")}
              onClick={onRefreshCaptcha}
            />
          </div>
          <Input
            size="large"
            placeholder={t("captchaPlaceholder")}
            autoComplete="off"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />
        </label>
      )}

      <div className={styles.row}>
        <Checkbox
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        >
          {t("rememberMe")}
        </Checkbox>
        {onForgotPassword ? (
          <button
            type="button"
            className={styles.link}
            onClick={onForgotPassword}
          >
            {t("forgotPassword")}
          </button>
        ) : renderLink ? (
          renderLink(
            "/sifremi-unuttum",
            <span className={styles.link}>{t("forgotPassword")}</span>,
          )
        ) : null}
      </div>

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
        {t("loginButton")}
      </Button>

      {showAltMethods && (
        <>
          <Divider plain>{t("orContinueWith")}</Divider>
          <div className={styles.altMethods}>
            {googleEnabled && (
              <Button
                size="large"
                block
                leadingIcon={<GoogleIcon />}
                onClick={onGoogleLogin}
              >
                {t("googleLogin")}
              </Button>
            )}
            {ssoEnabled && (
              <Button
                size="large"
                block
                leadingIcon={<Enterprise size={18} />}
                onClick={onSsoLogin}
              >
                {t("ssoLogin")}
              </Button>
            )}
          </div>
        </>
      )}

      <div className={styles.foot}>
        {t("noAccount")}{" "}
        {onNavigateRegister ? (
          <button
            type="button"
            className={styles.link}
            onClick={onNavigateRegister}
          >
            {t("navigateRegister")}
          </button>
        ) : renderLink ? (
          renderLink(
            "/kayit",
            <span className={styles.link}>{t("navigateRegister")}</span>,
          )
        ) : null}
      </div>
    </form>
  );
}

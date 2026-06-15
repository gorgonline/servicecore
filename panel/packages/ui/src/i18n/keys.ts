/**
 * @servicecoreui/ui — i18n namespace sabitleri ve anahtar tipleri
 *
 * Bu dosya YALNIZCA tip tanımları ve namespace sabitleri içerir.
 * Gerçek çeviri değerleri (addResourceBundle) tüketici uygulamaya aittir.
 * packages/ui içinde hiçbir çeviri değeri, satisfies ifadesi veya
 * addResourceBundle çağrısı BULUNMAZ.
 */

// ── Namespace sabitleri ─────────────────────────────────────────────────────

export const SC_AUTH_NS = "sc-auth" as const;
export const SC_LAYOUT_NS = "sc-layout" as const;

// ── Auth namespace key'leri ─────────────────────────────────────────────────

/**
 * sc-auth namespace'inin tüm key'leri.
 * Tüketici uygulama bu tip ile `satisfies` kullanarak eksiksiz çeviri
 * sağladığını derleme zamanında doğrulayabilir.
 */
export type ScAuthKeys = {
  /** Form alan etiketi: e-posta. */
  email: string;
  /** E-posta input placeholder'ı. */
  emailPlaceholder: string;
  /** Form alan etiketi: şifre. */
  password: string;
  /** Şifre input placeholder'ı. */
  passwordPlaceholder: string;
  /** Giriş yap butonu metni. */
  loginButton: string;
  /** "Beni hatırla" checkbox metni. */
  rememberMe: string;
  /** Şifremi unuttum bağlantı metni. */
  forgotPassword: string;
  /** Alternatif giriş yöntemleri ayraç metni. */
  orContinueWith: string;
  /** Google ile giriş butonu metni. */
  googleLogin: string;
  /** Kurumsal SSO ile giriş butonu metni. */
  ssoLogin: string;
  /** CAPTCHA yenile butonu erişilebilirlik etiketi. */
  captchaRefresh: string;
  /** CAPTCHA alan etiketi. */
  captchaLabel: string;
  /** Genel form gönder butonu metni (şifre sıfırla, doğrula vb.). */
  submitButton: string;
  /** Giriş sayfasına dön bağlantı metni. */
  backToLogin: string;
  /** Şifre sıfırlama sayfası başlığı. */
  resetPasswordTitle: string;
  /** Yeni şifre alan etiketi. */
  newPassword: string;
  /** Şifre tekrar alan etiketi. */
  confirmPassword: string;
  /** İki faktörlü doğrulama kod alanı etiketi. */
  twoFactorCode: string;
  /** Kodu tekrar gönder bağlantı metni. */
  resendCode: string;
  /** Kayıt ol butonu metni. */
  registerButton: string;
  /** Yetkisiz erişim sayfası başlığı. */
  unauthorizedTitle: string;
  /** Yetkisiz erişim sayfası açıklama metni. */
  unauthorizedMessage: string;
  /** Giriş sayfası başlığı. */
  loginTitle: string;
  /** Giriş sayfası alt başlığı. */
  loginSubtitle: string;
  /** Captcha input placeholder'ı. */
  captchaPlaceholder: string;
  /** "Hesabın yok mu?" metni. */
  noAccount: string;
  /** Kayıt ol bağlantı metni. */
  navigateRegister: string;
  /** Girişe dön bağlantı metni (kısa, form altı). */
  backToLoginText: string;
  /** Şifremi unuttum sayfası başlığı. */
  forgotPasswordTitle: string;
  /** Şifremi unuttum sayfası alt metni. */
  forgotPasswordSubtitle: string;
  /** Şifremi unuttum form butonu metni. */
  forgotPasswordButton: string;
  /** "Zaten hesabın var mı?" metni. */
  haveAccount: string;
  /** Kayıt sayfasındaki giriş yap bağlantı metni. */
  navigateLogin: string;
  /** Şifre sıfırla sayfası alt metni. */
  resetPasswordSubtitle: string;
  /** Şifre sıfırla butonu metni. */
  resetPasswordButton: string;
  /** Şifre değiştir sayfası başlığı. */
  changePasswordTitle: string;
  /** Şifre değiştir sayfası alt metni. */
  changePasswordSubtitle: string;
  /** Mevcut şifre alan etiketi. */
  currentPassword: string;
  /** Şifreyi güncelle butonu metni. */
  changePasswordButton: string;
  /** Yeni şifre (tekrar) alan etiketi. */
  newPasswordRepeat: string;
  /** Şifre eşleşmiyor hata metni. */
  passwordMismatch: string;
  /** İki adımlı doğrulama sayfası başlığı. */
  twoFactorTitle: string;
  /** İki adımlı doğrulama sayfası alt metni. */
  twoFactorSubtitle: string;
  /** İki adımlı doğrulama doğrula butonu metni. */
  twoFactorVerify: string;
  /** İki adımlı doğrulama kod input placeholder'ı. */
  twoFactorCodePlaceholder: string;
  /** 2FA kurulum sayfası başlığı. */
  twoFactorSetupTitle: string;
  /** 2FA kurulum sayfası alt metni. */
  twoFactorSetupSubtitle: string;
  /** Kayıt sayfası başlığı. */
  registerTitle: string;
  /** Kayıt sayfası alt metni. */
  registerSubtitle: string;
  /** Ad alan etiketi. */
  firstName: string;
  /** Soyad alan etiketi. */
  lastName: string;
  /** Şifre (tekrar) alan etiketi. */
  passwordRepeat: string;
};

// ── Layout namespace key'leri ───────────────────────────────────────────────

/**
 * sc-layout namespace'inin tüm key'leri.
 * Panel chrome (header, sidebar, kullanıcı menüsü) metnleri.
 */
export type ScLayoutKeys = {
  /** Oturumu kapat menü öğesi. */
  logout: string;
  /** Bildirimler butonu erişilebilirlik etiketi. */
  notifications: string;
  /** Arama butonu erişilebilirlik etiketi. */
  search: string;
  /** Profil/hesap menüsü etiketi. */
  profile: string;
  /** Ayarlar butonu erişilebilirlik etiketi. */
  settings: string;
  /** Yardım butonu erişilebilirlik etiketi. */
  help: string;
  /** Menüyü genişlet tooltip metni. */
  menu: string;
  /** Menüyü daralt tooltip metni. */
  closeMenu: string;
};

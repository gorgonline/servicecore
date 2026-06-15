import type { ScAuthKeys } from "@servicecoreui/ui";

/**
 * sc-auth namespace — Türkçe çeviriler (playground)
 *
 * satisfies ile derleme zamanında eksiksizlik doğrulanır.
 * Bu dosya YALNIZCA playground'a aittir; packages/ui'ye import edilmez.
 */
const scAuth = {
  email: "E-posta",
  emailPlaceholder: "ornek@sirket.com",
  password: "Şifre",
  passwordPlaceholder: "••••••••",
  loginButton: "Giriş yap",
  rememberMe: "Beni hatırla",
  forgotPassword: "Şifremi unuttum",
  orContinueWith: "veya",
  googleLogin: "Google ile devam et",
  ssoLogin: "Kurumsal SSO ile giriş",
  captchaRefresh: "Kodu yenile",
  captchaLabel: "Doğrulama kodu",
  submitButton: "Gönder",
  backToLogin: "Giriş sayfasına dön",
  resetPasswordTitle: "Şifre sıfırla",
  newPassword: "Yeni şifre",
  confirmPassword: "Şifre tekrar",
  twoFactorCode: "Doğrulama kodu",
  resendCode: "Kodu tekrar gönder",
  registerButton: "Hesap oluştur",
  unauthorizedTitle: "Yetkisiz Erişim",
  unauthorizedMessage:
    "Bu sayfaya erişim yetkiniz yok.",
  loginTitle: "Giriş yap",
  loginSubtitle: "Hesabınla devam et",
  captchaPlaceholder: "Yukarıdaki kodu gir",
  noAccount: "Hesabın yok mu?",
  navigateRegister: "Kayıt ol",
  backToLoginText: "Girişe dön",
  forgotPasswordTitle: "Şifremi unuttum",
  forgotPasswordSubtitle:
    "E-posta adresini gir, sıfırlama bağlantısını gönderelim.",
  forgotPasswordButton: "Sıfırlama bağlantısı gönder",
  haveAccount: "Zaten hesabın var mı?",
  navigateLogin: "Giriş yap",
  resetPasswordSubtitle: "Yeni şifreni belirle ve hesabına devam et.",
  resetPasswordButton: "Şifreyi sıfırla",
  changePasswordTitle: "Şifre değiştir",
  changePasswordSubtitle: "Güvenliğin için yeni bir şifre belirle.",
  currentPassword: "Mevcut şifre",
  changePasswordButton: "Şifreyi güncelle",
  newPasswordRepeat: "Yeni şifre (tekrar)",
  passwordMismatch: "Şifreler eşleşmiyor.",
  twoFactorTitle: "İki adımlı doğrulama",
  twoFactorSubtitle: "Doğrulama uygulamandaki 6 haneli kodu gir.",
  twoFactorVerify: "Doğrula",
  twoFactorCodePlaceholder: "••••••",
  twoFactorSetupTitle: "Doğrulayıcıyı kur",
  twoFactorSetupSubtitle:
    "Google Authenticator ile QR kodu tara, sonra üretilen 6 haneli kodu gir.",
  registerTitle: "Hesap oluştur",
  registerSubtitle: "ServiceCore hesabını oluştur.",
  firstName: "Ad",
  lastName: "Soyad",
  passwordRepeat: "Şifre (tekrar)",
} satisfies ScAuthKeys;

export default scAuth;

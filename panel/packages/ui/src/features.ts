/**
 * @servicecoreui/ui/features — sayfa-seviyesi feature bileşenleri.
 *
 * Auth / ayarlar / sistem akışlarının saf (Next'e bağlı olmayan) yapıtaşları:
 *   • AuthShell         — split-screen auth kabuğu (giriş/kayıt/şifre akışları)
 *   • PasswordChecklist — canlı parola kuralı göstergesi
 *   • SystemMessage     — tam-ekran sistem durumu (404/500/yetkisiz)
 *   • SettingsForm      — data-driven ayar formu (sekme + koşullu alanlar)
 *
 * Tüketici sayfa şablonları (MCP `get_page`) bu bileşenleri npm'den import eder;
 * sayfanın kendisi kaynak-kod şablonu olarak gelir (kopyalanır), yapıtaşları gelmez.
 *
 * NOT: Bu bundle "use client" banner'lı (build.mjs) — SettingsForm AntD Form
 * kullanır (createContext → RSC server context'inde patlar).
 *
 * Geriye-uyum: bu bileşenler `@servicecoreui/ui/custom` altından da erişilebilir
 * (custom bu modülü re-export eder). Kanonik ev burası: `@servicecoreui/ui/features`.
 */

export * from "./AuthShell";
export * from "./PasswordChecklist";
export * from "./SystemMessage";
export * from "./SettingsForm";

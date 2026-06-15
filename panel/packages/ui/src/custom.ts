/**
 * @servicecoreui/ui/custom — ServiceCore'un kendi yaptığı bileşenler.
 *
 * Buraya ne girer:
 *   • Sıfırdan kurduğumuz, ServiceCore'a özel bileşenler (AntD wrap DEĞİL).
 *
 * Buraya ne GİRMEZ:
 *   • AntD wrap'leri → `@servicecoreui/ui/wraps`
 *   • Typography primitifleri (Heading/Text/…) → ana entry `@servicecoreui/ui`
 *
 * NOT: Bu bundle "use client" banner'lı (build.mjs). İçinde AntD wrap kullanan
 * composite'ler (CommandPalette) var; client-only. Brand/Kbd presentational
 * ama tutarlılık için aynı kovada.
 */

export * from "./components/Brand";
export * from "./components/Kbd";
export * from "./components/ListItem";
export * from "./components/NavCard";
export * from "./components/PageHeader";
export * from "./components/RecentPanels";
export * from "./components/SearchableMenu";
export * from "./components/DataTable";
export * from "./components/CommandPalette";
export * from "./components/TimeTracker";
export * from "./components/NotificationCenter";
export * from "./components/UserMenu";

// ── Sayfa yapıtaşları (auth + ayarlar + sistem) ──
// Saf bileşenler (Next'e bağlı değil); auth/ayarlar/sistem sayfaları bunları
// npm'den import eder. Sayfaların kendisi get_page ile kaynak-kod şablonu gelir.
export * from "./features/auth";
export * from "./features/layout";
export * from "./components/PasswordChecklist";
export * from "./components/SystemMessage";
export * from "./components/SettingsForm";

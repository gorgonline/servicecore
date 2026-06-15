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

export * from "./Brand";
export * from "./Kbd";
export * from "./ListItem";
export * from "./NavCard";
export * from "./PageHeader";
export * from "./RecentPanels";
export * from "./SearchableMenu";
export * from "./DataTable";
export * from "./CommandPalette";
export * from "./TimeTracker";
export * from "./NotificationCenter";
export * from "./UserMenu";

// ── Sayfa yapıtaşları (auth + ayarlar + sistem) ──
// Kanonik ev artık `@servicecoreui/ui/features` (AuthShell·PasswordChecklist·
// SystemMessage·SettingsForm). ./custom bunları geriye-uyum için re-export eder
// — 0.5.0'da bu yolu kullanan tüketiciler kırılmasın.
export * from "./features";

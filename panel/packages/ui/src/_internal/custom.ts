/**
 * @servicecoreui/ui/custom — DAHİLİ geçiş barrel'ı (public yüzeyde değil).
 *
 * Eski "custom" bileşenleri artık primitive (jenerik yapı taşları —
 * `src/primitive/`) veya domain feature (`src/feature/<domain>/`) olarak
 * sınıflandırıldı. Bu barrel sadece playground/dahili kullanım + geçiş için
 * tutuluyor. Tüketici bu yapı taşlarını doğrudan kullanmaz; domain feature
 * bileşenlerini import eder. Bkz. ARCHITECTURE-feature-based.md.
 */

// Jenerik yapı taşları → primitive
export * from "../primitive/Brand";
export * from "../primitive/Kbd";
export * from "../primitive/ListItem";
export * from "../primitive/NavCard";
export * from "../primitive/PageHeader";
export * from "../primitive/RecentPanels";
export * from "../primitive/SearchableMenu";
export * from "../primitive/DataTable";
export * from "../primitive/CommandPalette";
export * from "../primitive/UserMenu";

// Domain feature'ları (eski custom'da idi → şimdi feature/<domain>)
export * from "../feature/time/TimeTracker";
export * from "../feature/notification/NotificationCenter";

// ── Geriye-uyum: auth/ayarlar/sistem feature'ları ──
export * from "./features";

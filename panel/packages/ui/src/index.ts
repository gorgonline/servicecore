/**
 * @servicecoreui/ui — public API
 *
 * Faz 1: token foundation + AntD theme.
 * Faz 3'te ilk wrap bileşenleri (Button, Input, Badge, Tag) eklenecek.
 */

export const VERSION = "0.7.0";

// ── Public API yüzeyi ───────────────────────────────────────
// Bu paket SADECE domain feature'larını + theme'i dışarı açar.
//   • Feature bileşenleri → `@servicecoreui/ui/auth` `/settings` `/system` `/sla`
//     `/notification` `/time`
//   • Theme → aşağıda (+ `/theme` subpath)
// Primitive (Button/Card/Table…), typography ve jenerik bloklar PUBLIC DEĞİL —
// tüketici kendi tasarımını kurmaz, hazır feature bileşenlerini kullanır.
// Bkz. ARCHITECTURE-feature-based.md.

// ── Theme ───────────────────────────────────────────────────
// Re-export theme & tokens for convenience (also available via /theme subpath)
export {
  servicecoreTheme,
  colors,
  radius,
  spacing,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  duration,
  easing,
  zIndex,
  controlHeight,
  cssVar,
} from "./theme";

export type {
  ColorScale,
  NeutralStep,
  PrimaryStep,
  Radius,
  Spacing,
  FontSize,
  FontWeight,
} from "./theme";

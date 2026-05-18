/**
 * @servicecore/ui — public API
 *
 * Faz 1: token foundation + AntD theme.
 * Faz 3'te ilk wrap bileşenleri (Button, Input, Badge, Tag) eklenecek.
 */

export const VERSION = "0.0.1";

// ── Components ──────────────────────────────────────────────
// Typography (server-safe, no AntD dep)
export * from "./Heading";
export * from "./Display";
export * from "./Text";
export * from "./Eyebrow";
export * from "./Code";

// NOT: AntD wrap'leri burada DEĞİL — `@servicecore/ui/wraps` subpath altında.
// Sebep: AntD runtime'da createContext kullanır, RSC server context'inde patlar.
// `import { Button } from "@servicecore/ui/wraps"` ile kullan.

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

/**
 * Theme public API
 *
 * Tüketici:
 *   import { servicecoreTheme } from '@servicecore/ui/theme';
 *   <ConfigProvider theme={servicecoreTheme}>...</ConfigProvider>
 *
 * Token erişimi (TS):
 *   import { colors, radius, cssVar } from '@servicecore/ui/theme';
 *   colors.primary[500]   → '#0070F3'
 *   cssVar.color.accent   → 'var(--sc-color-accent)'
 */

export { servicecoreTheme } from "./theme";

export {
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
} from "./tokens";

export type {
  ColorScale,
  NeutralStep,
  PrimaryStep,
  Radius,
  Spacing,
  FontSize,
  FontWeight,
} from "./tokens";

/**
 * @servicecoreui/ui — tokens (TypeScript counterpart)
 *
 * tokens.css ile PARALEL tutulur. Bir değeri değiştirirken ikisini birden güncelle.
 * AntD theme.ts bu dosyadan beslenir (CSS değişkeni değil, gerçek değer lazım çünkü
 * AntD mapToken algoritması renk türetir).
 *
 * Bileşenler:
 *   - CSS Module içinde →  `var(--sc-color-accent)` (string literal, tokens.css'ten gelir)
 *   - TS içinde         →  `cssVar.color.accent` (= `'var(--sc-color-accent)'`)
 */

// ─── PALETTE (canonical values) ─────────────────────────────

export const colors = {
  neutral: {
    0:   "oklch(1 0 0)",
    50:  "oklch(0.985 0 0)",
    100: "oklch(0.97 0 0)",
    200: "oklch(0.94 0 0)",
    300: "oklch(0.88 0 0)",
    400: "oklch(0.75 0 0)",
    500: "oklch(0.62 0 0)",
    600: "oklch(0.5 0 0)",
    700: "oklch(0.38 0 0)",
    800: "oklch(0.25 0 0)",
    900: "oklch(0.15 0 0)",
    950: "oklch(0.08 0 0)",
  },
  primary: {
    50:  "oklch(0.97 0.02 252)",
    100: "oklch(0.93 0.05 252)",
    200: "oklch(0.85 0.10 252)",
    300: "oklch(0.75 0.14 252)",
    400: "oklch(0.66 0.18 252)",
    500: "#0070F3",
    600: "oklch(0.52 0.21 252)",
    700: "oklch(0.46 0.21 252)",
    800: "oklch(0.38 0.18 252)",
    900: "oklch(0.30 0.15 252)",
  },
  success: {
    50:  "oklch(0.97 0.03 145)",
    500: "oklch(0.62 0.16 145)",
    700: "oklch(0.50 0.16 145)",
  },
  warning: {
    50:  "oklch(0.97 0.04 75)",
    500: "oklch(0.72 0.16 75)",
    700: "oklch(0.58 0.16 70)",
  },
  danger: {
    50:  "oklch(0.97 0.02 25)",
    500: "oklch(0.62 0.22 25)",
    700: "oklch(0.50 0.22 25)",
  },
} as const;

// ─── RADIUS ─────────────────────────────────────────────────

export const radius = {
  none: 0,
  xs:   2,
  sm:   4,
  md:   6,
  lg:   8,
  xl:   12,
  "2xl": 16,
  full: 9999,
} as const;

// ─── SPACING (4px base, px values) ──────────────────────────

export const spacing = {
  0:  0,
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

// ─── TYPOGRAPHY ─────────────────────────────────────────────

export const fontFamily = {
  sans: '"Geist", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: '"Geist Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
} as const;

export const fontSize = {
  "2xs": 11,
  xs:    12,
  sm:    13,
  md:    14,
  lg:    16,
  xl:    18,
  "2xl": 22,
  "3xl": 28,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
} as const;

export const lineHeight = {
  none:    1,
  tight:   1.2,
  snug:    1.35,
  normal:  1.5,
  relaxed: 1.625,
} as const;

export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const;

export const letterSpacing = {
  tighter: "-0.03em",
  tight:   "-0.015em",
  normal:  "0",
  wide:    "0.02em",
  wider:   "0.08em",
} as const;

// ─── MOTION ─────────────────────────────────────────────────

export const duration = {
  instant: 0,
  fast:    120,
  normal:  180,
  slow:    280,
} as const;

export const easing = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  in:      "cubic-bezier(0.4, 0, 1, 1)",
  out:     "cubic-bezier(0, 0, 0.2, 1)",
  spring:  "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// ─── Z-INDEX ────────────────────────────────────────────────

export const zIndex = {
  base:     0,
  dropdown: 1000,
  sticky:   1010,
  overlay:  1020,
  modal:    1030,
  popover:  1040,
  tooltip:  1050,
  toast:    1060,
} as const;

// ─── CONTROL HEIGHTS ────────────────────────────────────────

export const controlHeight = {
  sm: 28,
  md: 36,
  lg: 44,
} as const;

// ─── CSS VARIABLE REFERENCES ────────────────────────────────
// Bileşenlerde inline style veya emotion vb. lazım olursa: cssVar.color.accent

export const cssVar = {
  color: {
    bg: {
      base:     "var(--sc-color-bg-base)",
      subtle:   "var(--sc-color-bg-subtle)",
      muted:    "var(--sc-color-bg-muted)",
      emphasis: "var(--sc-color-bg-emphasis)",
      overlay:  "var(--sc-color-bg-overlay)",
    },
    text: {
      primary:   "var(--sc-color-text-primary)",
      secondary: "var(--sc-color-text-secondary)",
      tertiary:  "var(--sc-color-text-tertiary)",
      disabled:  "var(--sc-color-text-disabled)",
      inverse:   "var(--sc-color-text-inverse)",
      accent:    "var(--sc-color-text-accent)",
    },
    border: {
      subtle:  "var(--sc-color-border-subtle)",
      default: "var(--sc-color-border-default)",
      strong:  "var(--sc-color-border-strong)",
      accent:  "var(--sc-color-border-accent)",
      focus:   "var(--sc-color-border-focus)",
    },
    accent: {
      base:     "var(--sc-color-accent)",
      hover:    "var(--sc-color-accent-hover)",
      active:   "var(--sc-color-accent-active)",
      subtle:   "var(--sc-color-accent-subtle)",
      onAccent: "var(--sc-color-accent-on-accent)",
    },
    state: {
      successBg: "var(--sc-color-state-success-bg)",
      successFg: "var(--sc-color-state-success-fg)",
      warningBg: "var(--sc-color-state-warning-bg)",
      warningFg: "var(--sc-color-state-warning-fg)",
      dangerBg:  "var(--sc-color-state-danger-bg)",
      dangerFg:  "var(--sc-color-state-danger-fg)",
      infoBg:    "var(--sc-color-state-info-bg)",
      infoFg:    "var(--sc-color-state-info-fg)",
    },
  },
  radius: {
    none: "var(--sc-radius-none)",
    xs:   "var(--sc-radius-xs)",
    sm:   "var(--sc-radius-sm)",
    md:   "var(--sc-radius-md)",
    lg:   "var(--sc-radius-lg)",
    xl:   "var(--sc-radius-xl)",
    "2xl":"var(--sc-radius-2xl)",
    full: "var(--sc-radius-full)",
  },
  space: {
    0:  "var(--sc-space-0)",
    1:  "var(--sc-space-1)",
    2:  "var(--sc-space-2)",
    3:  "var(--sc-space-3)",
    4:  "var(--sc-space-4)",
    5:  "var(--sc-space-5)",
    6:  "var(--sc-space-6)",
    8:  "var(--sc-space-8)",
    10: "var(--sc-space-10)",
    12: "var(--sc-space-12)",
    16: "var(--sc-space-16)",
  },
  font: {
    sans: "var(--sc-font-sans)",
    mono: "var(--sc-font-mono)",
  },
  shadow: {
    none:      "var(--sc-shadow-none)",
    xs:        "var(--sc-shadow-xs)",
    sm:        "var(--sc-shadow-sm)",
    md:        "var(--sc-shadow-md)",
    lg:        "var(--sc-shadow-lg)",
    xl:        "var(--sc-shadow-xl)",
    focusRing: "var(--sc-shadow-focus-ring)",
  },
} as const;

// ─── TYPE EXPORTS ───────────────────────────────────────────

export type ColorScale = keyof typeof colors;
export type NeutralStep = keyof typeof colors.neutral;
export type PrimaryStep = keyof typeof colors.primary;
export type Radius = keyof typeof radius;
export type Spacing = keyof typeof spacing;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;

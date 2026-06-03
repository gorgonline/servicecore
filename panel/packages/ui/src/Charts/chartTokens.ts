/**
 * Chart token köprüsü — Recharts SVG'ye doğrudan geçilen CSS değişkeni string'leri.
 * JS köprüsü (getComputedStyle) YOK: SVG fill/stroke prop'ları var(--sc-*) kabul eder.
 * Tek kaynak: theme/tokens.css.
 */

/** Kategorik seri renkleri (sırayla atanır). */
export const CHART_SERIES = [
  "var(--sc-chart-1)",
  "var(--sc-chart-2)",
  "var(--sc-chart-3)",
  "var(--sc-chart-4)",
  "var(--sc-chart-5)",
  "var(--sc-chart-6)",
];

export const CHART_GRID = "var(--sc-color-border-subtle)";
export const CHART_AXIS = "var(--sc-color-text-tertiary)";
export const CHART_AXIS_LINE = "var(--sc-color-border-default)";
export const CHART_FONT = "var(--sc-font-sans)";
export const CHART_FONT_SIZE = 12;

/** Recharts Tooltip contentStyle — ServiceCore kart dili (token'lı). */
export const CHART_TOOLTIP_STYLE = {
  background: "var(--sc-color-bg-base)",
  border: "1px solid var(--sc-color-border-default)",
  borderRadius: "var(--sc-radius-md)",
  boxShadow: "var(--sc-shadow-md)",
  fontFamily: "var(--sc-font-sans)",
  fontSize: 12,
  color: "var(--sc-color-text-primary)",
} as const;

import type { AccentName } from "./types";

interface AccentTokens {
  light: string;
  base: string;
  dark: string;
  alpha10: string;
  alpha30: string;
}

export const ACCENT_TOKENS: Record<AccentName, AccentTokens> = {
  blue: {
    light: "var(--color-accent-blue-light)",
    base: "var(--color-accent-blue-base)",
    dark: "var(--color-accent-blue-dark)",
    alpha10: "rgba(59,130,246,0.10)",
    alpha30: "rgba(59,130,246,0.30)",
  },
  red: {
    light: "var(--color-accent-red-light)",
    base: "var(--color-accent-red-base)",
    dark: "var(--color-accent-red-dark)",
    alpha10: "rgba(239,68,68,0.10)",
    alpha30: "rgba(239,68,68,0.30)",
  },
  amber: {
    light: "var(--color-accent-amber-light)",
    base: "var(--color-accent-amber-base)",
    dark: "var(--color-accent-amber-dark)",
    alpha10: "rgba(245,158,11,0.10)",
    alpha30: "rgba(245,158,11,0.30)",
  },
  cyan: {
    light: "var(--color-accent-cyan-light)",
    base: "var(--color-accent-cyan-base)",
    dark: "var(--color-accent-cyan-dark)",
    alpha10: "rgba(6,182,212,0.10)",
    alpha30: "rgba(6,182,212,0.30)",
  },
  purple: {
    light: "var(--color-accent-purple-light)",
    base: "var(--color-accent-purple-base)",
    dark: "var(--color-accent-purple-dark)",
    alpha10: "rgba(168,85,247,0.10)",
    alpha30: "rgba(168,85,247,0.30)",
  },
  orange: {
    light: "var(--color-accent-orange-light)",
    base: "var(--color-accent-orange-base)",
    dark: "var(--color-accent-orange-dark)",
    alpha10: "rgba(249,115,22,0.10)",
    alpha30: "rgba(249,115,22,0.30)",
  },
  sky: {
    light: "var(--color-accent-sky-light)",
    base: "var(--color-accent-sky-base)",
    dark: "var(--color-accent-sky-dark)",
    alpha10: "rgba(56,189,248,0.10)",
    alpha30: "rgba(56,189,248,0.30)",
  },
  pink: {
    light: "var(--color-accent-pink-light)",
    base: "var(--color-accent-pink-base)",
    dark: "var(--color-accent-pink-dark)",
    alpha10: "rgba(236,72,153,0.10)",
    alpha30: "rgba(236,72,153,0.30)",
  },
  emerald: {
    light: "var(--color-accent-emerald-light)",
    base: "var(--color-accent-emerald-base)",
    dark: "var(--color-accent-emerald-dark)",
    alpha10: "rgba(16,185,129,0.10)",
    alpha30: "rgba(16,185,129,0.30)",
  },
};

export function getAccent(name: AccentName | string | undefined): AccentTokens {
  if (name && (name as AccentName) in ACCENT_TOKENS) {
    return ACCENT_TOKENS[name as AccentName];
  }
  return ACCENT_TOKENS.blue;
}

/**
 * Some modules in the design doc share an accent but use the dark variant for the
 * opener gradient stop. This map captures that nuance.
 */
export const ACCENT_GRADIENT_STOP: Record<string, "base" | "dark"> = {
  "configuration-management-and-cmdb": "dark",
  "measurement-and-reporting-management": "dark",
  "service-automation": "dark",
  "enterprise-service-management": "dark",
};

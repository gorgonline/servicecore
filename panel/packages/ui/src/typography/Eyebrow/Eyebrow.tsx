import { createElement } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";
import styles from "./Eyebrow.module.css";

export type EyebrowTone =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger";

export interface EyebrowProps extends ComponentPropsWithoutRef<"span"> {
  /** Renk vurgusu. Default: tersiyer gri */
  tone?: EyebrowTone;
  as?: "span" | "div" | "p" | "label";
}

const TONE: Partial<Record<EyebrowTone, string>> = {
  primary:   styles.tonePrimary,
  secondary: styles.toneSecondary,
  accent:    styles.toneAccent,
  success:   styles.toneSuccess,
  warning:   styles.toneWarning,
  danger:    styles.toneDanger,
};

export function Eyebrow({ tone = "default", as = "span", className, children, ...rest }: EyebrowProps) {
  return createElement(
    as as ElementType,
    { className: clsx(styles.eyebrow, TONE[tone], className), ...rest },
    children,
  );
}

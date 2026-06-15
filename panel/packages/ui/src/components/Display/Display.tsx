import { createElement } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";
import styles from "./Display.module.css";

export type DisplaySize = "sm" | "md" | "lg";
type DisplayTag = "h1" | "h2" | "h3" | "div" | "span";

export interface DisplayProps extends ComponentPropsWithoutRef<"h1"> {
  /** Boyut. Default: md. Hero ekranlarda lg, bölüm hero'larında md, küçük hero'larda sm */
  size?: DisplaySize;
  /** Semantik etiket override. Default: h1 */
  as?: DisplayTag;
}

const SIZE_CLASS: Partial<Record<DisplaySize, string>> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export function Display({ size = "md", as = "h1", className, children, ...rest }: DisplayProps) {
  return createElement(
    as as ElementType,
    { className: clsx(styles.display, SIZE_CLASS[size], className), ...rest },
    children,
  );
}

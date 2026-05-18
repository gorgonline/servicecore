import { createElement } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";
import styles from "./Text.module.css";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "disabled"
  | "inverse"
  | "accent"
  | "success"
  | "warning"
  | "danger";
export type TextAlign = "start" | "center" | "end";
type TextTag = "p" | "span" | "div" | "label" | "li" | "dt" | "dd";

export interface TextProps extends ComponentPropsWithoutRef<"p"> {
  /** Boyut. Default: md (14px) */
  size?: TextSize;
  /** Ağırlık. Default: regular (400) */
  weight?: TextWeight;
  /** Anlam-bazlı renk. Default: primary */
  color?: TextColor;
  /** Hizalama */
  align?: TextAlign;
  /** Tek satır kes + ellipsis */
  truncate?: boolean;
  /** Etiket override. Default: p */
  as?: TextTag;
}

/* CSS Module map'leri — noUncheckedIndexedAccess nedeniyle değerler undefined olabilir.
 * clsx undefined'i sessizce yutar, davranış değişmez. */
const SIZE: Partial<Record<TextSize, string>> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

const WEIGHT: Partial<Record<TextWeight, string>> = {
  regular:  styles.weightRegular,
  medium:   styles.weightMedium,
  semibold: styles.weightSemibold,
  bold:     styles.weightBold,
};

const COLOR: Partial<Record<TextColor, string>> = {
  primary:   styles.colorPrimary,
  secondary: styles.colorSecondary,
  tertiary:  styles.colorTertiary,
  disabled:  styles.colorDisabled,
  inverse:   styles.colorInverse,
  accent:    styles.colorAccent,
  success:   styles.colorSuccess,
  warning:   styles.colorWarning,
  danger:    styles.colorDanger,
};

const ALIGN: Partial<Record<TextAlign, string>> = {
  start:  styles.alignStart,
  center: styles.alignCenter,
  end:    styles.alignEnd,
};

export function Text({
  size = "md",
  weight = "regular",
  color = "primary",
  align,
  truncate,
  as = "p",
  className,
  children,
  ...rest
}: TextProps) {
  return createElement(
    as as ElementType,
    {
      className: clsx(
        styles.text,
        SIZE[size],
        WEIGHT[weight],
        COLOR[color],
        align && ALIGN[align],
        truncate && styles.truncate,
        className,
      ),
      ...rest,
    },
    children,
  );
}

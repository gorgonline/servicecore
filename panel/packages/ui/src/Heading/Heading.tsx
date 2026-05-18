import { createElement } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";
import styles from "./Heading.module.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span";

export interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  /** Visual size & default semantic level (h1–h6). Default: 1 */
  level?: HeadingLevel;
  /** Override semantic tag. Görsel boyutu `level` belirler, semantik etiketi `as` belirler. */
  as?: HeadingTag;
}

export function Heading({ level = 1, as, className, children, ...rest }: HeadingProps) {
  const Tag = (as ?? `h${level}`) as ElementType;
  return createElement(
    Tag,
    { className: clsx(styles.heading, styles[`level${level}`], className), ...rest },
    children,
  );
}

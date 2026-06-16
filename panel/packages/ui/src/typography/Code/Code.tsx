import { createElement } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";
import styles from "./Code.module.css";

export interface CodeProps extends ComponentPropsWithoutRef<"code"> {
  /** Block kullanım — `<pre><code>` ile çoklu satır kod bloğu */
  block?: boolean;
  as?: "code" | "kbd" | "samp" | "pre";
}

export function Code({ block, as, className, children, ...rest }: CodeProps) {
  const tag = (as ?? (block ? "pre" : "code")) as ElementType;
  return createElement(
    tag,
    { className: clsx(styles.code, block && styles.block, className), ...rest },
    children,
  );
}

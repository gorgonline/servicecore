import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import styles from "./Kbd.module.css";

export interface KbdProps extends ComponentPropsWithoutRef<"kbd"> {}

/**
 * Kbd — klavye tuşu rozeti.
 *
 * Kısayol ipuçları (komut paleti footer'ı, tooltip'ler, yardım metinleri) için
 * tek standart. Tekrarlanan `<kbd>` + inline stil yerine bunu kullan.
 *
 * @example
 * <Kbd>⌘</Kbd><Kbd>K</Kbd>
 */
export function Kbd({ className, ...rest }: KbdProps) {
  return <kbd className={clsx(styles.kbd, className)} {...rest} />;
}

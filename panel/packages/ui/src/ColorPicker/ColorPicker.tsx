import { ColorPicker as AntColorPicker } from "antd";
import clsx from "clsx";
import styles from "./ColorPicker.module.css";
import type { ColorPickerProps } from "./ColorPicker.types";

/** ServiceCore ColorPicker — AntD ColorPicker wrap.
 *
 * Tag/etiket rengi, kategori rengi, dashboard widget renk customization,
 * tema/brand ayarları için. ServiceCore'da accent tek (#0070F3) — kullanım
 * bilinçli olmalı, "her şey renkli" anti-pattern'ine düşmemeli.
 *
 * AntD 5.7 baseline ile birebir uyumlu (showText, size, onChangeComplete,
 * panelRender hepsi 5.7'de mevcut). 5.8+ olan disabledAlpha, 5.20+ olan
 * gradient mode YOK — kullanma.
 *
 * @example Form alanı
 * ```tsx
 * <ColorPicker
 *   defaultValue="#0070F3"
 *   format="hex"
 *   showText
 *   onChangeComplete={(c) => setColor(c.toHexString())}
 * />
 * ```
 *
 * @example Preset gruplarıyla
 * ```tsx
 * <ColorPicker
 *   presets={[
 *     { label: "Marka",   colors: ["#0070F3", "#5856D6", "#FF2D55"] },
 *     { label: "Durum",   colors: ["#16A34A", "#F59E0B", "#EF4444"] },
 *   ]}
 * />
 * ```
 */
export function ColorPicker({ className, rootClassName, ...rest }: ColorPickerProps) {
  return (
    <AntColorPicker
      {...rest}
      className={clsx(styles.colorPicker, className)}
      rootClassName={clsx(styles.popup, rootClassName)}
    />
  );
}

import type { ComponentProps } from "react";
import type { Rate as AntRate } from "antd";

/** Rate karakter sayısı (yıldız sayısı). Default: 5. */
export type RateCount = number;

/** ServiceCore Rate — AntD Rate 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue, count, allowClear, allowHalf, disabled,
 *   character (ReactNode | function — 4.4+), tooltips,
 *   onChange, onHoverChange, onFocus, onBlur, onKeyDown
 *
 * 5.7'de YOK:
 *   keyboard (5.18+) — default'ta klavye ile değişebilir,
 *   prop ile kapatma yok.
 */
export type RateProps = ComponentProps<typeof AntRate>;

import { Slider as AntSlider } from "antd";
import clsx from "clsx";
import styles from "./Slider.module.css";
import type { SliderProps } from "./Slider.types";

/** ServiceCore Slider — AntD Slider wrap.
 *
 * Sürekli değer veya aralık seçimi. Threshold ayarı (CPU/RAM yüzde),
 * opacity, NPS, fiyat aralığı, SLA hedef yüzdesi. Tam değer hassasiyeti
 * gerekiyorsa <code>InputNumber</code> ile birlikte kullan — biri görsel,
 * diğeri kesin.
 *
 * AntD API'sini 1:1 korur (value/defaultValue, min/max/step, range, vertical,
 * marks, dots, included, reverse, tooltip config, onChange, onChangeComplete).
 *
 * @example Temel
 * ```tsx
 * <Slider min={0} max={100} defaultValue={50} />
 * ```
 *
 * @example Range
 * ```tsx
 * <Slider range defaultValue={[20, 80]} />
 * ```
 *
 * @example Tooltip ile yüzde formatter
 * ```tsx
 * <Slider
 *   tooltip={{ formatter: (v) => `${v}%` }}
 *   onChangeComplete={(v) => save(v)}
 * />
 * ```
 */
export function Slider({ className, ...rest }: SliderProps) {
  return <AntSlider {...rest} className={clsx(styles.slider, className)} />;
}

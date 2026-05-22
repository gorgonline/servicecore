import { InputNumber as AntInputNumber } from "antd";
import clsx from "clsx";
import styles from "./InputNumber.module.css";
import type { InputNumberProps } from "./InputNumber.types";

/** ServiceCore InputNumber — AntD InputNumber wrap.
 *
 * Sayısal değer girişi. SLA saat hedefi, port number, retention günleri,
 * threshold/limit, sayım gibi alanlar için. Para birimi, yüzde gibi
 * formatlı girişlerde <code>formatter</code> + <code>parser</code> kullan.
 *
 * AntD API'sini 1:1 korur. Stepper (yukarı/aşağı ok) butonları sağda;
 * <code>controls=false</code> ile gizlenebilir.
 *
 * @example Temel
 * ```tsx
 * <InputNumber min={0} max={100} defaultValue={10} />
 * ```
 *
 * @example Para birimi (formatter + parser)
 * ```tsx
 * <InputNumber
 *   prefix="₺"
 *   precision={2}
 *   formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
 *   parser={v => Number((v ?? "").replace(/,/g, ""))}
 * />
 * ```
 *
 * @example High-precision (string mode)
 * ```tsx
 * <InputNumber stringMode min="0" max="999999999.99" step="0.01" />
 * ```
 */
export function InputNumber({ className, ...rest }: InputNumberProps) {
  return (
    <AntInputNumber
      {...rest}
      className={clsx(styles.inputNumber, className)}
    />
  );
}

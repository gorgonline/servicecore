import type { ComponentProps, ReactNode } from "react";
import type { InputNumber as AntInputNumber } from "antd";

/** Boyut — Input/Select/DatePicker ile aynı. Default: "middle". */
export type InputNumberSize = "small" | "middle" | "large";

/** Validation durumu. Form context'inden de türeyebilir. */
export type InputNumberStatus = "error" | "warning";

/** Handler (up/down arrow) ikonları için custom configuration. */
export interface InputNumberControls {
  /** Yukarı ok için custom node. */
  upIcon?: ReactNode;
  /** Aşağı ok için custom node. */
  downIcon?: ReactNode;
}

/** ServiceCore InputNumber — AntD InputNumber 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue, min, max, step, precision, decimalSeparator,
 *   formatter, parser, placeholder, disabled, readOnly, autoFocus,
 *   size, status, prefix, controls (boolean | object),
 *   keyboard, stringMode, addonBefore, addonAfter (deprecated ama çalışır),
 *   onChange, onPressEnter, onStep
 *
 * 5.7'de YOK:
 *   variant (5.13+), suffix (5.20+), changeOnWheel (5.14+),
 *   changeOnBlur (5.11+), nativeElement (5.17.3+),
 *   focus({ cursor }) (5.22+).
 *
 * NOT 2: addonBefore/addonAfter 5.x'te deprecated, AntD Space.Compact
 * pattern'ine geçilmesi öneriliyor. ServiceCore'da kullanmaktan kaçın.
 */
export type InputNumberProps = ComponentProps<typeof AntInputNumber>;

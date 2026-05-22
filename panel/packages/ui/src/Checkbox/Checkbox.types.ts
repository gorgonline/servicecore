import type { ReactNode } from "react";
import type {
  CheckboxProps as AntCheckboxProps,
  CheckboxOptionType as AntCheckboxOption,
} from "antd";
import type { CheckboxGroupProps as AntCheckboxGroupProps } from "antd/es/checkbox";

/** AntD Checkbox.Group'un value tipi. String, number veya boolean değer. */
export type CheckboxValueType = string | number | boolean;

/** Tek bir checkbox option'ı — Group.options prop'unda kullanılır. */
export interface CheckboxOption {
  /** Görünen etiket. */
  label: ReactNode;
  /** Form value. Eşsiz olmalı (string | number). */
  value: string | number;
  /** Bu seçeneği devre dışı bırak. */
  disabled?: boolean;
  /** HTML title attribute (hover tooltip). */
  title?: string;
}

/** ServiceCore Checkbox — AntD Checkbox 1:1 API.
 *
 * Tek checkbox'ta event-based onChange:
 *   onChange?: (e: CheckboxChangeEvent) => void
 */
export type CheckboxProps = AntCheckboxProps;

/** ServiceCore Checkbox.Group — AntD Checkbox.Group 1:1 API.
 *
 * Group'ta value-array onChange:
 *   onChange?: (checkedValue: CheckboxValueType[]) => void
 */
export type CheckboxGroupProps = AntCheckboxGroupProps;

/** Re-export — Group'a option-object yerine string array da verilebilir. */
export type { AntCheckboxOption };

import { Checkbox as AntCheckbox } from "antd";
import clsx from "clsx";
import styles from "./Checkbox.module.css";
import type { CheckboxProps, CheckboxGroupProps } from "./Checkbox.types";

/** ServiceCore Checkbox — AntD Checkbox wrap.
 *
 * Çok-seçimli form alanları, filter sidebar, bulk-select table satırları,
 * "tümünü seç" master pattern'i için.
 *
 * AntD API'sini 1:1 korur (checked, defaultChecked, disabled, indeterminate,
 * autoFocus, name, value, onChange, onBlur, onFocus).
 *
 * onChange signature:
 *   (e: CheckboxChangeEvent) => void
 *   e.target.checked    → boolean
 *   e.target.value      → checkbox value (opsiyonel)
 *
 * @example Basit
 * ```tsx
 * <Checkbox onChange={e => setOk(e.target.checked)}>
 *   Kullanım koşullarını kabul ediyorum
 * </Checkbox>
 * ```
 *
 * @example Indeterminate (check-all)
 * ```tsx
 * <Checkbox indeterminate={someSelected && !allSelected} checked={allSelected}>
 *   Tümünü seç
 * </Checkbox>
 * ```
 */
function CheckboxRoot({ className, ...rest }: CheckboxProps) {
  return (
    <AntCheckbox {...rest} className={clsx(styles.checkbox, className)} />
  );
}

/** ServiceCore Checkbox.Group — AntD Checkbox.Group wrap.
 *
 * Birden fazla checkbox'ın value array'ini tek state ile yönetir. Filter
 * sidebar, "şu kategorileri seç" tipi alanlar için en pratik API.
 *
 * onChange signature:
 *   (checkedValues: (string | number | boolean)[]) => void
 *
 * @example options ile
 * ```tsx
 * <Checkbox.Group
 *   value={selected}
 *   onChange={setSelected}
 *   options={[
 *     { label: "Network", value: "network" },
 *     { label: "Donanım",  value: "hardware" },
 *     { label: "Yazılım",  value: "software" },
 *   ]}
 * />
 * ```
 *
 * @example children ile (gelişmiş layout için)
 * ```tsx
 * <Checkbox.Group value={selected} onChange={setSelected}>
 *   <Checkbox value="network">Network</Checkbox>
 *   <Checkbox value="hardware">Donanım</Checkbox>
 * </Checkbox.Group>
 * ```
 */
function CheckboxGroup({ className, ...rest }: CheckboxGroupProps) {
  return (
    <AntCheckbox.Group
      {...rest}
      className={clsx(styles.group, className)}
    />
  );
}

CheckboxRoot.Group = CheckboxGroup;

export const Checkbox = CheckboxRoot;

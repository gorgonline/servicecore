import { Radio as AntRadio } from "antd";
import clsx from "clsx";
import styles from "./Radio.module.css";
import type {
  RadioProps,
  RadioGroupProps,
  RadioButtonProps,
} from "./Radio.types";

/** ServiceCore Radio — AntD Radio wrap.
 *
 * Tek seçim. Bilet önceliği (P1/P2/P3/P4), view tipi (Liste/Kanban),
 * onay-red, açık-kapalı tercih. Çoklu seçim için Checkbox.
 *
 * AntD API'sini 1:1 korur. Tek başına nadir kullanılır — genelde
 * Radio.Group içinde.
 *
 * @example Tek radio
 * ```tsx
 * <Radio value="email">E-posta</Radio>
 * ```
 */
function RadioRoot({ className, ...rest }: RadioProps) {
  return <AntRadio {...rest} className={clsx(styles.radio, className)} />;
}

/** ServiceCore Radio.Group — birden fazla radio'yu tek state ile yönet.
 *
 * Modern API <code>options</code> prop'u tercih edilir. Children pattern
 * (<code>&lt;Radio.Group&gt;&lt;Radio /&gt;</code>) hâlâ destekli.
 *
 * @example options ile
 * ```tsx
 * <Radio.Group
 *   value={priority}
 *   onChange={(e) => setPriority(e.target.value)}
 *   options={[
 *     { label: "P1 — Kritik", value: "p1" },
 *     { label: "P2 — Yüksek", value: "p2" },
 *   ]}
 * />
 * ```
 *
 * @example Button mode (segmented)
 * ```tsx
 * <Radio.Group
 *   optionType="button"
 *   buttonStyle="solid"
 *   options={[
 *     { label: "Liste",  value: "list" },
 *     { label: "Kanban", value: "kanban" },
 *   ]}
 * />
 * ```
 */
function RadioGroup({ className, ...rest }: RadioGroupProps) {
  return (
    <AntRadio.Group {...rest} className={clsx(styles.group, className)} />
  );
}

/** Radio.Button — Group içinde button-style radio (segmented).
 *  Children pattern: <code>&lt;Radio.Group optionType="button"&gt;</code>
 *  yerine açık tercih. */
function RadioButton({ className, ...rest }: RadioButtonProps) {
  return (
    <AntRadio.Button
      {...rest}
      className={clsx(styles.button, className)}
    />
  );
}

RadioRoot.Group = RadioGroup;
RadioRoot.Button = RadioButton;

export const Radio = RadioRoot;

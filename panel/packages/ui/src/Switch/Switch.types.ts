import type { ComponentProps } from "react";
import type { Switch as AntSwitch } from "antd";

/** Boyut — default veya kompakt. */
export type SwitchSize = "default" | "small";

/** ServiceCore Switch — AntD Switch 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   checked, defaultChecked, disabled, loading,
 *   size, checkedChildren, unCheckedChildren,
 *   autoFocus, id, onChange, onClick
 *
 * 5.7'de YOK:
 *   value (5.12+) / defaultValue (5.12+) — `checked`/`defaultChecked` kullan,
 *   classNames/styles semantic DOM (6.0+).
 */
export type SwitchProps = ComponentProps<typeof AntSwitch>;

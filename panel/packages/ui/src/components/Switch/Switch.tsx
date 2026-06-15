import { Switch as AntSwitch } from "antd";
import clsx from "clsx";
import styles from "./Switch.module.css";
import type { SwitchProps } from "./Switch.types";

/** ServiceCore Switch — AntD Switch wrap.
 *
 * Binary on/off ayar. <strong>Anında uygulanır</strong> — settings ekranlarında,
 * feature flag, "aktif mi?" durumu için. Form submit'e bağlı değer için
 * Checkbox kullan; 2+ seçenek varsa Radio.
 *
 * AntD API'sini 1:1 korur.
 *
 * @example Basit
 * ```tsx
 * <Switch defaultChecked onChange={(c) => api.update({ active: c })} />
 * ```
 *
 * @example Loading + checkedChildren
 * ```tsx
 * <Switch
 *   loading={pending}
 *   checked={active}
 *   onChange={save}
 *   checkedChildren="Açık"
 *   unCheckedChildren="Kapalı"
 * />
 * ```
 *
 * Form.Item ile:
 * ```tsx
 * <Form.Item name="notify" valuePropName="checked">
 *   <Switch />
 * </Form.Item>
 * ```
 */
export function Switch({ className, ...rest }: SwitchProps) {
  return (
    <AntSwitch {...rest} className={clsx(styles.switch, className)} />
  );
}

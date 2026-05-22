import type { ComponentProps, ReactNode } from "react";
import type { Radio as AntRadio } from "antd";

/** Boyut — Input/Select ile uyumlu (Group seviyesinde). */
export type RadioSize = "small" | "middle" | "large";

/** Group'taki butonların görsel tipi. Default: "default". */
export type RadioOptionType = "default" | "button";

/** Button mode rengi. "outline" = sadece kenarda accent. "solid" = doldurulmuş. */
export type RadioButtonStyle = "outline" | "solid";

/** Radio.Group options array'inin item tipi. */
export interface RadioOption {
  /** Görünen etiket. */
  label: ReactNode;
  /** Form value (string | number | boolean). */
  value: string | number | boolean;
  /** Bu option'u devre dışı bırak. */
  disabled?: boolean;
  /** HTML title (hover tooltip). */
  title?: string;
  /** Inline style. */
  style?: React.CSSProperties;
}

/** ServiceCore Radio — AntD Radio 1:1 props. */
export type RadioProps = ComponentProps<typeof AntRadio>;

/** ServiceCore Radio.Group — AntD Radio.Group 1:1 props.
 *
 * NOT — AntD 5.7'de var:
 *   value, defaultValue, options, name, disabled, buttonStyle, optionType,
 *   size, onChange, vertical (boolean)
 *
 * 5.7'de YOK:
 *   block (5.21+), classNames/styles (6.0+).
 *
 * NOT 2: `vertical` AntD 5.7 runtime'da çalışıyor ama public type'ından
 * çıkartılmıştır. Intersection ile geri ekliyoruz.
 */
export type RadioGroupProps = ComponentProps<typeof AntRadio.Group> & {
  /** Radio'ları alt alta diz (uzun label'lar için). */
  vertical?: boolean;
};

/** Radio.Button — Group içinde button-style radio. */
export type RadioButtonProps = ComponentProps<typeof AntRadio.Button>;

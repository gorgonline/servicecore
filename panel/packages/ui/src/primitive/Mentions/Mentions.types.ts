import type { ComponentProps, ReactNode } from "react";
import type { Mentions as AntMentions } from "antd";

/** Boyut. Default: "middle". (AntD doc'unda default "small" yazıyor ama
 *  ServiceCore'da Input/Select ile uyumlu kalsın diye middle tercih edilir.) */
export type MentionsSize = "small" | "middle" | "large";

/** Validation durumu. Form context'inden de türeyebilir. */
export type MentionsStatus = "error" | "warning";

/** Popup yerleşimi. */
export type MentionsPlacement = "top" | "bottom";

/** Mentions options item — autocomplete listesindeki bir kayıt. */
export interface MentionsOption {
  /** Form'da saklanacak benzersiz değer (örn. userId). */
  value: string;
  /** Görünen etiket. Custom render için ReactNode (avatar + name + role). */
  label?: ReactNode;
  /** Tıklamayı engelle. */
  disabled?: boolean;
  /** Item için ek class. */
  className?: string;
  /** Item için inline style. */
  style?: React.CSSProperties;
}

/** ServiceCore Mentions — AntD Mentions 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue, prefix (string | string[]), split, size, placement,
 *   disabled, readOnly, autoSize (boolean | {minRows, maxRows}), status (4.19+),
 *   options (5.1+), notFoundContent, filterOption, validateSearch,
 *   getPopupContainer, autoFocus, popupClassName,
 *   onChange, onSelect, onSearch, onFocus, onBlur, onPressEnter, onResize
 *
 * 5.7'de YOK:
 *   allowClear (5.13+), variant (5.13+), onClear (5.20+),
 *   onPopupScroll (5.23+), classNames/styles semantic DOM (6.0+).
 */
/** NOT: `size` ve `status` AntD 5.7'nin public `MentionProps` tipinde yok —
 *  runtime'da ConfigProvider/Form context'inden veya doğrudan prop olarak
 *  alınır ve çalışır. Public API'mizde explicit ettik. */
export type MentionsProps = ComponentProps<typeof AntMentions> & {
  /** Popup panel için root class. CSS module scope'u için. */
  popupClassName?: string;
  /** Boyut — Input/Select ile uyumlu. */
  size?: MentionsSize;
  /** Validation durumu — Form ile birlikte de türeyebilir. */
  status?: MentionsStatus;
};

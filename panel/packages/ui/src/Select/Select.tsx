import { Select as AntSelect } from "antd";
import type { SelectProps as AntSelectProps, RefSelectProps } from "antd";
import { ChevronDown, Close, Checkmark } from "@carbon/icons-react";
import { forwardRef } from "react";
import type { ForwardedRef, ReactElement } from "react";
import clsx from "clsx";
import styles from "./Select.module.css";

export type SelectSize = "small" | "middle" | "large";
export type SelectStatus = "" | "error" | "warning";
export type SelectMode = "multiple" | "tags";

// AntD'nin generic'ini bizim wrap'ta da koru
export interface SelectProps<
  ValueType = unknown,
  OptionType extends { label?: unknown; value?: unknown } = {
    label?: unknown;
    value?: unknown;
  },
> extends Omit<AntSelectProps<ValueType, OptionType>, "size" | "status" | "popupClassName" | "dropdownClassName"> {
  /** Boyut. AntD ile aynı. Default: "middle" */
  size?: SelectSize;
  /** Validation status */
  status?: SelectStatus;
}

const SIZE_CLASS: Partial<Record<SelectSize, string>> = {
  small: styles.sizeSmall,
  middle: styles.sizeMiddle,
  large: styles.sizeLarge,
};

const STATUS_CLASS: Partial<Record<SelectStatus, string>> = {
  error: styles.statusError,
  warning: styles.statusWarning,
};

/** ServiceCore Select — AntD Select wrap.
 *
 * AntD API'sini 1:1 korur (mode, options, value, defaultValue, onChange, showSearch,
 * placeholder, disabled, allowClear, status, size, maxTagCount, vb.).
 *
 * Sub-component'ler: Select.Option, Select.OptGroup (eski yöntem). Modern: options prop.
 *
 * NOT: `dropdownClassName` (5.7'de var, sonra deprecate) — bizim CSS Module ile dropdown
 * stillerini popupClassName olarak set ediyoruz.
 */
function SelectImpl<ValueType, OptionType extends { label?: unknown; value?: unknown }>(
  {
    size = "middle",
    status,
    className,
    suffixIcon,
    removeIcon,
    menuItemSelectedIcon,
    ...rest
  }: SelectProps<ValueType, OptionType>,
  ref: ForwardedRef<RefSelectProps>,
) {
  return (
    <AntSelect
      ref={ref}
      {...rest}
      size={size}
      status={status || undefined}
      popupClassName={styles.dropdown}
      // Default Carbon ikonları; custom verilirse override
      suffixIcon={suffixIcon ?? <ChevronDown />}
      removeIcon={removeIcon ?? <Close />}
      menuItemSelectedIcon={menuItemSelectedIcon ?? <Checkmark />}
      className={clsx(
        styles.select,
        SIZE_CLASS[size],
        status && STATUS_CLASS[status],
        className,
      )}
    />
  );
}

const SelectForwarded = forwardRef(SelectImpl) as <
  ValueType = unknown,
  OptionType extends { label?: unknown; value?: unknown } = {
    label?: unknown;
    value?: unknown;
  },
>(
  props: SelectProps<ValueType, OptionType> & { ref?: ForwardedRef<RefSelectProps> },
) => ReactElement;

/* ── Compose with sub-components ──────────────────────────── */

type SelectComponent = typeof SelectForwarded & {
  Option: typeof AntSelect.Option;
  OptGroup: typeof AntSelect.OptGroup;
};

export const Select = SelectForwarded as unknown as SelectComponent;
(Select as unknown as { Option: typeof AntSelect.Option }).Option = AntSelect.Option;
(Select as unknown as { OptGroup: typeof AntSelect.OptGroup }).OptGroup = AntSelect.OptGroup;

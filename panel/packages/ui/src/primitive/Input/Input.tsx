import type { ReactNode } from "react";
import { Input as AntInput } from "antd";
import type { InputProps as AntInputProps, InputRef } from "antd";
import type { TextAreaProps as AntTextAreaProps } from "antd/es/input/TextArea";
import type { SearchProps as AntSearchProps } from "antd/es/input/Search";
import type { PasswordProps as AntPasswordProps } from "antd/es/input/Password";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { Close, View, ViewOff } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Input.module.css";

export type InputSize = "small" | "middle" | "large";
export type InputStatus = "" | "error" | "warning";

/** allowClear prop: boolean | { clearIcon?: ReactNode } */
type AllowClear = boolean | { clearIcon?: ReactNode } | undefined;

/** AntD'nin default clear ikonu CloseCircleFilled — onu Carbon <Close /> ile değiştir.
 * - true            → { clearIcon: <Close /> }
 * - { clearIcon }   → consumer'ın ikonu korunur
 * - { } (boş obje)  → { ...obje, clearIcon: <Close /> }
 * - false/undefined → olduğu gibi (gizleme/varsayılana saygı)
 */
function withClearIcon(allowClear: AllowClear): AllowClear {
  if (allowClear === true) {
    return { clearIcon: <Close /> };
  }
  if (typeof allowClear === "object" && allowClear !== null && !allowClear.clearIcon) {
    return { ...allowClear, clearIcon: <Close /> };
  }
  return allowClear;
}

export interface InputProps extends Omit<AntInputProps, "size" | "status"> {
  /** Boyut. AntD ile aynı. Default: "middle" */
  size?: InputSize;
  /** Validation durumu. Form ile birlikte kullanılır. */
  status?: InputStatus;
}

const SIZE_CLASS: Partial<Record<InputSize, string>> = {
  small: styles.sizeSmall,
  middle: styles.sizeMiddle,
  large: styles.sizeLarge,
};

const STATUS_CLASS: Partial<Record<InputStatus, string>> = {
  error: styles.statusError,
  warning: styles.statusWarning,
};

/** ServiceCore Input — AntD Input wrap.
 *
 * AntD API'sini 1:1 korur (size, prefix, suffix, allowClear, showCount, status, disabled, maxLength, vb.).
 * Tek katkı: tutarlı stil (radius, font, border, focus ring).
 *
 * Sub-component'ler:
 *   - `Input.TextArea` — çok satırlı
 *   - `Input.Search` — arama bar (submit button)
 *   - `Input.Password` — visibility toggle
 *
 * NOT: `addonBefore` / `addonAfter` AntD'de deprecated — `Space.Compact` kullan.
 */
function InputImpl(
  { size = "middle", status, className, allowClear, ...rest }: InputProps,
  ref: ForwardedRef<InputRef>,
) {
  return (
    <AntInput
      ref={ref}
      {...rest}
      allowClear={withClearIcon(allowClear)}
      size={size}
      status={status || undefined}
      className={clsx(
        styles.input,
        SIZE_CLASS[size],
        status && STATUS_CLASS[status],
        className,
      )}
    />
  );
}

const InputForwarded = forwardRef(InputImpl);
InputForwarded.displayName = "Input";

/* ── Sub-components ───────────────────────────────────────── */

export interface TextAreaProps extends Omit<AntTextAreaProps, "size" | "status"> {
  status?: InputStatus;
}

function TextAreaImpl(
  { status, className, allowClear, ...rest }: TextAreaProps,
  ref: ForwardedRef<InputRef>,
) {
  // AntD'nin TextArea ref'i HTMLTextAreaElement uzantısı, InputRef ile uyumlu
  return (
    <AntInput.TextArea
      ref={ref as never}
      {...rest}
      allowClear={withClearIcon(allowClear)}
      status={status || undefined}
      className={clsx(
        styles.textArea,
        status && STATUS_CLASS[status],
        className,
      )}
    />
  );
}

const TextArea = forwardRef(TextAreaImpl);
TextArea.displayName = "Input.TextArea";

export interface SearchInputProps extends Omit<AntSearchProps, "size" | "status"> {
  size?: InputSize;
  status?: InputStatus;
}

function SearchImpl(
  { size = "middle", status, className, allowClear, ...rest }: SearchInputProps,
  ref: ForwardedRef<InputRef>,
) {
  return (
    <AntInput.Search
      ref={ref}
      {...rest}
      allowClear={withClearIcon(allowClear)}
      size={size}
      status={status || undefined}
      className={clsx(
        styles.input,
        styles.search,
        SIZE_CLASS[size],
        status && STATUS_CLASS[status],
        className,
      )}
    />
  );
}

const Search = forwardRef(SearchImpl);
Search.displayName = "Input.Search";

export interface PasswordInputProps extends Omit<AntPasswordProps, "size" | "status"> {
  size?: InputSize;
  status?: InputStatus;
}

function PasswordImpl(
  {
    size = "middle",
    status,
    className,
    allowClear,
    // Default AntD: EyeOutlined / EyeInvisibleOutlined → Carbon View / ViewOff.
    // Consumer iconRender verirse onu kullan.
    iconRender = (visible) => (visible ? <View /> : <ViewOff />),
    ...rest
  }: PasswordInputProps,
  ref: ForwardedRef<InputRef>,
) {
  return (
    <AntInput.Password
      ref={ref}
      {...rest}
      allowClear={withClearIcon(allowClear)}
      iconRender={iconRender}
      size={size}
      status={status || undefined}
      className={clsx(
        styles.input,
        SIZE_CLASS[size],
        status && STATUS_CLASS[status],
        className,
      )}
    />
  );
}

const Password = forwardRef(PasswordImpl);
Password.displayName = "Input.Password";

/* ── Compose with sub-components ──────────────────────────── */

type InputComponent = typeof InputForwarded & {
  TextArea: typeof TextArea;
  Search: typeof Search;
  Password: typeof Password;
};

export const Input = InputForwarded as InputComponent;
Input.TextArea = TextArea;
Input.Search = Search;
Input.Password = Password;

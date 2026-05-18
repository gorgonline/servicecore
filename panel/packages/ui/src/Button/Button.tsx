import type { ReactNode } from "react";
import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import clsx from "clsx";
import styles from "./Button.module.css";

/** AntD'nin 5 button tipi. Hiyerarşi: primary > default > dashed > text > link */
export type ButtonType = "default" | "primary" | "dashed" | "text" | "link";

export type ButtonSize = "small" | "middle" | "large";

export interface ButtonProps
  extends Omit<AntButtonProps, "type" | "size" | "icon"> {
  /** Görsel tipi. AntD ile aynı. Default: "default" */
  type?: ButtonType;
  /** Yıkıcı eylem (Sil, İptal et). Herhangi bir type ile kombine olur. */
  danger?: boolean;
  /** Boyut. AntD ile aynı isimler. Default: "middle" */
  size?: ButtonSize;
  /** Metnin SOLUNDA ikon — Carbon icon component */
  leadingIcon?: ReactNode;
  /** Metnin SAĞINDA ikon — Carbon icon component */
  trailingIcon?: ReactNode;
}

const SIZE_CLASS: Partial<Record<ButtonSize, string>> = {
  small:  styles.sizeSmall,
  middle: styles.sizeMiddle,
  large:  styles.sizeLarge,
};

const TYPE_CLASS: Partial<Record<ButtonType, string>> = {
  default: styles.typeDefault,
  primary: styles.typePrimary,
  dashed:  styles.typeDashed,
  text:    styles.typeText,
  link:    styles.typeLink,
};

/** ServiceCore Button — AntD Button wrap.
 *
 * API tamamen AntD ile aynı. Tek farklar:
 *   - leadingIcon / trailingIcon slot'ları (AntD'nin tek `icon` prop'u yerine)
 *   - Tutarlı stil (gölge yok, theme token'lar uygulanır)
 *
 * Backend kendi AntD kodunda da bu type/danger/size isimlerini birebir kullanır.
 */
export function Button({
  type = "default",
  danger = false,
  size = "middle",
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const hasText = children !== undefined && children !== null && children !== false;
  const iconOnly = !hasText && Boolean(leadingIcon || trailingIcon);

  return (
    <AntButton
      {...rest}
      type={type}
      danger={danger}
      size={size}
      className={clsx(
        styles.button,
        TYPE_CLASS[type],
        SIZE_CLASS[size],
        danger && styles.danger,
        iconOnly && styles.iconOnly,
        className,
      )}
    >
      {leadingIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {hasText ? children : null}
      {trailingIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </AntButton>
  );
}

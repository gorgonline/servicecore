import type { ReactNode } from "react";
import { Tag as AntTag } from "antd";
import type { TagProps as AntTagProps } from "antd";
import { Close } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Tag.module.css";

/** ServiceCore Tag tonları — anlam taşır, AntD'nin 13 renkli paleti yerine. */
export type TagTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "accent";

export type TagSize = "default" | "small";

export interface TagProps
  extends Omit<AntTagProps, "color" | "bordered" | "icon"> {
  /** Anlam tonu. Default: "neutral" */
  tone?: TagTone;
  /** Boyut. Default: "default" */
  size?: TagSize;
  /** Doluluğunu artır (vurgulu high-attention için) */
  solid?: boolean;
  /** Border'ı kaldır (daha sakin görünüm) */
  subtle?: boolean;
  /** Önünde renkli yuvarlak nokta gösterir (status indicator) */
  dot?: boolean;
  /** Metnin solunda Carbon icon */
  leadingIcon?: ReactNode;
}

const TONE_CLASS: Partial<Record<TagTone, string>> = {
  neutral: styles.toneNeutral,
  info:    styles.toneInfo,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger:  styles.toneDanger,
  accent:  styles.toneAccent,
};

const SIZE_CLASS: Partial<Record<TagSize, string>> = {
  default: undefined,
  small:   styles.sizeSmall,
};

/** ServiceCore Tag — AntD Tag wrap.
 *
 * Status göstergesi olarak: Açık, Beklemede, Çözüldü, SLA Aşıldı, vb.
 * AntD'nin 13 renkli paleti yerine 6 anlam tonu: neutral/info/success/warning/danger/accent.
 *
 * Backend AntD'nin `<Tag color="success">` yazarken bunun yerine `<Tag tone="success">` yazar —
 * anlam aynı, isim daha açık.
 */
export function Tag({
  tone = "neutral",
  size = "default",
  solid = false,
  subtle = false,
  dot = false,
  leadingIcon,
  closable,
  closeIcon,
  className,
  children,
  ...rest
}: TagProps) {
  // closable iken closeIcon verilmemişse Carbon Close default
  const resolvedCloseIcon = closable && closeIcon === undefined ? <Close /> : closeIcon;
  return (
    <AntTag
      {...rest}
      closable={closable}
      closeIcon={resolvedCloseIcon}
      bordered={!subtle}
      className={clsx(
        styles.tag,
        TONE_CLASS[tone],
        SIZE_CLASS[size],
        solid && styles.solid,
        subtle && styles.subtle,
        dot && styles.withDot,
        className,
      )}
    >
      {leadingIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {children}
    </AntTag>
  );
}

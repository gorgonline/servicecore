import type { ReactNode } from "react";
import { Avatar as AntAvatar } from "antd";
import type { AvatarProps as AntAvatarProps } from "antd/es/avatar";
import type { GroupProps as AntGroupProps } from "antd/es/avatar/group";
import clsx from "clsx";
import styles from "./Avatar.module.css";

export type AvatarShape = "circle" | "square";
export type AvatarSize = "small" | "default" | "large" | number;
export type AvatarTone = "accent" | "neutral" | "success" | "warning" | "danger";

export interface AvatarProps extends Omit<AntAvatarProps, "shape" | "size"> {
  /** Şekil. Default: "circle" (kullanıcı). "square" entity/object için. */
  shape?: AvatarShape;
  /** Boyut. AntD ile aynı (NOT: AntD "medium" değil "default" diyor). Default: "default" (32px) */
  size?: AvatarSize;
  /** Initials/icon arkaplan tonu. Default: "accent" */
  tone?: AvatarTone;
}

const TONE_CLASS: Partial<Record<AvatarTone, string>> = {
  accent: styles.toneAccent,
  neutral: styles.toneNeutral,
  success: styles.toneSuccess,
  warning: styles.toneWarning,
  danger: styles.toneDanger,
};

/** ServiceCore Avatar — AntD Avatar wrap.
 *
 * Fallback hiyerarşisi: src (image) → icon → children (initials)
 *
 * Tonlar bizim eklemiz — accent (default) / neutral / success / warning / danger.
 * src verildiğinde tone görünmez (image cover eder).
 *
 * Sub-component: `Avatar.Group` — birden çok avatar yan yana + overflow.
 */
function AvatarImpl({
  shape = "circle",
  size = "default",
  tone = "accent",
  className,
  children,
  ...rest
}: AvatarProps) {
  return (
    <AntAvatar
      {...rest}
      shape={shape}
      size={size}
      className={clsx(styles.avatar, TONE_CLASS[tone], className)}
    >
      {children}
    </AntAvatar>
  );
}

/* ── Avatar.Group ────────────────────────────────────────── */

export interface AvatarGroupProps extends AntGroupProps {
  /** Tone (group child'ları için default tone). Şu an sadece styling override için. */
  children?: ReactNode;
}

function AvatarGroupImpl({ className, children, ...rest }: AvatarGroupProps) {
  return (
    <AntAvatar.Group {...rest} className={clsx(styles.group, className)}>
      {children}
    </AntAvatar.Group>
  );
}

/* ── Compose ─────────────────────────────────────────────── */

type AvatarComponent = typeof AvatarImpl & {
  Group: typeof AvatarGroupImpl;
};

export const Avatar = AvatarImpl as AvatarComponent;
Avatar.Group = AvatarGroupImpl;

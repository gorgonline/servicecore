import type { ReactNode } from "react";
import { Badge as AntBadge } from "antd";
import type { BadgeProps as AntBadgeProps } from "antd";
import type { RibbonProps as AntRibbonProps } from "antd/es/badge/Ribbon";
import clsx from "clsx";
import styles from "./Badge.module.css";

export type BadgeStatus = "success" | "processing" | "default" | "error" | "warning";

export interface BadgeProps extends AntBadgeProps {
  /** Sayı (count). overflowCount aşıldığında "99+" gösterir */
  count?: ReactNode;
  /** Sayı yerine sade nokta */
  dot?: boolean;
  /** Semantic status — standalone (children yoksa metin yanı sıra) */
  status?: BadgeStatus;
  /** Sayı badge boyutu. Default: "default" */
  size?: "default" | "small";
}

/** ServiceCore Badge — AntD Badge wrap.
 *
 * Kullanım:
 *   - Sayı (notification): `<Badge count={5}><Bell /></Badge>`
 *   - Sade nokta: `<Badge dot><Avatar/></Badge>`
 *   - Standalone status: `<Badge status="success" text="Online" />`
 *   - Ribbon (Card üstü): `<Badge.Ribbon text="Yeni"><Card .../></Badge.Ribbon>`
 *
 * Tag ile karıştırma — Tag = etiket/kategori, Badge = sayı/nokta göstergesi.
 */
function BadgeImpl({ className, ...rest }: BadgeProps) {
  return <AntBadge {...rest} className={clsx(styles.badge, className)} />;
}

/* ── Ribbon ─────────────────────────────────────────────── */

export interface BadgeRibbonProps extends AntRibbonProps {
  children?: ReactNode;
}

function RibbonImpl({ className, children, ...rest }: BadgeRibbonProps) {
  return (
    <AntBadge.Ribbon {...rest} className={clsx(styles.ribbon, className)}>
      {children}
    </AntBadge.Ribbon>
  );
}

/* ── Compose ─────────────────────────────────────────────── */

type BadgeComponent = typeof BadgeImpl & {
  Ribbon: typeof RibbonImpl;
};

export const Badge = BadgeImpl as BadgeComponent;
Badge.Ribbon = RibbonImpl;

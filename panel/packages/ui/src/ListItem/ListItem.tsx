import type { ReactNode } from "react";
import clsx from "clsx";
import { Text } from "../Text";
import styles from "./ListItem.module.css";

export interface ListItemProps {
  /** Sol ikon (Carbon vb.). */
  icon?: ReactNode;
  /** Ana metin. */
  title: ReactNode;
  /** İkincil açıklama (alt satır). */
  description?: ReactNode;
  /** Sağda hizalı küçük meta (zaman, durum vb.). */
  meta?: ReactNode;
  /** Verilirse satır tıklanabilir buton olur (hover + cursor). */
  onClick?: () => void;
  className?: string;
}

/**
 * ListItem — ikon + başlık + açıklama (+ meta) satırı.
 *
 * NotificationCenter, UserMenu gibi listelerin ortak satır deseni (DRY).
 * onClick verilirse tıklanabilir buton, yoksa statik satır olur.
 */
export function ListItem({
  icon,
  title,
  description,
  meta,
  onClick,
  className,
}: ListItemProps) {
  const inner = (
    <>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <span className={styles.body}>
        <Text size="sm" weight="medium">
          {title}
        </Text>
        {description ? (
          <Text size="xs" color="tertiary">
            {description}
          </Text>
        ) : null}
      </span>
      {meta ? (
        <span className={styles.meta}>
          <Text size="xs" color="tertiary">
            {meta}
          </Text>
        </span>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={clsx(styles.item, styles.clickable, className)}
        onClick={onClick}
      >
        {inner}
      </button>
    );
  }
  return <div className={clsx(styles.item, className)}>{inner}</div>;
}

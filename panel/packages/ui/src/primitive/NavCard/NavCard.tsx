"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import { Text } from "../../typography/Text";
import styles from "./NavCard.module.css";

export interface NavCardProps {
  /** Sol ikon (Carbon vb.). */
  icon?: ReactNode;
  /** Başlık (accent renkli). */
  title: ReactNode;
  /** İkincil açıklama (alt satır). */
  description?: ReactNode;
  /** Tıklanınca — buton modu. */
  onClick?: () => void;
  /** Verilirse anchor (link) olur. Next.js'te client routing için onClick+router tercih et. */
  href?: string;
  className?: string;
}

/**
 * NavCard — ikon + başlık + açıklama taşıyan tıklanabilir tile.
 *
 * Ayarlar gibi grid'lerde modül/sayfa kartı; "ikon + başlık + açıklama, tıklanabilir"
 * tekrar eden deseni (DRY). href verilirse <a>, onClick verilirse <button>, hiçbiri
 * yoksa statik <div>. Hover'da accent kenarlık + gölge.
 *
 * @example
 * <NavCard icon={<Settings size={24} />} title="Genel Ayarlar"
 *   description="Genel Uygulama Ayarları" onClick={() => router.push("/ayarlar/genel")} />
 */
export function NavCard({ icon, title, description, onClick, href, className }: NavCardProps) {
  const inner = (
    <>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        {description ? (
          <Text size="sm" color="tertiary">
            {description}
          </Text>
        ) : null}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={clsx(styles.card, className)}>
        {inner}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" className={clsx(styles.card, className)} onClick={onClick}>
        {inner}
      </button>
    );
  }
  return <div className={clsx(styles.card, styles.static, className)}>{inner}</div>;
}

import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  /** Üstte ince breadcrumb (opsiyonel). */
  breadcrumb?: ReactNode;
  /** Sol ana içerik — başlık veya seçici kümesi. */
  title?: ReactNode;
  /** Sağda aksiyonlar (butonlar). */
  extra?: ReactNode;
  /** Header altında ek içerik (opsiyonel). */
  children?: ReactNode;
  className?: string;
}

/**
 * PageHeader — sayfa üst çubuğu (breadcrumb + başlık/seçici + aksiyonlar).
 *
 * Her iç sayfanın ortak başlık deseni: solda title (ya da bir seçici kümesi),
 * sağda extra (aksiyon butonları), üstte opsiyonel breadcrumb. Sadece düzen —
 * içeriği consumer verir. AntD bağımlılığı yok.
 */
export function PageHeader({
  breadcrumb,
  title,
  extra,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={clsx(styles.header, className)}>
      {breadcrumb ? <div className={styles.breadcrumb}>{breadcrumb}</div> : null}
      <div className={styles.row}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {extra ? <div className={styles.extra}>{extra}</div> : null}
      </div>
      {children}
    </div>
  );
}

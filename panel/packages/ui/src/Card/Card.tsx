import type { ReactNode } from "react";
import { Card as AntCard } from "antd";
import type { CardProps as AntCardProps } from "antd";
import clsx from "clsx";
import styles from "./Card.module.css";

export type CardSize = "default" | "small";

export interface CardProps extends Omit<AntCardProps, "size" | "bordered" | "title"> {
  /** Başlık. Carbon icon ile prefix yapmak için titleIcon kullan. */
  title?: ReactNode;
  /** Başlığın solunda küçük Carbon icon (opsiyonel) */
  titleIcon?: ReactNode;
  /** Boyut. AntD ile aynı isim. Default: "default" */
  size?: CardSize;
  /** Border. Default: true. false → borderless (form section gibi) */
  bordered?: boolean;
  /** Subtle background (gri ton, içerik daha az vurgulu) */
  subtle?: boolean;
  /** Tüm kartı tıklanabilir yapar (asset row, navigation card) */
  clickable?: boolean;
}

const SIZE_CLASS: Partial<Record<CardSize, string>> = {
  default: undefined,
  small: styles.sizeSmall,
};

/** ServiceCore Card — AntD Card wrap.
 *
 * AntD API'sini 1:1 korur (title, extra, actions, loading, hoverable, size, type="inner").
 * Tek ek: `titleIcon` (Carbon icon başlık öncesinde), `subtle` (gri arka plan), `clickable` (hover state).
 *
 * Subcomponent'ler AntD'den birebir expose edilir:
 *   - `Card.Meta` — avatar/logo + title + description layout helper
 *   - `Card.Grid` — mosaic grid hücresi (her hücre tıklanabilir bir alt kart)
 */
function CardImpl({
  title,
  titleIcon,
  size = "default",
  bordered = true,
  subtle = false,
  clickable = false,
  className,
  children,
  ...rest
}: CardProps) {
  const renderedTitle = titleIcon ? (
    <span className={styles.titleRow}>
      <span className={styles.titleIcon} aria-hidden="true">
        {titleIcon}
      </span>
      <span>{title}</span>
    </span>
  ) : (
    title
  );

  return (
    <AntCard
      {...rest}
      title={renderedTitle}
      size={size}
      bordered={bordered}
      className={clsx(
        styles.card,
        SIZE_CLASS[size],
        bordered ? styles.bordered : styles.borderless,
        subtle && styles.subtle,
        clickable && styles.clickable,
        className,
      )}
    >
      {children}
    </AntCard>
  );
}

export const Card = Object.assign(CardImpl, {
  Meta: AntCard.Meta,
  Grid: AntCard.Grid,
});

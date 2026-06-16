import type { ReactNode } from "react";
import { Close } from "@carbon/icons-react";
import clsx from "clsx";
import { Text } from "../../typography/Text";
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
  /**
   * Verilirse satır kapatılabilir olur: sağ-üst köşede × belirir (hover/focus).
   * meta varsa hover'da meta yerini köşedeki ×'e bırakır (kart kapatma deseni).
   * Yıkıcı değil — "listeden çıkar" gibi geri-alınabilir aksiyon için (nötr ×).
   */
  onRemove?: () => void;
  /** Kapatma butonunun erişilebilir adı (ör. "X panosunu listeden çıkar"). */
  removeLabel?: string;
  className?: string;
}

/**
 * ListItem — ikon + başlık + açıklama (+ meta) satırı.
 *
 * NotificationCenter, UserMenu, RecentPanels gibi listelerin ortak satır deseni (DRY).
 * onClick verilirse tıklanabilir buton, yoksa statik satır olur. onRemove verilirse
 * sağ-üst köşede kapatma (×) butonlu "kapatılabilir" varyant olur.
 */
export function ListItem({
  icon,
  title,
  description,
  meta,
  onClick,
  onRemove,
  removeLabel = "Kaldır",
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

  const main = onClick ? (
    <button
      type="button"
      className={clsx(styles.item, styles.clickable, !onRemove && className)}
      onClick={onClick}
    >
      {inner}
    </button>
  ) : (
    <div className={clsx(styles.item, !onRemove && className)}>{inner}</div>
  );

  // Düz satır (kapatılamaz) — eski davranış.
  if (!onRemove) return main;

  // Kapatılabilir varyant — wrapper + main + sağ-üst köşede × (native buton, sibling:
  // tıklanabilir satırın içine ikinci <button> koymak geçersiz HTML olurdu).
  return (
    <div className={clsx(styles.dismissible, className)}>
      {main}
      <button
        type="button"
        className={styles.removeBtn}
        onClick={onRemove}
        aria-label={removeLabel}
      >
        <Close size={16} />
      </button>
    </div>
  );
}

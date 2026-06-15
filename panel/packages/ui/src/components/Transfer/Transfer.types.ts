import type { ComponentProps } from "react";
import type { Transfer as AntTransfer } from "antd";

/** Transfer item — dataSource'a verilen kayıt.
 *
 * NOT: AntD title'ı `string` ister (filter/search için). Rich render için
 * `render` prop'una ReactNode dönen fonksiyon ver. */
export interface TransferItem {
  /** Benzersiz ID. dataSource ve targetKeys'te kullanılır. */
  key: string;
  /** Görünen ad — string. Custom UI için render prop kullan. */
  title?: string;
  /** İkincil açıklama (alt satır) — string. */
  description?: string;
  /** Bu kayıt taşınamaz/seçilemez. */
  disabled?: boolean;
}

/** Yön — left (source) veya right (target). onChange, onSearch'te kullanılır. */
export type TransferDirection = "left" | "right";

/** ServiceCore Transfer — AntD Transfer 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   dataSource, targetKeys, selectedKeys, render, listStyle, operations,
 *   showSearch, filterOption, titles, disabled, oneWay (4.3+),
 *   pagination (4.3+), showSelectAll, footer, locale, rowKey, status (4.19+),
 *   onChange, onSearch, onSelectChange, onScroll
 *
 * 5.7'de YOK:
 *   selectionsIcon (5.8+), selectAllLabels (sürüm belirsiz, sonraki),
 *   classNames/styles semantic DOM (6.0+).
 */
export type TransferProps = ComponentProps<typeof AntTransfer>;

import type { ComponentProps, ReactNode } from "react";
import type { Collapse as AntCollapse } from "antd";

/** Boyut — Card/Input ile uyumlu. */
export type CollapseSize = "small" | "middle" | "large";

/** Expand icon konumu. */
export type CollapseIconPosition = "start" | "end";

/** Collapsible mode — hangi alana tıklayınca açılır.
 *  - header: tüm header tıklanabilir (default)
 *  - icon: sadece chevron tıklanabilir (header tıklanmaz, link/buton koymak için)
 *  - disabled: tıklanamaz */
export type CollapseCollapsible = "header" | "icon" | "disabled";

/** Modern API'de her item — items prop'una verilen kayıt. */
export interface CollapseItem {
  /** Benzersiz key — activeKey ile eşleşir. */
  key: string | number;
  /** Header text/node. */
  label: ReactNode;
  /** Açılan içerik. */
  children?: ReactNode;
  /** Header'ın sağında extra slot (badge, action button). */
  extra?: ReactNode;
  /** Chevron göster/gizle. */
  showArrow?: boolean;
  /** Aktif olmasa bile DOM'da render et — form state için. */
  forceRender?: boolean;
  /** Bu item'ın collapsible davranışı (root'tan farklı olabilir). */
  collapsible?: CollapseCollapsible;
  /** Item'a ek class. */
  className?: string;
  /** Item için inline style. */
  style?: React.CSSProperties;
}

/** ServiceCore Collapse — AntD Collapse 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   accordion, activeKey, defaultActiveKey, bordered,
 *   collapsible (4.9+), ghost (4.4+), size (5.2+),
 *   expandIcon, expandIconPosition (legacy), items (5.6+),
 *   destroyInactivePanel (deprecated ama çalışır), onChange
 *
 * 5.7'de YOK:
 *   destroyOnHidden (5.25+) — destroyInactivePanel kullan,
 *   classNames/styles semantic DOM (6.0+).
 */
export type CollapseProps = ComponentProps<typeof AntCollapse>;

/** Collapse.Panel — children pattern (deprecated 5.6'dan sonra, items önerilir). */
export type CollapsePanelProps = ComponentProps<typeof AntCollapse.Panel>;

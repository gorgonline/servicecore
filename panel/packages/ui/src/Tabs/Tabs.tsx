import { Tabs as AntTabs } from "antd";
import clsx from "clsx";
import styles from "./Tabs.module.css";
import type { TabsProps } from "./Tabs.types";

/** ServiceCore Tabs — AntD Tabs wrap.
 *
 * Aynı sayfa içinde farklı içerik bölümleri arasında geçiş için.
 * Ticket detail (Activity / Comments / Attachments), asset detail,
 * settings panel gibi master-detail ekranlarda kullanılır.
 *
 * AntD API'sini 1:1 korur (activeKey, defaultActiveKey, items, type, size,
 * tabPosition, centered, animated, hideAdd, tabBarExtraContent, tabBarGutter,
 * tabBarStyle, addIcon, removeIcon, moreIcon, destroyInactiveTabPane,
 * onChange, onEdit, onTabClick, onTabScroll).
 *
 * Hem `items` prop'u (modern API) hem de `<Tabs.TabPane>` children pattern'i
 * desteklenir. ServiceCore'da `items` prefer edilir.
 *
 * @example
 * ```tsx
 * <Tabs
 *   defaultActiveKey="detay"
 *   items={[
 *     { key: "detay",    label: "Detay",    children: <DetayPanel /> },
 *     { key: "yorumlar", label: "Yorumlar", children: <YorumPanel /> },
 *   ]}
 * />
 * ```
 */
export function Tabs({ className, ...rest }: TabsProps) {
  return <AntTabs {...rest} className={clsx(styles.tabs, className)} />;
}

/** Children-based pattern için TabPane — AntD'nin orijinali.
 *  AntD 5.x'te deprecated ama 5.7 baseline'da hâlâ çalışır. items'ı tercih et.
 *
 * @example
 * ```tsx
 * <Tabs defaultActiveKey="1">
 *   <Tabs.TabPane tab="Detay" key="1">...</Tabs.TabPane>
 *   <Tabs.TabPane tab="Yorum" key="2">...</Tabs.TabPane>
 * </Tabs>
 * ```
 */
Tabs.TabPane = AntTabs.TabPane;

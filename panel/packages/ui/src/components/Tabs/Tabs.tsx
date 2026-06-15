import { Tabs as AntTabs } from "antd";
import { Add, OverflowMenuHorizontal } from "@carbon/icons-react";
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
 * tabBarStyle, addIcon, moreIcon, destroyInactiveTabPane,
 * onChange, onEdit, onTabClick, onTabScroll). Not: AntD 5.7 üst-seviye
 * `removeIcon` taşımaz — kapatma ikonu item-level `closeIcon` ile verilir.
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
 *
 * İkonlar Carbon'a çekildi:
 * - `addIcon` (editable-card "+" butonu) → Carbon `Add`. .ant-tabs-nav-add içine girer.
 * - `moreIcon` (taşan sekmeler "⋯") → Carbon `OverflowMenuHorizontal` (yatay). .ant-tabs-nav-more.
 * - Kapatma ikonu: AntD 5.7 üst-seviye `removeIcon` prop'unu **dışa açmaz** (editable
 *   config'inde CloseOutlined hard-coded; rc-tabs `closeIcon || editable.removeIcon || '×'`).
 *   Bu yüzden tab-bazlı kapatma ikonunu değiştirmek için item'da `closeIcon` verilir.
 *   Default CloseOutlined glyph'inin boyutu .ant-tabs-tab-remove svg ile CSS'te hizalanır.
 *
 * Override: consumer kendi `addIcon`/`moreIcon`'unu verirse korunur
 * (`=== undefined` kontrolü; null/false ile gizlemeye saygı).
 */
export function Tabs({ className, addIcon, moreIcon, ...rest }: TabsProps) {
  return (
    <AntTabs
      {...rest}
      // Default Carbon ikonları; custom verilirse override edilir.
      addIcon={addIcon === undefined ? <Add /> : addIcon}
      moreIcon={moreIcon === undefined ? <OverflowMenuHorizontal /> : moreIcon}
      className={clsx(styles.tabs, className)}
    />
  );
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

import { Collapse as AntCollapse } from "antd";
import { ChevronRight } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Collapse.module.css";
import type {
  CollapseProps,
  CollapsePanelProps,
} from "./Collapse.types";

/** Default expand icon — Carbon ChevronRight.
 *
 * AntD default'u RightOutlined'tı (font-icon `rotate` prop'uyla dönerdi).
 * Carbon SVG'de `rotate` prop yok; isActive'de `transform: rotate(90deg)`
 * ile elle döndürüyoruz. Dönüş animasyonu .ant-collapse-arrow'un CSS
 * `transition: transform` kuralından gelir.
 *
 * AntD `renderExpandIcon` bu node'a `.ant-collapse-arrow` class'ını
 * cloneElement ile ekler (source: antd/es/collapse/Collapse.js) — renk
 * (tertiary/hover/active-accent) o class'tan currentColor ile gelir.
 * Boyut Collapse.module.css'te svg 16px olarak verilir.
 */
const defaultExpandIcon: NonNullable<CollapseProps["expandIcon"]> = (
  panelProps,
) => (
  <ChevronRight
    style={{ transform: panelProps?.isActive ? "rotate(90deg)" : undefined }}
  />
);

/** ServiceCore Collapse — AntD Collapse wrap.
 *
 * Accordion / açılır panel. FAQ, settings sections, advanced filters,
 * ticket detail collapsible sections, permission tree (collapsible groups).
 *
 * AntD API'sini 1:1 korur. Modern API <code>items</code> prop'u tercih edilir;
 * <code>Collapse.Panel</code> children pattern hâlâ destekli ama deprecated yolda.
 *
 * @example Modern items
 * ```tsx
 * <Collapse
 *   items={[
 *     { key: "1", label: "Bilet bilgileri", children: <Detay /> },
 *     { key: "2", label: "Yorumlar (3)", children: <Yorum /> },
 *   ]}
 * />
 * ```
 *
 * @example Accordion (sadece bir açık)
 * ```tsx
 * <Collapse accordion items={faq} />
 * ```
 *
 * @example Ghost (borderless, settings için)
 * ```tsx
 * <Collapse ghost items={sections} />
 * ```
 */
function CollapseRoot({ className, expandIcon, ...rest }: CollapseProps) {
  return (
    <AntCollapse
      {...rest}
      // Default Carbon ChevronRight; consumer kendi expandIcon'unu verirse korunur.
      expandIcon={expandIcon === undefined ? defaultExpandIcon : expandIcon}
      className={clsx(styles.collapse, className)}
    />
  );
}

/** Collapse.Panel — children pattern için. Modern <code>items</code> tercih edilir. */
function CollapsePanel({ className, ...rest }: CollapsePanelProps) {
  return (
    <AntCollapse.Panel
      {...rest}
      className={clsx(styles.panel, className)}
    />
  );
}

CollapseRoot.Panel = CollapsePanel;

export const Collapse = CollapseRoot;

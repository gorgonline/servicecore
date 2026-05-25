import { Collapse as AntCollapse } from "antd";
import clsx from "clsx";
import styles from "./Collapse.module.css";
import type {
  CollapseProps,
  CollapsePanelProps,
} from "./Collapse.types";

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
function CollapseRoot({ className, ...rest }: CollapseProps) {
  return (
    <AntCollapse {...rest} className={clsx(styles.collapse, className)} />
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

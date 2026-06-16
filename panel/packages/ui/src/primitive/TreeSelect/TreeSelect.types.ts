import type { ComponentProps, ReactNode } from "react";
import type { TreeSelect as AntTreeSelect } from "antd";

/** Tree node — hiyerarşik veri yapısı. */
export interface TreeSelectNode {
  /** Görünen etiket (ReactNode — Avatar/icon + metin için). */
  title?: ReactNode;
  /** Form value — benzersiz. */
  value: string | number;
  /** AntD internal key — verilmezse value kullanılır. */
  key?: string | number;
  /** Alt node'lar — hiyerarşi. */
  children?: TreeSelectNode[];
  /** Tüm node'u devre dışı bırak. */
  disabled?: boolean;
  /** Sadece checkbox'ı devre dışı bırak (treeCheckable mode). */
  disableCheckbox?: boolean;
  /** Tıklanıp seçilemez (sadece parent grup gibi). */
  selectable?: boolean;
  /** Leaf node olarak işaretle — loadData için. */
  isLeaf?: boolean;
  /** Bu node için checkbox gösterilsin mi (override). */
  checkable?: boolean;
}

/** checkedStrategy — seçili node'lar selectör input'unda nasıl gösterilsin.
 *  SHOW_CHILD: sadece leaf'leri göster (default)
 *  SHOW_PARENT: tüm child'lar seçiliyse sadece parent göster
 *  SHOW_ALL: hepsini göster */
export type TreeSelectCheckedStrategy = "SHOW_ALL" | "SHOW_PARENT" | "SHOW_CHILD";

/** Boyut. */
export type TreeSelectSize = "small" | "middle" | "large";

/** Validation durumu. */
export type TreeSelectStatus = "error" | "warning";

/** ServiceCore TreeSelect — AntD TreeSelect 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue, multiple, treeCheckable, treeCheckStrictly,
 *   treeData, fieldNames, placeholder, disabled, allowClear, showSearch,
 *   filterTreeNode, treeNodeFilterProp, treeNodeLabelProp,
 *   treeDefaultExpandAll, treeDefaultExpandedKeys, treeExpandedKeys,
 *   treeExpandAction, treeIcon, switcherIcon, treeLine,
 *   showCheckedStrategy, maxTagCount, maxTagPlaceholder, tagRender,
 *   labelInValue, popupMatchSelectWidth (5.5+), loadData, treeLoadedKeys,
 *   status, size, virtual, popupClassName (4.23+),
 *   onChange, onSelect, onSearch, onTreeExpand, onOpenChange / onDropdownVisibleChange
 *
 * 5.7'de YOK:
 *   variant (5.13+), prefix (5.22+), maxCount (5.23+),
 *   onPopupScroll (5.17+), classNames/styles semantic DOM (6.0+).
 */
export type TreeSelectProps = ComponentProps<typeof AntTreeSelect> & {
  /** Popup için root class. CSS module scope'u. */
  popupClassName?: string;
};

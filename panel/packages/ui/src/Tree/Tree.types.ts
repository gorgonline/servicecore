import type { ComponentProps, ReactNode } from "react";
import type { Tree as AntTree } from "antd";

/** Tree node — hiyerarşik veri yapısı. */
export interface TreeDataNode {
  /** Görünen başlık. */
  title?: ReactNode;
  /** Benzersiz key (rowKey). */
  key: string | number;
  /** Alt node'lar. */
  children?: TreeDataNode[];
  /** Tüm node'u devre dışı bırak. */
  disabled?: boolean;
  /** Sadece checkbox'ı devre dışı bırak. */
  disableCheckbox?: boolean;
  /** Bu node tıklanıp seçilemez. */
  selectable?: boolean;
  /** Bu node için checkbox göster (override). */
  checkable?: boolean;
  /** Leaf node — loadData için. */
  isLeaf?: boolean;
  /** Custom icon (showIcon ile). */
  icon?: ReactNode;
}

/** Drag info — onDrop callback'inde gelir. */
export interface TreeDropInfo<T = TreeDataNode> {
  event: React.MouseEvent;
  node: T;
  dragNode: T;
  dragNodesKeys: (string | number)[];
  dropPosition: number;
  dropToGap: boolean;
}

/** ServiceCore Tree — AntD Tree 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   treeData, fieldNames (4.17+ — title/key/children rename),
 *   checkable, checkedKeys, defaultCheckedKeys, onCheck,
 *   checkStrictly, selectable, selectedKeys, multiple,
 *   expandedKeys, defaultExpandedKeys, defaultExpandAll, autoExpandParent,
 *   onExpand, onLoad, showIcon, icon, showLine (boolean | { showLeafIcon }),
 *   switcherIcon, draggable (boolean | { icon, nodeDraggable } — 4.17+),
 *   allowDrop, onDrop, onDragStart/End/Over/Enter/Leave,
 *   blockNode, virtual (4.1+), height, filterTreeNode,
 *   loadData, loadedKeys, rootStyle (4.20+), rootClassName,
 *   titleRender (4.5+), Tree.DirectoryTree
 *
 * 5.7'de YOK:
 *   switcherLoadingIcon (5.20+),
 *   classNames/styles semantic DOM (6.0+).
 */
export type TreeProps = ComponentProps<typeof AntTree>;

/** Tree.DirectoryTree — file explorer tarzı (klasör icon + selectable). */
export type DirectoryTreeProps = ComponentProps<typeof AntTree.DirectoryTree>;

/** switcherIcon fonksiyon imzasının aldığı node prop'ları (AntD AntTreeNodeProps alt kümesi).
 *
 * AntD'de `switcherIcon` ya ReactNode ya da `(props) => ReactNode`. Default switcher
 * ikonumuz bu props'tan `expanded` (dönüş yönü) ve `isLeaf` (leaf'te gizle) okur. */
export interface TreeSwitcherProps {
  expanded?: boolean;
  isLeaf?: boolean;
}

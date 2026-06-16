import { Tree as AntTree } from "antd";
import { ChevronDown } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Tree.module.css";
import type {
  TreeProps,
  DirectoryTreeProps,
  TreeSwitcherProps,
} from "./Tree.types";

/** Default switcher ikonu — AntD'nin sızan CaretDownFilled glyph'i yerine Carbon ChevronDown.
 *
 * Leaf node'da switcher gösterilmez (AntD source da !showLine ise null döner).
 * Kapalı node'da -90° döner (ChevronRight görünümü), açıkken aşağı bakar.
 *
 * AntD `.ant-tree-switcher-icon` class'ını clone ile bu ikona EKLER (iconUtil.js),
 * dolayısıyla renk `.ant-tree-switcher` üstünden, boyut/dönüş CSS'te .ant-tree-switcher-icon'da. */
function defaultSwitcherIcon({ expanded, isLeaf }: TreeSwitcherProps) {
  if (isLeaf) return null;
  return (
    <ChevronDown
      style={{ transform: expanded ? undefined : "rotate(-90deg)" }}
    />
  );
}

/** ServiceCore Tree — AntD Tree wrap.
 *
 * Hiyerarşik veri görüntüleme. Asset hierarchy, permission tree,
 * organization chart, KB taxonomy, file explorer. Checkable + checkStrictly,
 * draggable + drop callbacks, virtual scroll (4.1+'dan beri).
 *
 * <strong>Tree vs TreeSelect:</strong> Tree standalone gösterim/seçim,
 * TreeSelect input alanında dropdown ile.
 *
 * AntD API'sini 1:1 korur.
 *
 * @example Basic
 * ```tsx
 * <Tree
 *   treeData={categories}
 *   defaultExpandAll
 *   onSelect={(keys) => setSelected(keys)}
 * />
 * ```
 *
 * @example Checkable + checkStrictly
 * ```tsx
 * <Tree
 *   checkable
 *   checkStrictly  // parent-child sync KAPALI
 *   checkedKeys={checked}
 *   onCheck={setChecked}
 *   treeData={permissions}
 * />
 * ```
 *
 * @example File explorer
 * ```tsx
 * <Tree.DirectoryTree treeData={files} multiple />
 * ```
 */
function TreeRoot({ className, switcherIcon, ...rest }: TreeProps) {
  return (
    <AntTree
      {...rest}
      // Custom verilirse (null/false dahil) korunur; verilmezse Carbon default.
      switcherIcon={switcherIcon === undefined ? defaultSwitcherIcon : switcherIcon}
      className={clsx(styles.tree, className)}
    />
  );
}

/** Tree.DirectoryTree — file explorer tarzı (klasör icon + multiple). */
function TreeDirectory({ className, switcherIcon, ...rest }: DirectoryTreeProps) {
  return (
    <AntTree.DirectoryTree
      {...rest}
      // Custom verilirse (null/false dahil) korunur; verilmezse Carbon default.
      switcherIcon={switcherIcon === undefined ? defaultSwitcherIcon : switcherIcon}
      className={clsx(styles.tree, styles.directoryTree, className)}
    />
  );
}

TreeRoot.DirectoryTree = TreeDirectory;

export const Tree = TreeRoot;

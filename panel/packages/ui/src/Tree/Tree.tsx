import { Tree as AntTree } from "antd";
import clsx from "clsx";
import styles from "./Tree.module.css";
import type {
  TreeProps,
  DirectoryTreeProps,
} from "./Tree.types";

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
function TreeRoot({ className, ...rest }: TreeProps) {
  return <AntTree {...rest} className={clsx(styles.tree, className)} />;
}

/** Tree.DirectoryTree — file explorer tarzı (klasör icon + multiple). */
function TreeDirectory({ className, ...rest }: DirectoryTreeProps) {
  return (
    <AntTree.DirectoryTree
      {...rest}
      className={clsx(styles.tree, styles.directoryTree, className)}
    />
  );
}

TreeRoot.DirectoryTree = TreeDirectory;

export const Tree = TreeRoot;

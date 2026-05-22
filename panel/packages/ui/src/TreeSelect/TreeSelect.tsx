import { TreeSelect as AntTreeSelect } from "antd";
import clsx from "clsx";
import styles from "./TreeSelect.module.css";
import type { TreeSelectProps } from "./TreeSelect.types";

/** ServiceCore TreeSelect — AntD TreeSelect wrap.
 *
 * Hiyerarşik select. Asset kategorisi (Network > VPN > Connection),
 * organizasyon (Şirket > Departman > Takım), location (Tesis > Kat > Oda),
 * permission tree, bilet kategorisi.
 *
 * Düz Select multi yetersiz olduğunda — kullanıcı parent seçince tüm
 * child'lar otomatik seçilsin, hiyerarşi görselde dursun istiyorsan.
 *
 * AntD API'sini 1:1 korur.
 *
 * @example Tek seçim hiyerarşi
 * ```tsx
 * <TreeSelect
 *   treeData={categories}
 *   value={cat}
 *   onChange={setCat}
 *   placeholder="Kategori seç"
 * />
 * ```
 *
 * @example Çoklu seçim + checkbox + showSearch
 * ```tsx
 * <TreeSelect
 *   multiple
 *   treeCheckable
 *   showSearch
 *   showCheckedStrategy="SHOW_PARENT"
 *   treeData={tree}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
export function TreeSelect({
  className,
  popupClassName,
  ...rest
}: TreeSelectProps) {
  return (
    <AntTreeSelect
      {...rest}
      className={clsx(styles.treeSelect, className)}
      popupClassName={clsx(styles.popup, popupClassName)}
    />
  );
}

/** AntD TreeSelect.SHOW_* sabitleri — showCheckedStrategy prop için. */
TreeSelect.SHOW_ALL = AntTreeSelect.SHOW_ALL;
TreeSelect.SHOW_PARENT = AntTreeSelect.SHOW_PARENT;
TreeSelect.SHOW_CHILD = AntTreeSelect.SHOW_CHILD;

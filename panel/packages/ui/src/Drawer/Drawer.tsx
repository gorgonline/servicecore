import { Drawer as AntDrawer } from "antd";
import { Close } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Drawer.module.css";
import type { DrawerProps } from "./Drawer.types";

/** ServiceCore Drawer — AntD Drawer wrap.
 *
 * Yandan açılır panel. Bilet detay (sağdan), filter sidebar (soldan),
 * settings panel (sağdan geniş), form modal alternative, asset detail,
 * user preferences. Modal'dan farkı: ana içerik soldakaybedilmez, yan
 * panel açılır.
 *
 * AntD API'sini 1:1 korur. Default placement='right', size='default' (378px).
 *
 * @example Basic
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Drawer title="Bilet Detayı" open={open} onClose={() => setOpen(false)}>
 *   <BiletDetay />
 * </Drawer>
 * ```
 *
 * @example Footer ile (form modal alternative)
 * ```tsx
 * <Drawer
 *   title="Yeni Bilet"
 *   open={open}
 *   onClose={onClose}
 *   size="large"
 *   footer={
 *     <Space>
 *       <Button onClick={onClose}>Vazgeç</Button>
 *       <Button type="primary" onClick={onSave}>Kaydet</Button>
 *     </Space>
 *   }
 * >
 *   <BiletForm />
 * </Drawer>
 * ```
 *
 * @example Filter sidebar
 * ```tsx
 * <Drawer
 *   title="Filtreler"
 *   placement="left"
 *   open={filterOpen}
 *   onClose={() => setFilterOpen(false)}
 *   width={320}
 * >
 *   <FilterForm />
 * </Drawer>
 * ```
 */
export function Drawer({ className, rootClassName, closeIcon, ...rest }: DrawerProps) {
  return (
    <AntDrawer
      {...rest}
      // Default kapatma X'i Carbon; consumer null/false ile gizleyebilir, custom node geçebilir.
      closeIcon={closeIcon === undefined ? <Close /> : closeIcon}
      className={clsx(styles.drawer, className)}
      rootClassName={clsx(styles.root, rootClassName)}
    />
  );
}

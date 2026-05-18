import { Menu as AntMenu } from "antd";
import type { MenuProps as AntMenuProps, MenuRef } from "antd";
import { forwardRef } from "react";
import type { ForwardedRef } from "react";
import { ChevronRight, OverflowMenuVertical } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Menu.module.css";

export interface MenuProps extends AntMenuProps {}

/** Default expand icon — Carbon ChevronRight.
 *
 * Vertical popup mode: ▶ (sağa açılır, default doğru)
 * Inline mode: ▶ (kapalı) → CSS ile 90° rotate ile ▼ (açık)
 *
 * Rotasyon mantığı CSS'de — submenu LI'sine AntD'nin eklediği `.ant-menu-submenu-open`
 * class'ı üzerinden yönetilir.
 */
const defaultExpandIcon = () => (
  <ChevronRight className={styles.expandIcon} />
);

/** ServiceCore Menu — AntD Menu wrap.
 *
 * Persistent navigation: sider (inline), top nav (horizontal), popup menu (vertical).
 * Tek seviye veya 2 seviye nesting (3+ kaçın — Dropdown veya Tree daha uygun).
 *
 * AntD API'sini 1:1 korur (items, mode, theme, selectedKeys, openKeys,
 * inlineCollapsed, inlineIndent, triggerSubMenuAction, multiple, selectable,
 * onClick, onSelect, onDeselect, onOpenChange, forceSubMenuRender).
 *
 * Default'lar:
 *   - `expandIcon` — Carbon ChevronDown (inline için optimize)
 *   - `overflowedIndicator` — Carbon OverflowMenuVertical (horizontal overflow)
 *
 * NOT (AntD 5.7 baseline):
 *   - `popupRender` (6.0+) yok — submenu popup'unu sarmak için JSX render üzerinden.
 *   - `tooltip` (6.3+) yok — collapsed mode tooltip'leri AntD default (item.title).
 *   - Item'da `extra` field (5.21+) yok — label içinde inline span kullan.
 *
 * Sub-components: `Menu.Item`, `Menu.SubMenu`, `Menu.ItemGroup`, `Menu.Divider`
 * — 4.20+ DEPRECATED (children API). Modern: `items` prop'u.
 */
function MenuImpl(
  { expandIcon, overflowedIndicator, className, ...rest }: MenuProps,
  ref: ForwardedRef<MenuRef>,
) {
  return (
    <AntMenu
      ref={ref}
      {...rest}
      expandIcon={expandIcon ?? defaultExpandIcon}
      overflowedIndicator={overflowedIndicator ?? <OverflowMenuVertical />}
      className={clsx(styles.menu, className)}
    />
  );
}

const MenuForwarded = forwardRef(MenuImpl);

/* ── Compose with sub-components (deprecated children API için) ── */

type MenuComponent = typeof MenuForwarded & {
  Item: typeof AntMenu.Item;
  SubMenu: typeof AntMenu.SubMenu;
  ItemGroup: typeof AntMenu.ItemGroup;
  Divider: typeof AntMenu.Divider;
};

export const Menu = MenuForwarded as MenuComponent;
Menu.Item = AntMenu.Item;
Menu.SubMenu = AntMenu.SubMenu;
Menu.ItemGroup = AntMenu.ItemGroup;
Menu.Divider = AntMenu.Divider;

export type { MenuRef };

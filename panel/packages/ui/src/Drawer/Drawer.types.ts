import type { ComponentProps } from "react";
import type { Drawer as AntDrawer } from "antd";

/** Placement — drawer hangi taraftan açılır. Default: 'right'. */
export type DrawerPlacement = "top" | "right" | "bottom" | "left";

/** Boyut. 'default' (378px) veya 'large' (736px). */
export type DrawerSize = "default" | "large";

/** ServiceCore Drawer — AntD Drawer 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   open / onClose / afterOpenChange (4.23+),
 *   title, extra, footer, placement (top/right/bottom/left),
 *   size ('default' 378px / 'large' 736px), width, height,
 *   mask (boolean | object), maskClosable, keyboard,
 *   closable (boolean — 5.7'de object form YOK), closeIcon,
 *   getContainer, rootStyle, rootClassName,
 *   push (nested drawer push effect),
 *   destroyOnClose (legacy), zIndex, autoFocus, forceRender,
 *   legacy: bodyStyle, headerStyle, footerStyle, drawerStyle
 *
 * 5.7'de YOK:
 *   loading (5.17+) — Skeleton göstergesi,
 *   closable object form `{ closeIcon, disabled, placement }` (5.28+),
 *   destroyOnHidden (5.25+) — destroyOnClose legacy kullan,
 *   classNames/styles semantic DOM (6.0+).
 */
export type DrawerProps = ComponentProps<typeof AntDrawer>;

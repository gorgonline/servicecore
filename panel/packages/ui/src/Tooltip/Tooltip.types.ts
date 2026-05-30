import type { ComponentProps } from "react";
import type { Tooltip as AntTooltip } from "antd";

/** Trigger — hangi etkileşim tooltip açar. Default 'hover'. */
export type TooltipTrigger = "hover" | "focus" | "click" | "contextMenu";

/** Placement — anchor'a göre tooltip konumu. */
export type TooltipPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

/** ServiceCore Tooltip — AntD Tooltip 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   title (ReactNode | () => ReactNode), trigger, placement,
 *   arrow (boolean | { pointAtCenter — 5.2+}),
 *   open / defaultOpen / onOpenChange (4.23+),
 *   mouseEnterDelay, mouseLeaveDelay, color (preset / hex — 4.3+),
 *   zIndex, getPopupContainer, autoAdjustOverflow, align,
 *   overlayClassName / overlayStyle / overlayInnerStyle (legacy)
 *
 * 5.7'de YOK:
 *   fresh (5.10+), destroyOnHidden (5.25+) — destroyTooltipOnHide legacy
 *   çalışır, classNames/styles semantic DOM (6.0+).
 */
export type TooltipProps = ComponentProps<typeof AntTooltip>;

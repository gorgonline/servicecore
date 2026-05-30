import type { ComponentProps } from "react";
import type { Popover as AntPopover } from "antd";

/** Trigger tipi — hangi etkileşim popover'ı açar. */
export type PopoverTrigger = "hover" | "focus" | "click" | "contextMenu";

/** Yerleşim — anchor'a göre popover konumu. */
export type PopoverPlacement =
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

/** ServiceCore Popover — AntD Popover 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   title, content, trigger, placement,
 *   arrow (boolean | { pointAtCenter } — 5.2+),
 *   open / defaultOpen / onOpenChange (4.23+),
 *   mouseEnterDelay, mouseLeaveDelay, color (4.3+),
 *   zIndex, getPopupContainer, autoAdjustOverflow, align,
 *   overlayClassName / overlayStyle / overlayInnerStyle (legacy ama çalışır),
 *   destroyTooltipOnHide (legacy)
 *
 * 5.7'de YOK:
 *   fresh (5.10+), destroyOnHidden (5.25+).
 */
export type PopoverProps = ComponentProps<typeof AntPopover>;

import { Popover as AntPopover } from "antd";
import clsx from "clsx";
import styles from "./Popover.module.css";
import type { PopoverProps } from "./Popover.types";

/** ServiceCore Popover — AntD Popover wrap.
 *
 * Tooltip'in zengin akrabası — title + content + action button koyabilirsin.
 * Kullanım: bilet column action menu, user profile preview, asset quick view,
 * help text + read more, settings dropdown.
 *
 * <strong>Tooltip vs Popover:</strong> kısa metin (sadece text) →{" "}
 * Tooltip; rich içerik (header, action, multiple line) → Popover.
 *
 * AntD API'sini 1:1 korur.
 *
 * @example Hover (default)
 * ```tsx
 * <Popover content="Detaylı açıklama" title="Yardım">
 *   <Button>Hover et</Button>
 * </Popover>
 * ```
 *
 * @example Click + rich content
 * ```tsx
 * <Popover
 *   trigger="click"
 *   title="Mehmet K."
 *   content={
 *     <div>
 *       <p>Network Engineer · İstanbul</p>
 *       <Button type="link">Profili gör</Button>
 *     </div>
 *   }
 * >
 *   <Avatar>MK</Avatar>
 * </Popover>
 * ```
 *
 * @example Controlled
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Popover open={open} onOpenChange={setOpen} content={...}>
 *   <Button>Toggle</Button>
 * </Popover>
 * ```
 */
export function Popover({
  rootClassName,
  overlayClassName,
  ...rest
}: PopoverProps) {
  return (
    <AntPopover
      {...rest}
      rootClassName={clsx(styles.popover, rootClassName)}
      overlayClassName={clsx(styles.legacyOverlay, overlayClassName)}
    />
  );
}

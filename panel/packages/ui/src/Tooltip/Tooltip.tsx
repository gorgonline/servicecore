import { Tooltip as AntTooltip } from "antd";
import clsx from "clsx";
import styles from "./Tooltip.module.css";
import type { TooltipProps } from "./Tooltip.types";

/** ServiceCore Tooltip — AntD Tooltip wrap.
 *
 * Sade ipucu — icon button açıklaması, kısaltma (P1/SLA), disabled neden,
 * truncated text expansion, full timestamp/URL gösterimi.
 *
 * <strong>Tooltip vs Popover:</strong> sadece text → Tooltip; title +
 * content + action button → Popover.
 *
 * AntD API'sini 1:1 korur. Default trigger="hover", placement="top".
 *
 * @example Icon button açıklaması
 * ```tsx
 * <Tooltip title="Düzenle">
 *   <Button type="text" leadingIcon={<Edit />} aria-label="Düzenle" />
 * </Tooltip>
 * ```
 *
 * @example Disabled neden
 * ```tsx
 * <Tooltip title="Pro plan gerekir">
 *   <span>
 *     <Button disabled>Webhook ekle</Button>
 *   </span>
 * </Tooltip>
 * ```
 *
 * @example Controlled
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Tooltip open={open} onOpenChange={setOpen} title="Kopyalandı!">
 *   <Button onClick={() => { copy(); setOpen(true); }}>Kopyala</Button>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  rootClassName,
  overlayClassName,
  ...rest
}: TooltipProps) {
  return (
    <AntTooltip
      {...rest}
      rootClassName={clsx(styles.tooltip, rootClassName)}
      overlayClassName={clsx(styles.legacyOverlay, overlayClassName)}
    />
  );
}

import type { ComponentProps } from "react";
import type { QRCode as AntQRCode } from "antd";

/** Render tipi — canvas (default) veya svg (print-friendly, scalable). */
export type QRCodeType = "canvas" | "svg";

/** Error correction level — yüksek seviye = daha fazla redundancy
 *  (icon overlay'i için H önerilir, ama QR daha yoğun olur).
 *  L: ~7%, M: ~15%, Q: ~25%, H: ~30% recovery.
 */
export type QRCodeErrorLevel = "L" | "M" | "Q" | "H";

/** Status — overlay göstergesi.
 *  active: normal, expired: süresi doldu (refresh ile yenile),
 *  loading: yükleniyor.
 *  NOT: "scanned" 5.7 TypeScript tipinde yok — kullanıcı tarayınca
 *  status'u active'e bırak + Notification/Toast ile bilgilendir. */
export type QRCodeStatus = "active" | "expired" | "loading";

/** ServiceCore QRCode — AntD QRCode 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, type (canvas/svg — 5.6+), size, color (foreground), bgColor,
 *   bordered, icon (URL string), errorLevel ('L'/'M'/'Q'/'H'),
 *   status ('active'/'expired'/'loading'/'scanned'), onRefresh
 *
 * 5.7'de YOK:
 *   iconSize object form (number tek değer 5.7'de olabilir; object 5.19+),
 *   statusRender (5.20+),
 *   marginSize (6.2+),
 *   boostLevel (5.28+),
 *   classNames/styles semantic DOM (6.0+).
 */
export type QRCodeProps = ComponentProps<typeof AntQRCode>;

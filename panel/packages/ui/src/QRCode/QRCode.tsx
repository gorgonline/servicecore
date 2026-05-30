import { QRCode as AntQRCode } from "antd";
import clsx from "clsx";
import styles from "./QRCode.module.css";
import type { QRCodeProps } from "./QRCode.types";

/** ServiceCore QRCode — AntD QRCode wrap.
 *
 * QR kod üretimi. Mobile login link, 2FA TOTP setup, asset QR tag,
 * bilet share link, WiFi credential. <strong>icon</strong> ile center logo,
 * <strong>status="expired"</strong> + <strong>onRefresh</strong> ile session
 * yenileme akışı.
 *
 * AntD API'sini 1:1 korur. AntD 5.1+'da geldi, 5.7'de stable.
 *
 * @example Mobile login
 * ```tsx
 * <QRCode
 *   value="https://app.servicecore.com/login?token=xyz"
 *   size={160}
 *   bordered
 * />
 * ```
 *
 * @example Center icon (logo) + high error correction
 * ```tsx
 * <QRCode
 *   value="..."
 *   icon="/logo.png"
 *   errorLevel="H"
 *   size={200}
 * />
 * ```
 *
 * @example Expired + refresh
 * ```tsx
 * <QRCode
 *   value={token}
 *   status={expired ? "expired" : "active"}
 *   onRefresh={() => regenerateToken()}
 * />
 * ```
 */
export function QRCode({ className, ...rest }: QRCodeProps) {
  return (
    <AntQRCode {...rest} className={clsx(styles.qrcode, className)} />
  );
}

import type { ReactNode } from "react";
import { Alert as AntAlert } from "antd";
import type { AlertProps as AntAlertProps } from "antd";
import {
  CheckmarkFilled,
  InformationFilled,
  WarningAltFilled,
  ErrorFilled,
  Close,
} from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Alert.module.css";

export type AlertType = "success" | "info" | "warning" | "error";

export interface AlertProps extends Omit<AntAlertProps, "type"> {
  /** Tip. AntD ile aynı. Default: "info" (banner mode'da "warning"). */
  type?: AlertType;
}

const CARBON_ICONS: Record<AlertType, ReactNode> = {
  success: <CheckmarkFilled />,
  info: <InformationFilled />,
  warning: <WarningAltFilled />,
  error: <ErrorFilled />,
};

/** ServiceCore Alert — AntD Alert wrap.
 *
 * Sayfa içinde **persistent** uyarı/info/error/success kutusu.
 *
 * AntD API'sini 1:1 korur (message, description, type, showIcon, icon, closable,
 * action, banner, onClose, afterClose).
 *
 * Default icon Carbon'dan: CheckmarkFilled / InformationFilled / WarningAltFilled / ErrorFilled.
 * Custom icon vermek istenirse `icon` prop'u kullan.
 */
export function Alert({
  type = "info",
  showIcon,
  icon,
  closable,
  closeIcon,
  className,
  ...rest
}: AlertProps) {
  // showIcon true ise ve custom icon yoksa Carbon'dan default'u koy
  const resolvedIcon = icon ?? (showIcon ? CARBON_ICONS[type] : undefined);
  // closable iken closeIcon verilmemişse Carbon Close default
  const resolvedCloseIcon = closable && closeIcon === undefined ? <Close /> : closeIcon;
  return (
    <AntAlert
      {...rest}
      type={type}
      showIcon={showIcon}
      icon={resolvedIcon}
      closable={closable}
      closeIcon={resolvedCloseIcon}
      className={clsx(styles.alert, className)}
    />
  );
}

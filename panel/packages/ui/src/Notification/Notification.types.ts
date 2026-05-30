import type { ReactNode } from "react";
import type { notification as AntNotification } from "antd";

/** Notification tipi — success/error/warning/info ve generic open. */
export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "open";

/** Notification placement — 6 yön. */
export type NotificationPlacement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";

/** Notification config — open/success/error/warning/info argumanı. */
export interface NotificationConfig {
  /** Başlık — zorunlu. */
  message: ReactNode;
  /** Açıklama — alt satır. */
  description?: ReactNode;
  /** Action button (5.7 baseline — actions 5.24+ kullanma). */
  btn?: ReactNode;
  /** Custom icon — type icon'unu override eder. */
  icon?: ReactNode;
  /** Close ikonu — null/false ile gizlenir (5.7+). */
  closeIcon?: ReactNode | boolean;
  /** Auto-dismiss süresi (saniye). Default 4.5. 0/false = manuel kapanır. */
  duration?: number | false;
  /** Unique key — destroy(key) ve update için. */
  key?: string;
  /** Konum — default topRight. */
  placement?: NotificationPlacement;
  /** Custom class. */
  className?: string;
  /** Inline style. */
  style?: React.CSSProperties;
  /** Click handler. */
  onClick?: () => void;
  /** Auto-close callback. */
  onClose?: () => void;
  /** Screen reader role (5.6+). */
  role?: "alert" | "status";
  /** Data/ARIA attrs. */
  props?: Record<string, unknown>;
}

/** Notification API (imperative). */
export type NotificationInstance = typeof AntNotification;

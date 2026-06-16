import type { ReactNode } from "react";
import type { message as AntMessage } from "antd";

/** Message tipi — success/error/warning/info/loading. */
export type MessageType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading";

/** Message config — open() ile veya success/error config formunda. */
export interface MessageConfig {
  /** İçerik (zorunlu). */
  content: ReactNode;
  /** Auto-dismiss süresi (saniye). Default 3. 0 = manuel kapanır. */
  duration?: number;
  /** Custom icon. */
  icon?: ReactNode;
  /** Unique key — destroy(key) için. */
  key?: string | number;
  /** Tip — open() ile birlikte kullanılır. */
  type?: MessageType;
  /** Custom class. */
  className?: string;
  /** Inline style. */
  style?: React.CSSProperties;
  /** Click handler. */
  onClick?: () => void;
  /** Auto-close callback. */
  onClose?: () => void;
  /** Hover'da timer duraklat. Default true. */
  pauseOnHover?: boolean;
}

/** Message API (imperative). */
export type MessageInstance = typeof AntMessage;

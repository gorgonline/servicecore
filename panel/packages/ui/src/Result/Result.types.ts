import type { ComponentProps } from "react";
import type { Result as AntResult } from "antd";

/** Result component props (AntD 5.7 baseline). */
export type ResultProps = ComponentProps<typeof AntResult>;

/** Result status — 7 hazır görsel. */
export type ResultStatus =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "404"
  | "403"
  | "500";

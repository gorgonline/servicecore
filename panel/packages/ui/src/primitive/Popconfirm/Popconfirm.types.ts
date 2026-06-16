import type { ComponentProps } from "react";
import type { Popconfirm as AntPopconfirm } from "antd";

/** Popconfirm props (AntD 5.7 baseline). */
export type PopconfirmProps = ComponentProps<typeof AntPopconfirm>;

/** Placement — 12 yön (tooltip ile aynı). */
export type PopconfirmPlacement =
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

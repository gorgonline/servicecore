import type { ComponentProps } from "react";
import type { Spin as AntSpin } from "antd";

/** Spin component props (AntD 5.7 baseline). */
export type SpinProps = ComponentProps<typeof AntSpin>;

/** Spin size. AntD 5.x'te 'default' (5.18+ 'medium' alias eklendi). */
export type SpinSize = "small" | "default" | "large";

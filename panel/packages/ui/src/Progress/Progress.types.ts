import type { ComponentProps } from "react";
import type { Progress as AntProgress } from "antd";

/** Progress component props (AntD 5.7 baseline). */
export type ProgressProps = ComponentProps<typeof AntProgress>;

/** Progress type. */
export type ProgressType = "line" | "circle" | "dashboard";

/** Progress status. */
export type ProgressStatus = "success" | "exception" | "normal" | "active";

/** Stroke linecap. */
export type ProgressStrokeLinecap = "round" | "butt" | "square";

/** Dashboard gap position. */
export type ProgressGapPosition = "top" | "bottom" | "left" | "right";

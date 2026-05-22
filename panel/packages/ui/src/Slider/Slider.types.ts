import type { ComponentProps, ReactNode } from "react";
import type { Slider as AntSlider } from "antd";

/** Tooltip prop'unun config objesi (4.23+). */
export interface SliderTooltipConfig {
  /** Tooltip görünsün mü (her zaman/never/auto). */
  open?: boolean;
  /** Tooltip yerleşimi. */
  placement?:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  /** Değeri custom render — null dönerse tooltip gizlenir. */
  formatter?: ((value?: number) => ReactNode) | null;
  /** Tooltip portal container. */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
}

/** ServiceCore Slider — AntD Slider 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue, min, max, step, range (boolean only),
 *   vertical, disabled, marks, dots, included, reverse,
 *   keyboard (5.2+), tooltip (config object — 4.23+),
 *   onChange, onAfterChange (deprecated 4.23) / onChangeComplete (4.23+)
 *
 * 5.7'de YOK:
 *   range object form `{ draggableTrack, editable, minCount, maxCount }` (5.20+),
 *   tooltip.autoAdjustOverflow (5.8+),
 *   classNames/styles semantic DOM (6.0+).
 */
export type SliderProps = ComponentProps<typeof AntSlider>;

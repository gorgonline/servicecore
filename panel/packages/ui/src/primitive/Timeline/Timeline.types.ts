import type { ComponentProps, ReactNode } from "react";
import type { Timeline as AntTimeline } from "antd";

/** Mode — item'ların yerleşimi. */
export type TimelineMode = "left" | "alternate" | "right";

/** Color — dot rengi. Preset değerler veya hex. */
export type TimelineItemColor =
  | "blue"
  | "red"
  | "green"
  | "gray"
  | string;

/** Item position — alternate mode'da hangi tarafta. */
export type TimelineItemPosition = "left" | "right";

/** Timeline item — items dizisinin bir kaydı (5.2+ modern API). */
export interface TimelineItemConfig {
  /** İçerik (sağdaki metin). */
  children?: ReactNode;
  /** Label (soldaki timestamp veya meta). */
  label?: ReactNode;
  /** Custom dot icon (Carbon icon). Default: küçük accent daire. */
  dot?: ReactNode;
  /** Dot rengi. */
  color?: TimelineItemColor;
  /** Alternate mode'da position. */
  position?: TimelineItemPosition;
  /** Key — list rendering için. */
  key?: string | number;
}

/** ServiceCore Timeline — AntD Timeline 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   items (5.2+), pending (boolean | ReactNode), pendingDot,
 *   reverse, mode ('left' | 'alternate' | 'right'),
 *   Timeline.Item children pattern (legacy, deprecated ama çalışır)
 *
 * 5.7'de YOK:
 *   orientation='horizontal' (6.0+),
 *   variant ('filled'/'outlined' — 6.0+),
 *   item field rename: title/icon/placement → 5.7'de label/dot/position,
 *   titleSpan (6.0+),
 *   classNames/styles semantic DOM (6.0+).
 */
export type TimelineProps = ComponentProps<typeof AntTimeline>;

/** Legacy Timeline.Item — children pattern. items prop tercih edilir. */
export type TimelineItemProps = ComponentProps<typeof AntTimeline.Item>;

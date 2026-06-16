import { Timeline as AntTimeline } from "antd";
import clsx from "clsx";
import styles from "./Timeline.module.css";
import type {
  TimelineProps,
  TimelineItemProps,
} from "./Timeline.types";

/** ServiceCore Timeline — AntD Timeline wrap.
 *
 * Dikey aktivite timeline. Ticket activity log (açıldı → atandı → çözüldü),
 * change request workflow, deployment history, audit trail, incident timeline.
 *
 * AntD API'sini 1:1 korur. Modern <code>items</code> prop (5.2+) tercih edilir;{" "}
 * <code>Timeline.Item</code> children pattern hâlâ destekli.
 *
 * @example items API (5.7'de mevcut)
 * ```tsx
 * <Timeline
 *   items={[
 *     { label: "12:14", children: "Bilet açıldı" },
 *     { label: "12:30", children: "Mehmet K. atandı", color: "green" },
 *     { label: "14:42", children: "Çözüldü", dot: <CheckmarkOutline /> },
 *   ]}
 * />
 * ```
 *
 * @example mode="alternate"
 * ```tsx
 * <Timeline mode="alternate" items={steps} />
 * ```
 *
 * @example Pending (loading sonu)
 * ```tsx
 * <Timeline pending="Bekleniyor..." items={items} />
 * ```
 */
function TimelineRoot({ className, ...rest }: TimelineProps) {
  return (
    <AntTimeline {...rest} className={clsx(styles.timeline, className)} />
  );
}

/** Legacy Timeline.Item — children pattern. items prop tercih edilir. */
function TimelineItem(props: TimelineItemProps) {
  return <AntTimeline.Item {...props} />;
}

TimelineRoot.Item = TimelineItem;

export const Timeline = TimelineRoot;

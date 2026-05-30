import { Segmented as AntSegmented } from "antd";
import clsx from "clsx";
import styles from "./Segmented.module.css";
import type { SegmentedProps } from "./Segmented.types";

/** ServiceCore Segmented — AntD Segmented wrap.
 *
 * Segmented control — Radio.Group button mode'una benzer ama daha sade ve
 * animated. View switcher (List/Grid/Calendar), priority filter (P1/P2/P3/P4),
 * time range (Bugün/Bu hafta/Bu ay), status filter.
 *
 * AntD API'sini 1:1 korur. 4.20+'dan beri var.
 *
 * @example Basic
 * ```tsx
 * <Segmented options={["Liste", "Kanban", "Takvim"]} defaultValue="Liste" />
 * ```
 *
 * @example Object options + icon
 * ```tsx
 * <Segmented
 *   options={[
 *     { label: "Liste", value: "list", icon: <List /> },
 *     { label: "Kanban", value: "kanban", icon: <Grid /> },
 *   ]}
 * />
 * ```
 *
 * @example Block (full width)
 * ```tsx
 * <Segmented block options={tabs} />
 * ```
 */
export function Segmented({ className, ...rest }: SegmentedProps) {
  return (
    <AntSegmented
      {...rest}
      className={clsx(styles.segmented, className)}
    />
  );
}

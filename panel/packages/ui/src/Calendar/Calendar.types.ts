import type { ComponentProps } from "react";
import type { Calendar as AntCalendar } from "antd";

/** Calendar mode — aylık veya yıllık görünüm. */
export type CalendarMode = "month" | "year";

/** ServiceCore Calendar — AntD Calendar 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue, mode, fullscreen, validRange, disabledDate,
 *   cellRender (5.4+), fullCellRender (5.4+),
 *   headerRender, locale,
 *   onChange, onPanelChange, onSelect
 *
 * Deprecated ama çalışır: dateCellRender, dateFullCellRender,
 *   monthCellRender, monthFullCellRender (5.4'ten önce). cellRender/
 *   fullCellRender tercih edilir.
 *
 * 5.7'de YOK:
 *   showWeek (5.23+), classNames/styles semantic DOM (modern variant 6.0+).
 */
export type CalendarProps = ComponentProps<typeof AntCalendar>;

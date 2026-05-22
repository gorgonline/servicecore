import { Calendar as AntCalendar } from "antd";
import clsx from "clsx";
import styles from "./Calendar.module.css";
import type { CalendarProps } from "./Calendar.types";

/** ServiceCore Calendar — AntD Calendar wrap.
 *
 * Aylık/yıllık takvim görünümü. Maintenance schedule, change request
 * calendar, shift planning, sertifika expiry görünümü, incident overview.
 * DatePicker tek tarih seçimi içindir — Calendar standalone tam ekran/
 * widget alanı.
 *
 * AntD API'sini 1:1 korur.
 *
 * @example Fullscreen (sayfa içi)
 * ```tsx
 * <Calendar
 *   cellRender={(date) => <EventBadges events={eventsFor(date)} />}
 *   onSelect={(d) => openDayDetail(d)}
 * />
 * ```
 *
 * @example Compact (widget)
 * ```tsx
 * <Calendar fullscreen={false} value={date} onChange={setDate} />
 * ```
 */
export function Calendar({ className, ...rest }: CalendarProps) {
  return (
    <AntCalendar {...rest} className={clsx(styles.calendar, className)} />
  );
}

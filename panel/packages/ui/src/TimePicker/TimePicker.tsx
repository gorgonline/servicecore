import { TimePicker as AntTimePicker } from "antd";
import clsx from "clsx";
import styles from "./TimePicker.module.css";
import type {
  TimePickerProps,
  TimePickerRangeProps,
} from "./TimePicker.types";

/** ServiceCore TimePicker — AntD TimePicker wrap.
 *
 * Sadece saat seçimi. Maintenance pencere saati, çalışma saatleri,
 * SLA target time, notification quiet hours. Tarih+saat birlikte
 * isteniyorsa DatePicker'a showTime ver, TimePicker tek başına saat için.
 *
 * AntD API'sini 1:1 korur. Türkçe locale playground/providers'ta global
 * (dayjs.locale("tr") + ConfigProvider locale={trTR}).
 *
 * @example Temel
 * ```tsx
 * <TimePicker placeholder="Saat seç" onChange={(t, s) => setTime(s)} />
 * ```
 *
 * @example 15dk adımlarla, sadece HH:mm
 * ```tsx
 * <TimePicker format="HH:mm" minuteStep={15} />
 * ```
 *
 * @example Range — çalışma saatleri
 * ```tsx
 * <TimePicker.RangePicker
 *   format="HH:mm"
 *   placeholder={["Başlangıç", "Bitiş"]}
 * />
 * ```
 */
function TimePickerRoot({ className, popupClassName, ...rest }: TimePickerProps) {
  return (
    <AntTimePicker
      {...rest}
      className={clsx(styles.picker, className)}
      popupClassName={clsx(styles.popup, popupClassName)}
    />
  );
}

/** Saat aralığı seçici — TimePicker.RangePicker wrap. */
function TimePickerRange({
  className,
  popupClassName,
  ...rest
}: TimePickerRangeProps) {
  return (
    <AntTimePicker.RangePicker
      {...rest}
      className={clsx(styles.picker, className)}
      popupClassName={clsx(styles.popup, popupClassName)}
    />
  );
}

TimePickerRoot.RangePicker = TimePickerRange;

export const TimePicker = TimePickerRoot;

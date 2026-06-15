import { DatePicker as AntDatePicker } from "antd";
import {
  Calendar,
  Close,
  ChevronLeft,
  ChevronRight,
  PageFirst,
  PageLast,
} from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./DatePicker.module.css";
import type {
  DatePickerProps,
  DatePickerRangeProps,
} from "./DatePicker.types";

/** ServiceCore DatePicker — AntD DatePicker wrap.
 *
 * SLA tarihleri, filtre tarih aralığı, change request uygulama penceresi,
 * raporlama dönem seçimi — ITSM panelinin standart tarih input'u.
 *
 * AntD 5.7 baseline ile birebir uyumlu. picker prop'u ile date/week/month/
 * quarter/year arasında geçiş yapılabilir.
 *
 * Date library: dayjs. Türkçe locale playground/providers'ta global olarak
 * ayarlı (dayjs.locale("tr") + ConfigProvider locale={trTR}). Backend ekibinin
 * kendi app entry'sinde aynı setup'ı yapması gerek.
 *
 * @example Tek tarih
 * ```tsx
 * <DatePicker
 *   placeholder="Tarih seç"
 *   onChange={(d, s) => setDate(s)}
 * />
 * ```
 *
 * @example Tarih + saat
 * ```tsx
 * <DatePicker
 *   showTime={{ format: "HH:mm" }}
 *   format="YYYY-MM-DD HH:mm"
 *   placeholder="SLA tarihi"
 * />
 * ```
 *
 * @example Aralık
 * ```tsx
 * <DatePicker.RangePicker
 *   placeholder={["Başlangıç", "Bitiş"]}
 *   onChange={([s, e]) => setRange([s, e])}
 * />
 * ```
 */
function DatePickerRoot({
  className,
  popupClassName,
  // AntD default glyph'leri (CalendarOutlined / CloseCircleFilled / CSS-span ok)
  // yerine Carbon. Consumer null/false verirse gizleme korunsun → === undefined.
  // suffix'te gizleme semantiği yok → ?? yeterli (Select pattern'i ile aynı).
  suffixIcon,
  clearIcon,
  prevIcon,
  nextIcon,
  superPrevIcon,
  superNextIcon,
  ...rest
}: DatePickerProps) {
  return (
    <AntDatePicker
      {...rest}
      suffixIcon={suffixIcon ?? <Calendar />}
      clearIcon={clearIcon === undefined ? <Close /> : clearIcon}
      prevIcon={prevIcon === undefined ? <ChevronLeft /> : prevIcon}
      nextIcon={nextIcon === undefined ? <ChevronRight /> : nextIcon}
      superPrevIcon={superPrevIcon === undefined ? <PageFirst /> : superPrevIcon}
      superNextIcon={superNextIcon === undefined ? <PageLast /> : superNextIcon}
      className={clsx(styles.picker, className)}
      popupClassName={clsx(styles.popup, popupClassName)}
    />
  );
}

/** Tarih aralığı seçici — AntD DatePicker.RangePicker wrap.
 *
 * Filter sidebar'da "tarih aralığı", raporlama döneminde "şu tarihten şu
 * tarihe", change request uygulama penceresinde "başlangıç → bitiş" için.
 *
 * @example Hazır preset'lerle
 * ```tsx
 * <DatePicker.RangePicker
 *   presets={[
 *     { label: "Son 7 gün",  value: [dayjs().subtract(7, "d"),  dayjs()] },
 *     { label: "Son 30 gün", value: [dayjs().subtract(30, "d"), dayjs()] },
 *   ]}
 * />
 * ```
 */
function DatePickerRange({
  className,
  popupClassName,
  // RangePicker da tek picker ile aynı ikon prop'larını alır (AntD 5.7 source).
  suffixIcon,
  clearIcon,
  prevIcon,
  nextIcon,
  superPrevIcon,
  superNextIcon,
  ...rest
}: DatePickerRangeProps) {
  return (
    <AntDatePicker.RangePicker
      {...rest}
      suffixIcon={suffixIcon ?? <Calendar />}
      clearIcon={clearIcon === undefined ? <Close /> : clearIcon}
      prevIcon={prevIcon === undefined ? <ChevronLeft /> : prevIcon}
      nextIcon={nextIcon === undefined ? <ChevronRight /> : nextIcon}
      superPrevIcon={superPrevIcon === undefined ? <PageFirst /> : superPrevIcon}
      superNextIcon={superNextIcon === undefined ? <PageLast /> : superNextIcon}
      className={clsx(styles.picker, className)}
      popupClassName={clsx(styles.popup, popupClassName)}
    />
  );
}

DatePickerRoot.RangePicker = DatePickerRange;

export const DatePicker = DatePickerRoot;

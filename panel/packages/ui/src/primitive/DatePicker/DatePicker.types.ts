import type { ComponentProps, ReactNode } from "react";
import type { DatePicker as AntDatePicker } from "antd";
import type { Dayjs } from "dayjs";

/** Picker tipi — AntD `picker` prop'u. Default: "date". */
export type DatePickerType = "date" | "week" | "month" | "quarter" | "year";

/** Boyut — Input/Button ile aynı. */
export type DatePickerSize = "small" | "middle" | "large";

/** Validation durumu. Form context'inden de türeyebilir. */
export type DatePickerStatus = "error" | "warning";

/** Picker panel mode'u — header yıl/ay navigasyonunu kontrol eder. */
export type DatePickerMode = "date" | "month" | "year" | "decade" | "time";

/** Quick-select preset — panel altında hızlı seçim chip'leri olarak görünür. */
export interface DatePickerPreset {
  /** Görünen etiket. */
  label: ReactNode;
  /** Dayjs instance veya factory function (lazy hesaplama için). */
  value: Dayjs | (() => Dayjs);
}

/** RangePicker presets — start/end tuple. */
export interface DatePickerRangePreset {
  label: ReactNode;
  value: [Dayjs, Dayjs] | (() => [Dayjs, Dayjs]);
}

/** ServiceCore DatePicker — AntD DatePicker 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue, format, picker, showTime, showNow, disabled,
 *   disabledDate, disabledTime, size, status, open, defaultOpen, mode,
 *   placement, getPopupContainer, inputReadOnly, allowClear (boolean),
 *   cellRender (5.4+), panelRender, renderExtraFooter, presets,
 *   placeholder, popupClassName (4.23+), className (5.7+), style (5.7+),
 *   onChange, onOk, onOpenChange, onPanelChange
 *
 * 5.7'de YOK:
 *   multiple (5.14+), minDate/maxDate (5.14+) → disabledDate ile yap,
 *   pickerValue/defaultPickerValue (5.14+), preserveInvalidOnBlur (5.14+),
 *   needConfirm (5.14+), order (5.14+), components (5.14+),
 *   variant (5.13+), prefix (5.22+), allowClear object (5.8+),
 *   classNames/styles semantic DOM (6.0+).
 *
 * NOT: AntD'nin `DatePickerProps`'ı generic union (picker tipine göre değişir),
 * `interface extends` ile genişletilemez. `ComponentProps` ile normalize edip
 * intersection ile genişletiyoruz.
 */
export type DatePickerProps = ComponentProps<typeof AntDatePicker> & {
  /** Popup panel'in root class'ı — wrap'ın CSS module scope'una almak için.
   *  5.7 runtime'da çalışır; TypeScript public type'larından çıkartılmıştır. */
  popupClassName?: string;
};

/** ServiceCore RangePicker — AntD DatePicker.RangePicker 1:1 props. */
export type DatePickerRangeProps = ComponentProps<
  typeof AntDatePicker.RangePicker
> & {
  popupClassName?: string;
};

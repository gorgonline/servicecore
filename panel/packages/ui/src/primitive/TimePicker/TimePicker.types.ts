import type { ComponentProps } from "react";
import type { TimePicker as AntTimePicker } from "antd";

/** Boyut — Input/DatePicker ile uyumlu. */
export type TimePickerSize = "small" | "middle" | "large";

/** Validation durumu. Form context'inden de türeyebilir. */
export type TimePickerStatus = "error" | "warning";

/** Picker yerleşimi. */
export type TimePickerPlacement =
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight";

/** ServiceCore TimePicker — AntD TimePicker 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue (dayjs), format, use12Hours, showNow (4.4+),
 *   hourStep, minuteStep, secondStep, disabled, disabledTime (4.19+),
 *   hideDisabledOptions, size, status (4.19+), placement, placeholder,
 *   allowClear (boolean only), inputReadOnly, cellRender (5.4+),
 *   popupClassName (4.23+), onChange, onOpenChange
 *
 * 5.7'de YOK:
 *   allowClear object form `{ clearIcon }` (5.8+),
 *   variant (5.13+), needConfirm (5.14+), changeOnScroll (5.14+),
 *   prefix (5.22+), classNames/styles semantic DOM (6.0+).
 *
 * NOT: popupClassName 5.7 runtime'da çalışıyor ama TS public type'ından
 * çıkartılmıştır; biz intersection ile geri ekledik.
 */
export type TimePickerProps = ComponentProps<typeof AntTimePicker> & {
  /** Popup panel için root class. CSS module scope'u için. */
  popupClassName?: string;
};

/** TimePicker.RangePicker — DatePicker RangePicker'a benzer, saat odaklı. */
export type TimePickerRangeProps = ComponentProps<
  typeof AntTimePicker.RangePicker
> & {
  popupClassName?: string;
};

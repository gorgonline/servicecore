import type { ComponentProps, ReactNode } from "react";
import type { Segmented as AntSegmented } from "antd";

/** Boyut — Input/Button ile uyumlu. */
export type SegmentedSize = "small" | "middle" | "large";

/** Segmented option — options dizisinin item tipi. */
export interface SegmentedOption {
  /** Görünen etiket. */
  label: ReactNode;
  /** Form value (string | number). */
  value: string | number;
  /** Sol tarafta icon (Carbon icon). */
  icon?: ReactNode;
  /** Bu seçeneği devre dışı bırak. */
  disabled?: boolean;
  /** Option için ek class. */
  className?: string;
}

/** ServiceCore Segmented — AntD Segmented 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar (4.20'dan beri):
 *   options (string[] | number[] | SegmentedOption[]),
 *   defaultValue, value, block (full width), disabled, onChange,
 *   size (small/middle/large), name
 *
 * 5.7'de YOK:
 *   vertical (5.21+), shape='round' (5.24+),
 *   classNames/styles semantic DOM (6.0+).
 */
export type SegmentedProps = ComponentProps<typeof AntSegmented>;

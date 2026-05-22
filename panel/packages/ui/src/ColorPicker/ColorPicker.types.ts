import type { ReactNode } from "react";
import type { ColorPickerProps as AntColorPickerProps } from "antd";

/** Renk formatı — picker hangi notasyonda gösterecek. AntD 5.7'de hepsi var. */
export type ColorFormat = "hex" | "hsb" | "rgb";

/** Trigger button boyutu (5.7+). */
export type ColorPickerSize = "small" | "middle" | "large";

/** Panel hangi etkileşimle açılır. */
export type ColorPickerTrigger = "hover" | "click";

/** Preset color grubu — picker panel'inin alt kısmında çıkan hazır renkler. */
export interface ColorPickerPreset {
  /** Grup etiketi (örn. "Marka", "Durum", "Kategori"). */
  label: ReactNode;
  /** Hazır renk listesi. Hex veya rgb/hsb string. */
  colors: string[];
  /** Grup default açık başlasın mı (collapse içinde). */
  defaultOpen?: boolean;
  /** React key. */
  key?: React.Key;
}

/** AntD ColorPicker 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   value, defaultValue, format, onChange, onChangeComplete (5.7),
 *   onFormatChange, onClear (5.6), allowClear, disabled, arrow, trigger,
 *   open, onOpenChange, placement, children, showText (5.7), size (5.7),
 *   presets, panelRender (5.7), classNames, styles
 *
 * 5.7'de YOK:
 *   defaultFormat (5.9+), disabledAlpha (5.8+), disabledFormat (5.22+),
 *   mode='gradient' (5.20+), destroyOnHidden (5.25+)
 */
export type ColorPickerProps = AntColorPickerProps;

import type { ComponentProps } from "react";
import type { Descriptions as AntDescriptions } from "antd";

/** Layout — horizontal (label solda) veya vertical (label üstte). */
export type DescriptionsLayout = "horizontal" | "vertical";

/** Boyut. */
export type DescriptionsSize = "default" | "middle" | "small";

/** Column — sayı veya responsive breakpoint object.
 *  Örn: { xs: 1, sm: 2, md: 3, lg: 4 } */
export type DescriptionsColumn =
  | number
  | {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
    };

/** ServiceCore Descriptions — AntD Descriptions 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   bordered, colon, column (number | responsive object), extra (4.5+),
 *   layout (horizontal/vertical), size (default/middle/small),
 *   title, contentStyle, labelStyle (item bazında da),
 *   Descriptions.Item children pattern
 *
 * 5.7'de YOK:
 *   items prop (5.8+) — children pattern (<Descriptions.Item>) zorunlu,
 *   span="filled" (5.22+) — sayı değer kullan,
 *   classNames/styles semantic DOM (modern variant 6.0+).
 */
export type DescriptionsProps = ComponentProps<typeof AntDescriptions>;

/** Descriptions.Item — children pattern (5.7'de tek seçenek).
 *
 * span: kaç kolon kaplayacağı (default 1). 5.22+'da "filled" eklendi
 * (yatay tamamını doldur), 5.7'de sayı kullan. */
export type DescriptionsItemProps = ComponentProps<typeof AntDescriptions.Item>;

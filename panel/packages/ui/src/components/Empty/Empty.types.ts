import type { ComponentProps } from "react";
import type { Empty as AntEmpty } from "antd";

/** ServiceCore Empty — AntD Empty 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   description (ReactNode | false), image (ReactNode | URL string),
 *   imageStyle, children (footer/action area),
 *   Empty.PRESENTED_IMAGE_DEFAULT, Empty.PRESENTED_IMAGE_SIMPLE
 *
 * 5.7'de YOK:
 *   classNames/styles semantic DOM (5.23+),
 *   styles (modern variant 6.0+).
 */
export type EmptyProps = ComponentProps<typeof AntEmpty>;

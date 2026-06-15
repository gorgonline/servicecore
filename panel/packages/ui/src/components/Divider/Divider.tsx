import { Divider as AntDivider } from "antd";
import type { DividerProps as AntDividerProps } from "antd";
import clsx from "clsx";
import styles from "./Divider.module.css";

export type DividerOrientation = "left" | "right" | "center";
export type DividerType = "horizontal" | "vertical";

export interface DividerProps extends AntDividerProps {
  /** Başlık (children) hizası — sadece horizontal'da. Default: "center" */
  orientation?: DividerOrientation;
  /** Yön. Default: "horizontal" */
  type?: DividerType;
  /** Kesik çizgi */
  dashed?: boolean;
  /** Başlık plain text gibi (heading olmadan) */
  plain?: boolean;
}

/** ServiceCore Divider — AntD Divider wrap.
 *
 * AntD API'sini 1:1 korur (orientation, type, dashed, plain, children).
 * Tek katkı: ServiceCore border rengi (bg-muted body'de görünür).
 */
export function Divider({ className, ...rest }: DividerProps) {
  return <AntDivider {...rest} className={clsx(styles.divider, className)} />;
}

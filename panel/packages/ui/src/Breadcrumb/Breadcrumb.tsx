import { Breadcrumb as AntBreadcrumb } from "antd";
import type { BreadcrumbProps as AntBreadcrumbProps } from "antd";
import { ChevronRight } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps extends AntBreadcrumbProps {}

/** ServiceCore Breadcrumb — AntD Breadcrumb wrap.
 *
 * Sayfa içinde konum göstergesi: "Ana sayfa › Panolar › IKD PANO".
 * 3+ seviye hiyerarşi olan sayfalarda kullan.
 *
 * AntD API'sini 1:1 korur (items, separator, itemRender, params).
 * Default separator: Carbon ChevronRight (AntD'nin "/" karakteri yerine).
 *
 * NOT: AntD `routes` prop'u 5.3+ deprecated — `items` kullan.
 * `Breadcrumb.Item` children API'sı da deprecated — `items` tercih edilir.
 */
export function Breadcrumb({ separator, className, ...rest }: BreadcrumbProps) {
  return (
    <AntBreadcrumb
      {...rest}
      separator={separator ?? <ChevronRight />}
      className={clsx(styles.breadcrumb, className)}
    />
  );
}

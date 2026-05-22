import { Rate as AntRate } from "antd";
import clsx from "clsx";
import styles from "./Rate.module.css";
import type { RateProps } from "./Rate.types";

/** ServiceCore Rate — AntD Rate wrap.
 *
 * 5-yıldız rating. Bilet çözümü sonrası CSAT, KB makalesi "yararlı oldu mu",
 * hizmet/ürün rating. Yıldız rengi ServiceCore accent (mavi) — istenirse
 * `character` ile sarı/custom icon override edilebilir.
 *
 * AntD API'sini 1:1 korur.
 *
 * @example Basit
 * ```tsx
 * <Rate defaultValue={4} />
 * ```
 *
 * @example Yarım yıldız + tooltip
 * ```tsx
 * <Rate
 *   allowHalf
 *   tooltips={["Çok kötü", "Kötü", "Orta", "İyi", "Mükemmel"]}
 *   onChange={(v) => trackCSAT(v)}
 * />
 * ```
 *
 * @example Read-only (skor gösterme)
 * ```tsx
 * <Rate disabled value={4.5} allowHalf />
 * ```
 */
export function Rate({ className, ...rest }: RateProps) {
  return <AntRate {...rest} className={clsx(styles.rate, className)} />;
}

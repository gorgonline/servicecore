import { Progress as AntProgress } from "antd";
import clsx from "clsx";
import type { ProgressProps } from "./Progress.types";
import styles from "./Progress.module.css";

/** ServiceCore Progress — line / circle / dashboard ilerleme göstergesi.
 *
 * <strong>Ne için:</strong> Bilinen yüzdeli ilerleme (file upload %47,
 * sprint tamamlama %72, disk kullanımı %85, SLA kalan %30).
 *
 * <strong>Progress vs Spin vs Skeleton:</strong>
 *   • <strong>Progress:</strong> Yüzde biliniyor (determinate).
 *   • <strong>Spin:</strong> Süre belirsiz (indeterminate) — "yükleniyor...".
 *   • <strong>Skeleton:</strong> İçerik gelene kadar şeklini göster.
 *
 * <strong>Type seçimi:</strong>
 *   • <code>line</code>: Form alanı altı, upload bar, sequential steps.
 *   • <code>circle</code>: KPI kart, sprint completion, asset health.
 *   • <code>dashboard</code>: Gauge — SLA kalan, capacity (gap altta açık).
 *
 * <strong>5.7 baseline:</strong>
 *   • <code>steps</code> (number) line + circle/dashboard.
 *   • <code>size</code>: <code>'small'</code> veya <code>number</code> (tuple
 *     5.18+ — kullanma).
 *   • <code>success</code> obj — multi-segment (yeşil dolu kısım).
 *   • <code>strokeColor</code> string / gradient obj
 *     <code>{`{ '0%': '#fff', '100%': '#000' }`}</code> / steps için array.
 *   • <code>percentPosition</code> (5.18+) yok.
 *   • <code>classNames</code>/<code>styles</code> semantic DOM (5.18+) yok.
 *
 * @example File upload (line + active)
 * ```tsx
 * <Progress type="line" percent={47} status="active" />
 * ```
 *
 * @example Sprint completion (circle)
 * ```tsx
 * <Progress type="circle" percent={72} size={120} />
 * ```
 *
 * @example SLA kalan (dashboard gauge)
 * ```tsx
 * <Progress
 *   type="dashboard"
 *   percent={30}
 *   gapDegree={90}
 *   gapPosition="bottom"
 *   format={(p) => `${p}%\nkalan`}
 * />
 * ```
 *
 * @example Disk kullanımı (exception eşiği)
 * ```tsx
 * <Progress
 *   type="circle"
 *   percent={85}
 *   status={percent >= 80 ? "exception" : "normal"}
 *   format={(p) => `${p}%`}
 * />
 * ```
 *
 * @example Multi-segment (success içinde danger)
 * ```tsx
 * <Progress percent={60} success={{ percent: 30 }} />
 * ```
 *
 * @example Steps (segmented line)
 * ```tsx
 * <Progress percent={60} steps={5} />
 * ```
 */
export function Progress(props: ProgressProps) {
  const { className, ...rest } = props;
  return <AntProgress {...rest} className={clsx(styles.progress, className)} />;
}

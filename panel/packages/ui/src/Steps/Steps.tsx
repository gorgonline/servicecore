import { Steps as AntSteps } from "antd";
import clsx from "clsx";
import styles from "./Steps.module.css";
import type { StepsProps } from "./Steps.types";

/** ServiceCore Steps — AntD Steps wrap.
 *
 * Wizard, yaşam döngüsü, onay akışı, multi-step form için kullanılır.
 *
 * AntD API'sini 1:1 korur (current, initial, status, direction, type, size,
 * labelPlacement, progressDot, responsive, percent, onChange, items).
 *
 * Hem `items` prop'u (modern API) hem de `<Steps.Step>` children pattern'i
 * desteklenir. ServiceCore'da `items` prefer edilir.
 *
 * @example
 * ```tsx
 * <Steps
 *   current={1}
 *   items={[
 *     { title: "Açıldı", description: "12:14" },
 *     { title: "Atandı", description: "Mehmet K." },
 *     { title: "Çözüldü" },
 *   ]}
 * />
 * ```
 */
export function Steps({ className, ...rest }: StepsProps) {
  return <AntSteps {...rest} className={clsx(styles.steps, className)} />;
}

/** Children-based pattern için Step bileşeni — AntD'nin orijinali.
 *
 * @example
 * ```tsx
 * <Steps current={1}>
 *   <Steps.Step title="Açıldı" />
 *   <Steps.Step title="Atandı" />
 * </Steps>
 * ```
 */
Steps.Step = AntSteps.Step;

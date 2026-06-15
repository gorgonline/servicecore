import { Steps as AntSteps } from "antd";
import type { StepsProps as AntStepsProps } from "antd";
import { Checkmark, Close } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Steps.module.css";
import type { StepsIcons, StepsProps } from "./Steps.types";

/** finish/error durum ikonlarının Carbon varsayılanı.
 *
 * AntD 5.7, finish=CheckOutlined / error=CloseOutlined glyph'lerini sabit kodlar ve
 * RcSteps'e `icons` prop'uyla geçer (es/steps/index.js: createElement(RcSteps,
 * Object.assign({ icons }, restProps, ...))). `restProps` sonra spread edildiği için
 * wrap'ten gelen `icons` AntD varsayılanını ezer. rc-steps (Step.js) `icons.finish`'i
 * yalnızca status==='finish', `icons.error`'ı yalnızca status==='error' iken
 * `<span class="ant-steps-icon">` içine basar — yani status-bazlı, semantik korunur.
 * wait/process numaraları ve per-item `icon` etkilenmez.
 *
 * Carbon ikonu `.ant-steps-icon` içine düştüğü için renk (finish=accent, error=danger)
 * ve svg boyutu Steps.module.css'teki mevcut kurallarca verilir; ayrı module class
 * gerekmez (Carbon fill=currentColor → `color` çalışır). */
const FINISH_ICON = <Checkmark />;
const ERROR_ICON = <Close />;

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
export function Steps({ className, icons, ...rest }: StepsProps) {
  // Per-side override: undefined → Carbon varsayılan, açık değer (null/false dahil) → saygı.
  // ?? KULLANMA — null ile "ikonu gizle" niyetini korumak için === undefined kontrolü.
  const mergedIcons: StepsIcons = {
    finish: icons?.finish === undefined ? FINISH_ICON : icons.finish,
    error: icons?.error === undefined ? ERROR_ICON : icons.error,
  };

  // `icons`, rc-steps'in gerçek prop'u olup AntD 5.7 .d.ts'inde tipli değil ama runtime'da
  // restProps üzerinden forward edilir. Honest tip: AntD props + icons passthrough.
  const antProps: AntStepsProps & { icons: StepsIcons } = {
    ...rest,
    icons: mergedIcons,
    className: clsx(styles.steps, className),
  };

  return <AntSteps {...antProps} />;
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

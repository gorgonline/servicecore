import { Spin as AntSpin } from "antd";
import clsx from "clsx";
import type { SpinProps } from "./Spin.types";
import styles from "./Spin.module.css";

/** ServiceCore Spin — süre belirsiz loading göstergesi.
 *
 * <strong>Ne için:</strong> İşlem ne kadar süreceği belli değil — save
 * butonu loading, async fetch overlay, section refresh.
 *
 * <strong>Spin vs Skeleton vs Progress:</strong>
 *   • <strong>Spin:</strong> Süre belirsiz (indeterminate). Tek nokta,
 *     overlay veya inline.
 *   • <strong>Skeleton:</strong> İçeriğin yapısı belli — shape'i göster.
 *     Layout shift sıfır.
 *   • <strong>Progress:</strong> Yüzdeli — file upload %47, sprint %72.
 *
 * <strong>Kullanım kalıpları:</strong>
 *   1. <strong>Inline:</strong> <code>{`<Spin />`}</code> — tek başına spinner.
 *   2. <strong>Wrapper:</strong> <code>{`<Spin spinning={loading}>...</Spin>`}</code> —
 *      children'ı overlay'le maske. AntD container'a opacity uygular,
 *      ortaya spinner yerleştirir.
 *   3. <strong>Button loading:</strong>{" "}
 *      <code>{`<Button loading>...</Button>`}</code> (Spin değil, native).
 *
 * <strong>5.7 baseline:</strong>
 *   • <code>spinning</code>, <code>size</code> (small/default/large),
 *     <code>delay</code> (ms — flicker önleme), <code>indicator</code>{" "}
 *     (custom), <code>tip</code> (alt metin),{" "}
 *     <code>wrapperClassName</code>, static{" "}
 *     <code>Spin.setDefaultIndicator</code>.
 *   • <code>fullscreen</code> (5.11+) yok — manuel overlay yap.
 *   • <code>percent</code> (5.18+) yok — Progress kullan.
 *   • <code>description</code> (6.3+) yok — <code>tip</code> kullan.
 *   • <code>classNames</code>/<code>styles</code> semantic DOM (5.8+) yok.
 *
 * @example Inline spinner
 * ```tsx
 * <Spin />
 * <Spin size="large" />
 * <Spin tip="Yükleniyor..." />
 * ```
 *
 * @example Wrapper — section overlay
 * ```tsx
 * <Spin spinning={isLoading} tip="Veriler güncelleniyor...">
 *   <TicketList tickets={tickets} />
 * </Spin>
 * ```
 *
 * @example Delay — flicker önle (200ms+)
 * ```tsx
 * <Spin spinning={loading} delay={300}>
 *   <Content />
 * </Spin>
 * // 300ms'den önce iş biterse spinner GÖSTERİLMEZ
 * ```
 *
 * @example Custom indicator (Carbon icon)
 * ```tsx
 * import { Renew } from "@carbon/icons-react";
 *
 * <Spin
 *   indicator={
 *     <Renew
 *       size={20}
 *       style={{
 *         animation: "spin 1s linear infinite",
 *         color: "var(--sc-color-accent)",
 *       }}
 *     />
 *   }
 * />
 * ```
 *
 * @example Global default indicator (app entry)
 * ```tsx
 * Spin.setDefaultIndicator(<MyServiceCoreSpinner />);
 * ```
 */
function SpinRoot(props: SpinProps) {
  const { className, wrapperClassName, ...rest } = props;
  return (
    <AntSpin
      {...rest}
      className={clsx(styles.spin, className)}
      wrapperClassName={clsx(styles.wrapper, wrapperClassName)}
    />
  );
}

/** Static method'u attach et — Spin.setDefaultIndicator çalışsın. */
export const Spin = Object.assign(SpinRoot, {
  setDefaultIndicator: AntSpin.setDefaultIndicator,
});

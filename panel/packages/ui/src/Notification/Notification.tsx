import { notification as antNotification } from "antd";
import {
  CheckmarkFilled,
  ErrorFilled,
  InformationFilled,
  WarningAltFilled,
} from "@carbon/icons-react";
import { useMemo } from "react";
import type { ReactElement, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Notification.module.css";

/* ── Carbon ikon enjeksiyonu ───────────────────────────────────────────────
 * notification imperative bir API'dir; AntD her notice'te type'a göre @ant-design/icons
 * glyph'i basar (CheckCircleFilled, ...). Panel Carbon kullandığı için her tipli metodu
 * (success/error/warning/info) + open + useNotification hook'unu sarıp config'e Carbon
 * `icon` enjekte ediyoruz; sonra AntD'nin kendi tipli metoduna delege ediyoruz.
 * Consumer kendi icon'unu verirse korunur.
 * NOT: Custom icon AntD'de `.ant-notification-notice-icon` span'ine sarılır ama type
 * renk class'ı (`-icon-{type}`) EKLENMEZ — bu yüzden renk + boyut doğrudan ikonun
 * module class'ında (Notification.module.css). */

type AntNotification = typeof antNotification;
type NotifTypeMethod = AntNotification["success"];
type OpenMethod = AntNotification["open"];
type NotifConfig = Parameters<NotifTypeMethod>[0];
type OpenConfig = Parameters<OpenMethod>[0];
type NotifReturn = ReturnType<NotifTypeMethod>;
type NotifApi = ReturnType<AntNotification["useNotification"]>[0];

const NOTICE_TYPES = ["success", "error", "warning", "info"] as const;
type NoticeType = (typeof NOTICE_TYPES)[number];

const TYPE_ICON: Record<NoticeType, ReactNode> = {
  success: <CheckmarkFilled className={clsx(styles.icon, styles.iconSuccess)} />,
  error: <ErrorFilled className={clsx(styles.icon, styles.iconError)} />,
  warning: <WarningAltFilled className={clsx(styles.icon, styles.iconWarning)} />,
  info: <InformationFilled className={clsx(styles.icon, styles.iconInfo)} />,
};

function isNoticeType(type: unknown): type is NoticeType {
  return typeof type === "string" && (NOTICE_TYPES as readonly string[]).includes(type);
}

/** Tipli metot (success/error/...) — config'e Carbon icon enjekte edip AntD'ye delege.
 *  Consumer config.icon verirse spread sonrası korunur. */
function wrapTypeMethod(origFn: NotifTypeMethod, type: NoticeType): NotifTypeMethod {
  const icon = TYPE_ICON[type];
  return (config: NotifConfig): NotifReturn => origFn({ icon, ...config });
}

/** open(config) — type'lı çağrıda icon verilmemişse Carbon enjekte. */
function wrapOpen(origOpen: OpenMethod): OpenMethod {
  return (config: OpenConfig): ReturnType<OpenMethod> => {
    if (config && isNoticeType(config.type) && config.icon === undefined) {
      return origOpen({ ...config, icon: TYPE_ICON[config.type] });
    }
    return origOpen(config);
  };
}

/** Bir notification api'sinin (static ya da hook) tüm metotlarını Carbon ile sarar. */
function wrapApi(api: NotifApi): NotifApi {
  return {
    ...api,
    open: wrapOpen(api.open),
    success: wrapTypeMethod(api.success, "success"),
    error: wrapTypeMethod(api.error, "error"),
    warning: wrapTypeMethod(api.warning, "warning"),
    info: wrapTypeMethod(api.info, "info"),
  };
}

/** ServiceCore Notification — AntD notification imperative API + Carbon ikonlar.
 *
 * Bildirim — title + description, opsiyonel action button. Köşede 4.5sn (default)
 * görünür sonra kaybolur.
 *
 * <strong>Component DEĞİL — imperative API.</strong> JSX'te
 * <code>&lt;Notification /&gt;</code> render etmezsin, fonksiyon olarak
 * çağırırsın: <code>notification.success({ message, description })</code>.
 *
 * <strong>useNotification hook tercih edilmeli</strong> — static
 * <code>notification.success()</code> ConfigProvider context'i (locale,
 * theme) okumaz.
 * <code>const [api, ctx] = notification.useNotification()</code> ile yap.
 *
 * <strong>Notification vs Message vs Alert:</strong>
 *   • <strong>Notification:</strong> Title + multi-line description + action
 *     btn. Köşede büyük kart. "Bilet atandı (SC-4127) — Aç butonu".
 *   • <strong>Message:</strong> Tek satır toast — "Kopyalandı", auto-dismiss
 *     3sn.
 *   • <strong>Alert:</strong> Sayfa içi PERSISTENT uyarı — kullanıcı
 *     kapatana kadar kalır.
 *
 * <strong>5.7 baseline:</strong>
 *   • <code>message</code>+<code>description</code> (title 6.0+ — message kullan).
 *   • <code>btn</code> action button (actions 5.24+ — btn kullan).
 *   • <code>closeIcon</code> null/false hiding 5.7+.
 *   • <code>role</code> alert/status 5.6+.
 *   • <code>stack</code> 5.10+ — yok.
 *   • <code>showProgress</code>/<code>pauseOnHover</code> 5.18+ — yok.
 *   • <code>classNames</code>/<code>styles</code> semantic DOM 5.8+ — yok.
 *
 * @example Static (basit)
 * ```tsx
 * notification.success({
 *   message: "Bilet atandı",
 *   description: "SC-4127 sana atandı. Detayı görmek için tıkla.",
 *   placement: "topRight",
 * });
 * ```
 *
 * @example useNotification hook (önerilen — context-aware)
 * ```tsx
 * const [notifApi, contextHolder] = notification.useNotification();
 *
 * return (
 *   <>
 *     {contextHolder}
 *     <Button onClick={() => notifApi.info({ message: "Bilgi", description: "..." })}>
 *       Aç
 *     </Button>
 *   </>
 * );
 * ```
 *
 * @example Action button + persistent
 * ```tsx
 * const key = "sla-warn";
 * notification.warning({
 *   key,
 *   message: "SLA aşımına 2 saat",
 *   description: "SC-4127 P1 — atanmış teknisyene hatırlatma gerek.",
 *   duration: 0,  // manuel kapanır
 *   btn: <Button onClick={() => { remind(); notification.destroy(key); }}>Hatırlat</Button>,
 * });
 * ```
 *
 * @example Global config
 * ```tsx
 * notification.config({
 *   placement: "topRight",
 *   top: 80,        // header altından
 *   duration: 5,
 *   maxCount: 3,    // 3 toast max — fazlası kuyruğa
 * });
 * ```
 */
function useNotification(
  ...args: Parameters<AntNotification["useNotification"]>
): [NotifApi, ReactElement] {
  const [api, holder] = antNotification.useNotification(...args);
  const wrapped = useMemo(() => wrapApi(api), [api]);
  return [wrapped, holder];
}

export const notification: typeof antNotification = Object.assign({}, antNotification, {
  open: wrapOpen(antNotification.open),
  success: wrapTypeMethod(antNotification.success, "success"),
  error: wrapTypeMethod(antNotification.error, "error"),
  warning: wrapTypeMethod(antNotification.warning, "warning"),
  info: wrapTypeMethod(antNotification.info, "info"),
  useNotification,
});

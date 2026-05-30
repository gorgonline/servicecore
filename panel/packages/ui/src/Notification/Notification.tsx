import "./Notification.module.css";

/** ServiceCore Notification — AntD notification imperative API re-export.
 *
 * Bildirim/notification — title + description, opsiyonel action button.
 * Köşede 4.5sn (default) görünür sonra kaybolur.
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
export { notification } from "antd";

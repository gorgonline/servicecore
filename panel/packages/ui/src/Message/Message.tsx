import "./Message.module.css";

/** ServiceCore Message — AntD message imperative API re-export.
 *
 * Toast/snackbar — kısa başarı/hata/info mesajları.
 *
 * <strong>Component DEĞİL — imperative API.</strong> JSX'te
 * <code>&lt;Message /&gt;</code> render etmezsin, fonksiyon olarak çağırırsın:
 * <code>message.success("Kaydedildi")</code>.
 *
 * <strong>useMessage hook tercih edilmeli</strong> — static
 * <code>message.success()</code> ConfigProvider context'i (locale, theme)
 * okumaz. <code>const [api, ctx] = message.useMessage()</code> ile yapı.
 *
 * AntD API'sini 1:1 korur:
 *   message.success / error / warning / info / loading / open
 *   message.config({ top, duration, maxCount })
 *   message.destroy() / destroy(key)
 *   message.useMessage() hook (5.x)
 *
 * @example Static (basit)
 * ```tsx
 * import { message } from "@servicecoreui/ui/wraps";
 *
 * const onSave = async () => {
 *   await api.save();
 *   message.success("Kaydedildi");
 * };
 * ```
 *
 * @example useMessage hook (önerilen — context-aware)
 * ```tsx
 * const [messageApi, contextHolder] = message.useMessage();
 *
 * return (
 *   <>
 *     {contextHolder}
 *     <Button onClick={() => messageApi.success("Tamam")}>Aç</Button>
 *   </>
 * );
 * ```
 *
 * @example Loading → Success flow
 * ```tsx
 * const onUpload = async () => {
 *   const hide = message.loading("Yükleniyor...", 0);
 *   try {
 *     await api.upload();
 *     hide();
 *     message.success("Yüklendi");
 *   } catch (e) {
 *     hide();
 *     message.error("Yükleme hatası");
 *   }
 * };
 * ```
 *
 * @example Global config (app entry'sinde 1 kez)
 * ```tsx
 * message.config({
 *   top: 80,         // header altından
 *   duration: 3,
 *   maxCount: 5,     // 5'ten fazla mesaj kuyruğa
 * });
 * ```
 */
export { message } from "antd";

import { message as antMessage } from "antd";
import {
  CheckmarkFilled,
  ErrorFilled,
  InformationFilled,
  Renew,
  WarningAltFilled,
} from "@carbon/icons-react";
import { isValidElement, useMemo } from "react";
import type { ReactElement, ReactNode } from "react";
import styles from "./Message.module.css";

/* ── Carbon ikon enjeksiyonu ───────────────────────────────────────────────
 * message imperative bir API'dir; AntD her notice'te type'a göre @ant-design/icons
 * glyph'i basar (CheckCircleFilled, LoadingOutlined, ...). Panel Carbon kullandığı
 * için her tipli metodu (success/error/warning/info/loading) + open + useMessage
 * hook'unu sarıp config'e Carbon `icon` enjekte ediyoruz; sonra AntD'nin kendi tipli
 * metoduna delege ediyoruz (type + className'i o yönetir). Consumer kendi icon'unu
 * verirse korunur. Renk Message.module.css'te (.ant-message-{type} > svg); loading
 * için dönen Renew'in spin animasyonu da orada. */

type AntMessage = typeof antMessage;
type TypeMethod = AntMessage["success"];
type OpenMethod = AntMessage["open"];
type JointContent = Parameters<TypeMethod>[0];
type MessageDuration = Parameters<TypeMethod>[1];
type MessageOnClose = Parameters<TypeMethod>[2];
type OpenConfig = Parameters<OpenMethod>[0];
type MessageType = ReturnType<TypeMethod>;
type MessageApi = ReturnType<AntMessage["useMessage"]>[0];

const NOTICE_TYPES = ["success", "error", "warning", "info", "loading"] as const;
type NoticeType = (typeof NOTICE_TYPES)[number];

const TYPE_ICON: Record<NoticeType, ReactNode> = {
  success: <CheckmarkFilled />,
  error: <ErrorFilled />,
  warning: <WarningAltFilled />,
  info: <InformationFilled />,
  loading: <Renew className={styles.loadingSpin} />,
};

function isNoticeType(type: unknown): type is NoticeType {
  return typeof type === "string" && (NOTICE_TYPES as readonly string[]).includes(type);
}

/** İlk arg config objesi mi (ArgsProps) yoksa düz content mi — AntD normalizasyonu ile birebir. */
function isConfig(content: JointContent): content is OpenConfig {
  return (
    content !== null &&
    typeof content === "object" &&
    !isValidElement(content) &&
    "content" in content
  );
}

/** Tipli metot (success/error/...) — config-vs-content normalize edip Carbon icon enjekte,
 *  sonra AntD'nin kendi tipli metoduna delege eder. */
function wrapTypeMethod(origFn: TypeMethod, type: NoticeType): TypeMethod {
  const icon = TYPE_ICON[type];
  return (
    jointContent: JointContent,
    duration?: MessageDuration,
    onClose?: MessageOnClose,
  ): MessageType => {
    if (isConfig(jointContent)) {
      // consumer config — kendi icon'u varsa spread sonrası korunur
      return origFn({ icon, ...jointContent });
    }
    let mergedDuration: number | undefined;
    let mergedOnClose: (() => void) | undefined;
    if (typeof duration === "function") {
      mergedOnClose = duration;
    } else {
      mergedDuration = duration;
      mergedOnClose = onClose;
    }
    return origFn({ icon, content: jointContent, duration: mergedDuration, onClose: mergedOnClose });
  };
}

/** open(config) — type'lı çağrıda icon verilmemişse Carbon enjekte. */
function wrapOpen(origOpen: OpenMethod): OpenMethod {
  return (config: OpenConfig): MessageType => {
    if (config && isNoticeType(config.type) && config.icon === undefined) {
      return origOpen({ ...config, icon: TYPE_ICON[config.type] });
    }
    return origOpen(config);
  };
}

/** Bir message api'sinin (static ya da hook) tüm metotlarını Carbon ile sarar. */
function wrapApi(api: MessageApi): MessageApi {
  return {
    ...api,
    open: wrapOpen(api.open),
    success: wrapTypeMethod(api.success, "success"),
    error: wrapTypeMethod(api.error, "error"),
    warning: wrapTypeMethod(api.warning, "warning"),
    info: wrapTypeMethod(api.info, "info"),
    loading: wrapTypeMethod(api.loading, "loading"),
  };
}

/** ServiceCore Message — AntD message imperative API + Carbon ikonlar.
 *
 * Toast/snackbar — kısa başarı/hata/info mesajları.
 *
 * <strong>Component DEĞİL — imperative API.</strong> JSX'te
 * <code>&lt;Message /&gt;</code> render etmezsin, fonksiyon olarak çağırırsın:
 * <code>message.success("Kaydedildi")</code>.
 *
 * <strong>useMessage hook tercih edilmeli</strong> — static
 * <code>message.success()</code> ConfigProvider context'i (locale, theme)
 * okumaz. <code>const [api, ctx] = message.useMessage()</code> ile yap.
 *
 * AntD API'sini 1:1 korur — tek fark her notice'in ikonu Carbon:
 *   message.success / error / warning / info / loading / open
 *   message.config({ top, duration, maxCount })
 *   message.destroy() / destroy(key)
 *   message.useMessage() hook (5.x)
 *
 * @example Static (basit)
 * ```tsx
 * import { message } from "@servicecoreui/ui";
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
function useMessage(
  ...args: Parameters<AntMessage["useMessage"]>
): [MessageApi, ReactElement] {
  const [api, holder] = antMessage.useMessage(...args);
  const wrapped = useMemo(() => wrapApi(api), [api]);
  return [wrapped, holder];
}

export const message: typeof antMessage = Object.assign({}, antMessage, {
  open: wrapOpen(antMessage.open),
  success: wrapTypeMethod(antMessage.success, "success"),
  error: wrapTypeMethod(antMessage.error, "error"),
  warning: wrapTypeMethod(antMessage.warning, "warning"),
  info: wrapTypeMethod(antMessage.info, "info"),
  loading: wrapTypeMethod(antMessage.loading, "loading"),
  useMessage,
});

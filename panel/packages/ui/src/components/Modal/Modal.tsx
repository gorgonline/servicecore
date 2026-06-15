import { Modal as AntModal } from "antd";
import {
  CheckmarkFilled,
  Close,
  ErrorFilled,
  InformationFilled,
  WarningAltFilled,
} from "@carbon/icons-react";
import clsx from "clsx";
import { useMemo } from "react";
import type { ReactElement, ReactNode } from "react";
import type {
  ModalFuncProps,
  ModalFuncReturn,
  ModalProps,
} from "./Modal.types";
import styles from "./Modal.module.css";

/* ── Carbon ikon enjeksiyonu (static methods + useModal) ──────────────────────
 * Modal.confirm/info/success/error/warning imperative API; AntD her tipe göre
 * @ant-design/icons glyph'i basar (ExclamationCircleFilled, InfoCircleFilled, ...).
 * Panel Carbon kullandığı için her tipli metodu + useModal() hook'unun api'sini
 * sarıp config'e Carbon `icon` enjekte ediyoruz; sonra AntD'nin kendi tipli
 * metoduna delege ediyoruz (type + class'ı o yönetir).
 *
 * undefined → Carbon enjekte; null/false → consumer ikonu gizlemek istiyor (AntD
 * `if (!icon && icon !== null)` ile null'a saygı duyar), custom node → korunur.
 * Bu yüzden `=== undefined` ile kontrol; `??` değil.
 *
 * NOT: Carbon ikon AntD'nin confirm-body layout class'ı (`> .anticon`) ile
 * SARILMAZ — bare <svg> olarak `.ant-modal-confirm-body` direct child'ı olur.
 * Bu yüzden renk + boyut + flex hizalama doğrudan ikonun module class'ında
 * (.confirmIcon, Modal.module.css). */

const CONFIRM_ICON: ReactNode = (
  <WarningAltFilled className={clsx(styles.confirmIcon, styles.confirmIconWarning)} />
);
const INFO_ICON: ReactNode = (
  <InformationFilled className={clsx(styles.confirmIcon, styles.confirmIconInfo)} />
);
const SUCCESS_ICON: ReactNode = (
  <CheckmarkFilled className={clsx(styles.confirmIcon, styles.confirmIconSuccess)} />
);
const ERROR_ICON: ReactNode = (
  <ErrorFilled className={clsx(styles.confirmIcon, styles.confirmIconError)} />
);
const WARNING_ICON: ReactNode = (
  <WarningAltFilled className={clsx(styles.confirmIcon, styles.confirmIconWarning)} />
);

/** AntD modal func metodu (confirm/info/...) tipi. */
type ModalFunc = (config: ModalFuncProps) => ModalFuncReturn;
/** useModal() dönüşündeki api (warn hariç). */
type ModalHookApi = ReturnType<typeof AntModal.useModal>[0];

/** Tipli metodu (confirm/info/...) Carbon icon enjekte edecek şekilde sarar.
 *  Consumer icon verirse (null/false dahil) korunur. */
function wrapFunc(origFn: ModalFunc, icon: ReactNode): ModalFunc {
  return (config: ModalFuncProps): ModalFuncReturn =>
    origFn(config.icon === undefined ? { ...config, icon } : config);
}

/** Static ya da hook api'sinin confirm/info/success/error/warning metotlarını sarar. */
function wrapModalApi(api: ModalHookApi): ModalHookApi {
  return {
    ...api,
    confirm: wrapFunc(api.confirm, CONFIRM_ICON),
    info: wrapFunc(api.info, INFO_ICON),
    success: wrapFunc(api.success, SUCCESS_ICON),
    error: wrapFunc(api.error, ERROR_ICON),
    warning: wrapFunc(api.warning, WARNING_ICON),
  };
}

/** ServiceCore Modal.useModal — context-aware imperative dialog + Carbon ikonlar.
 *  AntD'nin döndürdüğü api'yi sarıp holder'ı olduğu gibi geri verir. */
function useModal(
  ...args: Parameters<typeof AntModal.useModal>
): [ModalHookApi, ReactElement] {
  const [api, holder] = AntModal.useModal(...args);
  const wrapped = useMemo(() => wrapModalApi(api), [api]);
  return [wrapped, holder];
}

/** ServiceCore Modal — AntD Modal wrap + static methods attached.
 *
 * Merkezi diyalog. Kullanıcı eylemi gerekiyor — confirm, form,
 * detay (geniş içerik) için tercih et.
 *
 * <strong>Modal vs Drawer vs Popconfirm:</strong>
 *   • <strong>Modal:</strong> Tek odak, form/confirm/detay. Sayfa karanlık,
 *     başka iş yapılamaz.
 *   • <strong>Drawer:</strong> Yan panel, sayfa görünür kalır (filter,
 *     ticket detay). Workflow bölmez.
 *   • <strong>Popconfirm:</strong> Inline mini confirm — tek soru, hızlı
 *     onay (delete row).
 *
 * <strong>5.7 baseline:</strong>
 *   • <code>destroyOnClose</code> kullan (destroyOnHidden 5.25+).
 *   • <code>focusTriggerAfterClose</code> kullan (focusable 6.2+).
 *   • <code>mask: boolean</code> (mask object 6.3+).
 *   • <code>width: number</code> (Breakpoint 5.23+).
 *   • <code>loading</code> skeleton 5.18+ — kullanma.
 *   • <code>classNames</code>/<code>styles</code> semantic DOM yok.
 *
 * <strong>Static methods (Modal.confirm/info/success/error/warning):</strong>
 * Quick imperative dialog. ConfigProvider context için
 * <code>Modal.useModal()</code> hook tercih et.
 *
 * @example Controlled dialog
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Modal open={open} onOk={save} onCancel={() => setOpen(false)} title="Bilet düzenle">
 *   <Form />
 * </Modal>
 * ```
 *
 * @example Confirm — yıkıcı eylem
 * ```tsx
 * Modal.confirm({
 *   title: "Bileti silmek istediğine emin misin?",
 *   content: "Bu işlem geri alınamaz.",
 *   okText: "Sil",
 *   okType: "danger",
 *   cancelText: "Vazgeç",
 *   onOk: () => api.delete(id),
 * });
 * ```
 *
 * @example useModal hook (önerilen — context-aware)
 * ```tsx
 * const [modalApi, contextHolder] = Modal.useModal();
 * return (
 *   <>
 *     {contextHolder}
 *     <Button onClick={() => modalApi.confirm({ title: "..." })}>Sil</Button>
 *   </>
 * );
 * ```
 *
 * @example Async onOk — promise dönerse otomatik loading
 * ```tsx
 * <Modal
 *   open={open}
 *   onOk={async () => {
 *     await api.save();
 *     setOpen(false);
 *   }}
 *   onCancel={() => setOpen(false)}
 * />
 * ```
 */
function ModalRoot(props: ModalProps) {
  const { className, wrapClassName, closeIcon, ...rest } = props;
  return (
    <AntModal
      {...rest}
      // Default kapatma X'i Carbon; consumer null/false verip gizleyebilir, custom node geçebilir.
      closeIcon={closeIcon === undefined ? <Close /> : closeIcon}
      className={clsx(styles.modal, className)}
      wrapClassName={clsx(styles.wrap, wrapClassName)}
    />
  );
}

/** Modal wrap'in public yüzeyi — root component + Carbon'lu static metodlar.
 *  Explicit annotasyon: Object.assign çıktısı AntD iç tiplerini (ConfirmDialog vb.)
 *  sızdırıp .d.ts üretimini bozar (TS4023) — Message/Notification'daki
 *  `typeof antMessage` çözümünün Modal karşılığı. */
interface ModalType {
  (props: ModalProps): ReactElement;
  useModal: typeof useModal;
  confirm: ModalFunc;
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warning: ModalFunc;
  destroyAll: typeof AntModal.destroyAll;
  config: typeof AntModal.config;
}

/** Static methods'ı wrap component'e attach et — `Modal.confirm()` vb. çalışsın. */
export const Modal: ModalType = Object.assign(ModalRoot, {
  useModal,
  confirm: wrapFunc(AntModal.confirm, CONFIRM_ICON),
  info: wrapFunc(AntModal.info, INFO_ICON),
  success: wrapFunc(AntModal.success, SUCCESS_ICON),
  error: wrapFunc(AntModal.error, ERROR_ICON),
  warning: wrapFunc(AntModal.warning, WARNING_ICON),
  destroyAll: AntModal.destroyAll,
  config: AntModal.config,
});

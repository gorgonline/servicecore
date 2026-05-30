import { Modal as AntModal } from "antd";
import clsx from "clsx";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.css";

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
  const { className, wrapClassName, ...rest } = props;
  return (
    <AntModal
      {...rest}
      className={clsx(styles.modal, className)}
      wrapClassName={clsx(styles.wrap, wrapClassName)}
    />
  );
}

/** Static methods'ı wrap component'e attach et — `Modal.confirm()` vb. çalışsın. */
export const Modal = Object.assign(ModalRoot, {
  useModal: AntModal.useModal,
  confirm: AntModal.confirm,
  info: AntModal.info,
  success: AntModal.success,
  error: AntModal.error,
  warning: AntModal.warning,
  destroyAll: AntModal.destroyAll,
  config: AntModal.config,
});

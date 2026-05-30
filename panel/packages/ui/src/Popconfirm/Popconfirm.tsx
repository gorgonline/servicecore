import { Popconfirm as AntPopconfirm } from "antd";
import clsx from "clsx";
import type { PopconfirmProps } from "./Popconfirm.types";
import styles from "./Popconfirm.module.css";

/** ServiceCore Popconfirm — inline confirm popup.
 *
 * Trigger elemanına tıklayınca yanında küçük confirm baloncuğu açılır.
 * Tek soru, hızlı evet/hayır. Modal.confirm'un hafif alternatifi.
 *
 * <strong>Popconfirm vs Modal.confirm vs Popover:</strong>
 *   • <strong>Popconfirm:</strong> Inline, kısa soru (1-2 satır). "Bu satırı
 *     sil?". Trigger yanında, sayfa karanlık değil.
 *   • <strong>Modal.confirm:</strong> Yıkıcı ve bağlam gerekli ("3 ilişkili
 *     bilet de silinecek"). Sayfa karanlık, kullanıcı odaklı.
 *   • <strong>Popover:</strong> Custom içerik (form, action menu). Confirm
 *     pattern değil.
 *
 * <strong>5.7 baseline:</strong>
 *   • <code>title</code> zorunlu, <code>description</code> 5.1+ ✓.
 *   • <code>showCancel</code> 4.18+ ✓, <code>onPopupClick</code> 5.5+ ✓.
 *   • <code>classNames</code>/<code>styles</code> semantic DOM (5.8+) yok.
 *
 * @example Basit — table row delete
 * ```tsx
 * <Popconfirm
 *   title="Bileti sil?"
 *   description="Bu işlem geri alınamaz."
 *   okText="Sil"
 *   okType="danger"
 *   cancelText="Vazgeç"
 *   onConfirm={() => api.delete(id)}
 * >
 *   <Button danger size="small">Sil</Button>
 * </Popconfirm>
 * ```
 *
 * @example Async onConfirm — loading button
 * ```tsx
 * const [loading, setLoading] = useState(false);
 *
 * <Popconfirm
 *   title="Bileti arşivle?"
 *   okText="Arşivle"
 *   okButtonProps={{ loading }}
 *   onConfirm={async () => {
 *     setLoading(true);
 *     await api.archive(id);
 *     setLoading(false);
 *   }}
 * >
 *   <Button>Arşivle</Button>
 * </Popconfirm>
 * ```
 *
 * @example Sadece warning — cancel yok
 * ```tsx
 * <Popconfirm
 *   title="Kaydedilmedi"
 *   description="Değişiklikler kaybolacak."
 *   showCancel={false}
 *   okText="Tamam"
 *   onConfirm={discard}
 * >
 *   <Button>Çık</Button>
 * </Popconfirm>
 * ```
 */
export function Popconfirm(props: PopconfirmProps) {
  const { overlayClassName, rootClassName, ...rest } = props;
  return (
    <AntPopconfirm
      {...rest}
      overlayClassName={clsx(styles.overlay, overlayClassName)}
      rootClassName={clsx(styles.root, rootClassName)}
    />
  );
}

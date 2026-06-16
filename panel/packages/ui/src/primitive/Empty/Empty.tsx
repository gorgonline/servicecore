import { Empty as AntEmpty } from "antd";
import clsx from "clsx";
import styles from "./Empty.module.css";
import type { EmptyProps } from "./Empty.types";

/** ServiceCore Empty — AntD Empty wrap.
 *
 * Boş durum (empty state) bileşeni. Bilet listesi boş, arama sonucu yok,
 * filter sonuç yok, bildirim yok, draft yok, henüz yorum yok için.
 * <strong>Bir CTA button koy</strong> — kullanıcının bir sonraki adımı net olsun.
 *
 * Loading state ile <strong>karıştırma</strong> — yüklenirken Skeleton/Spin,
 * gerçekten boş olduğunda Empty.
 *
 * AntD API'sini 1:1 korur.
 *
 * @example Default + CTA
 * ```tsx
 * <Empty
 *   description="Henüz bilet yok"
 *   image={Empty.PRESENTED_IMAGE_DEFAULT}
 * >
 *   <Button type="primary" leadingIcon={<Add />}>Bilet aç</Button>
 * </Empty>
 * ```
 *
 * @example Compact (table footer için)
 * ```tsx
 * <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Sonuç yok" />
 * ```
 *
 * @example Custom icon
 * ```tsx
 * <Empty
 *   image={<DocumentBlank size={48} />}
 *   description="Doküman ekle"
 * />
 * ```
 */
function EmptyRoot({ className, ...rest }: EmptyProps) {
  return <AntEmpty {...rest} className={clsx(styles.empty, className)} />;
}

/** Default illüstrasyon — gri çizgi tarzı boş kutu. */
EmptyRoot.PRESENTED_IMAGE_DEFAULT = AntEmpty.PRESENTED_IMAGE_DEFAULT;

/** Sade küçük illüstrasyon — tablo footer / inline empty için. */
EmptyRoot.PRESENTED_IMAGE_SIMPLE = AntEmpty.PRESENTED_IMAGE_SIMPLE;

export const Empty = EmptyRoot;

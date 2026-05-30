import { Image as AntImage } from "antd";
import clsx from "clsx";
import styles from "./Image.module.css";
import type {
  ImageProps,
  ImagePreviewGroupProps,
} from "./Image.types";

/** ServiceCore Image — AntD Image wrap.
 *
 * Resim görüntüleme + preview (zoom/rotate/move). Ticket attachment
 * (ekran görüntüsü), asset photo, KB makale ek görsel, server diagram,
 * büyük profil avatarı için.
 *
 * AntD API'sini 1:1 korur. <code>Image.PreviewGroup</code> ile gallery
 * — 5.7'de <code>items</code> prop yok, children pattern kullan.
 *
 * @example Basic + preview
 * ```tsx
 * <Image
 *   src="/screenshot.png"
 *   alt="Hata ekran görüntüsü"
 *   width={200}
 *   fallback="/no-image.png"
 * />
 * ```
 *
 * @example Gallery (PreviewGroup)
 * ```tsx
 * <Image.PreviewGroup>
 *   {urls.map(u => <Image key={u} src={u} width={120} />)}
 * </Image.PreviewGroup>
 * ```
 *
 * @example Preview kapalı
 * ```tsx
 * <Image src="/logo.png" preview={false} />
 * ```
 */
function ImageRoot({ className, rootClassName, ...rest }: ImageProps) {
  return (
    <AntImage
      {...rest}
      className={clsx(styles.image, className)}
      rootClassName={clsx(styles.root, rootClassName)}
    />
  );
}

/** Image.PreviewGroup — birden fazla image'ı tek preview modal'ında gez.
 *
 * 5.7'de <code>items</code> prop YOK (5.10+) — children pattern kullan:
 * ```tsx
 * <Image.PreviewGroup>
 *   <Image src="..." />
 *   <Image src="..." />
 * </Image.PreviewGroup>
 * ```
 */
function ImagePreviewGroup(props: ImagePreviewGroupProps) {
  return <AntImage.PreviewGroup {...props} />;
}

ImageRoot.PreviewGroup = ImagePreviewGroup;

export const Image = ImageRoot;

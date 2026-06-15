import { Image as AntImage } from "antd";
import {
  ChevronLeft,
  ChevronRight,
  Close,
  ReflectHorizontal,
  ReflectVertical,
  Rotate,
  RotateCounterclockwise,
  ZoomIn,
  ZoomOut,
} from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Image.module.css";
import type {
  ImageProps,
  ImagePreviewGroupProps,
} from "./Image.types";

/** Preview toolbar / close / switch ikonları — AntD'nin @ant-design/icons
 *  glyph'leri yerine Carbon. rc-image 7.0 `preview.icons` per-ikon API'sini
 *  AntD 5.7 doğrudan iletir (PreviewGroup.js → rc-image Preview → Operations).
 *  Carbon `<svg fill="currentColor">` — renk AntD'nin operation/close/switch
 *  class'ından miras alınır; boyut Image.module.css'te svg width/height olarak
 *  verilir (Carbon font-size'a tepki vermez). */
const PREVIEW_ICONS = {
  zoomIn: <ZoomIn />,
  zoomOut: <ZoomOut />,
  rotateLeft: <RotateCounterclockwise />,
  rotateRight: <Rotate />,
  flipX: <ReflectHorizontal />,
  flipY: <ReflectVertical />,
  close: <Close />,
  left: <ChevronLeft />,
  right: <ChevronRight />,
} as const;

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
function ImageRoot({ className, rootClassName, preview, ...rest }: ImageProps) {
  // preview === false → kapalı, dokunma. true/undefined → Carbon ikonlu obje.
  // Obje verildiyse: Carbon default'ları temel al, consumer'ın preview.icons'unu
  // per-ikon üstüne ser (AntD'nin kendi merge sırasıyla aynı — override kazanır).
  // toolbarRender / scaleStep / mask vb. tüm diğer preview alanları korunur.
  const previewObj = typeof preview === "object" ? preview : undefined;
  const mergedPreview =
    preview === false
      ? preview
      : {
          ...previewObj,
          icons: { ...PREVIEW_ICONS, ...previewObj?.icons },
        };
  return (
    <AntImage
      {...rest}
      preview={mergedPreview}
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
 *
 * NOT — gallery modunda preview ikonları per-image <code>preview.icons</code>
 * ile DEĞİL, grup seviyesindeki top-level <code>icons</code> prop'uyla gelir
 * (rc-image groupContext, paylaşımlı Preview kullanır). Carbon ikonlar burada
 * top-level <code>icons</code> ile enjekte edilir; consumer <code>icons</code>
 * geçerse per-ikon üstüne serilir (AntD'nin merge sırasıyla aynı).
 */
function ImagePreviewGroup({ icons, ...rest }: ImagePreviewGroupProps) {
  return (
    <AntImage.PreviewGroup
      {...rest}
      icons={{ ...PREVIEW_ICONS, ...icons }}
    />
  );
}

ImageRoot.PreviewGroup = ImagePreviewGroup;

export const Image = ImageRoot;

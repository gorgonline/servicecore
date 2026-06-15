import type { ComponentProps } from "react";
import type { Image as AntImage } from "antd";

/** ServiceCore Image — AntD Image 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   src, alt, width, height, placeholder (ReactNode), fallback (URL),
 *   preview (boolean | object), preview.visible / open, preview.src,
 *   preview.scaleStep, preview.minScale, preview.maxScale, preview.movable,
 *   preview.mask, preview.getContainer, preview.toolbarRender,
 *   preview.onVisibleChange / onOpenChange,
 *   rootClassName (4.23+), onError,
 *   Image.PreviewGroup (children pattern)
 *
 * 5.7'de YOK:
 *   Image.PreviewGroup items prop (5.10+) — children pattern kullan,
 *   preview.imageRender — modern API,
 *   classNames/styles semantic DOM (6.0+),
 *   focusTrap (6.4+), mask.closable (6.4+).
 *
 * ServiceCore wrap — preview toolbar/close/switch ikonları Carbon'a çevrilir
 * (zoomIn/zoomOut/rotateLeft/rotateRight/flipX/flipY/close/left/right).
 * Per-image: <code>preview.icons</code>, gallery: top-level
 * <code>icons</code> ile per-ikon override edilebilir (Carbon default üstüne).
 */
export type ImageProps = ComponentProps<typeof AntImage>;

/** Image.PreviewGroup — gallery preview wrapper. */
export type ImagePreviewGroupProps = ComponentProps<typeof AntImage.PreviewGroup>;

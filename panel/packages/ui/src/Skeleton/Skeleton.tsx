import { Skeleton as AntSkeleton } from "antd";
import clsx from "clsx";
import type { SkeletonProps } from "./Skeleton.types";
import styles from "./Skeleton.module.css";

/** ServiceCore Skeleton — yer tutucu (placeholder) iskelet.
 *
 * <strong>Ne için:</strong> İçerik backend'den gelene kadar sayfanın
 * SHAPE'ini göster — kullanıcı boş ekran görmesin, layout shift olmasın.
 *
 * <strong>Skeleton vs Spin vs Progress:</strong>
 *   • <strong>Skeleton:</strong> İçeriğin yapısı belli (card listesi, detay
 *     sayfa) — şeklini göster. Layout shift sıfır.
 *   • <strong>Spin:</strong> Süre belirsiz işlem (save button loading).
 *     Tek nokta, boyut küçük.
 *   • <strong>Progress:</strong> Yüzdeli ilerleme (upload %47).
 *
 * <strong>Composite vs Sub-components:</strong>
 *   • <strong>{`<Skeleton />`}</strong>: hazır kalıp — avatar + title + N
 *     paragraf. Article/detay loading için hızlı.
 *   • <strong>{`<Skeleton.Button />`}</strong>, <strong>.Avatar</strong>,{" "}
 *     <strong>.Input</strong>, <strong>.Image</strong>: tek tek primitive,
 *     custom layout (card listesi, table row) için.
 *   • <strong>{`<Skeleton.Node />`}</strong>: custom shape (chart, map).
 *
 * <strong>5.7 baseline:</strong>
 *   • <code>active</code> — shimmer animasyonu.
 *   • <code>loading</code> + <code>children</code> — true ise iskelet,
 *     false ise children.
 *   • <code>avatar</code>/<code>title</code>/<code>paragraph</code> bool/obj.
 *   • <code>round</code> — köşeleri yuvarla.
 *   • Sub: Button (active/block/shape/size), Avatar (active/shape/size),
 *     Input (active/size), Image (active), Node (active/children).
 *   • <code>Skeleton.Node</code> <code>fullSize</code> (5.8+) yok.
 *   • <code>classNames</code>/<code>styles</code> semantic DOM (5.8+) yok.
 *
 * @example Basic — avatar + title + 4 paragraf, active
 * ```tsx
 * <Skeleton avatar paragraph={{ rows: 4 }} active />
 * ```
 *
 * @example Loading swap — true ise iskelet, false ise içerik
 * ```tsx
 * <Skeleton loading={isLoading} active avatar>
 *   <ArticleCard {...data} />
 * </Skeleton>
 * ```
 *
 * @example Custom paragraf — son satır kısa
 * ```tsx
 * <Skeleton
 *   title={{ width: '60%' }}
 *   paragraph={{ rows: 3, width: ['100%', '90%', '40%'] }}
 *   active
 * />
 * ```
 *
 * @example Sub-components — table row iskelet
 * ```tsx
 * <div style={{ display: 'flex', gap: 12 }}>
 *   <Skeleton.Avatar active size="small" />
 *   <Skeleton.Input active size="small" />
 *   <Skeleton.Button active size="small" />
 * </div>
 * ```
 */
function SkeletonRoot(props: SkeletonProps) {
  const { className, ...rest } = props;
  return <AntSkeleton {...rest} className={clsx(styles.skeleton, className)} />;
}

/** Sub-components'i attach — Skeleton.Button / .Avatar / .Input / .Image / .Node */
export const Skeleton = Object.assign(SkeletonRoot, {
  Button: AntSkeleton.Button,
  Avatar: AntSkeleton.Avatar,
  Input: AntSkeleton.Input,
  Image: AntSkeleton.Image,
  Node: AntSkeleton.Node,
});

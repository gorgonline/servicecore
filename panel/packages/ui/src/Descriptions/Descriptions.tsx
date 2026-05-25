import { Descriptions as AntDescriptions } from "antd";
import clsx from "clsx";
import styles from "./Descriptions.module.css";
import type {
  DescriptionsProps,
  DescriptionsItemProps,
} from "./Descriptions.types";

/** ServiceCore Descriptions — AntD Descriptions wrap.
 *
 * Tek bir nesnenin özelliklerini key-value listesi olarak gösterir.
 * Ticket detail meta (ID/Açıldı/Atanan/Öncelik), asset bilgileri,
 * user profile, change request detail, server info için ideal.
 * Tablo değil — tablo birden fazla nesneyi karşılaştırır; Descriptions
 * tek nesnenin alanlarını listeler.
 *
 * 5.7'de <strong>items</strong> prop yok (5.8+) — children pattern
 * <code>&lt;Descriptions.Item&gt;</code> kullan.
 *
 * @example Ticket meta
 * ```tsx
 * <Descriptions title="SC-4127" bordered column={2}>
 *   <Descriptions.Item label="Açıldı">12:14</Descriptions.Item>
 *   <Descriptions.Item label="Atanan">Mehmet K.</Descriptions.Item>
 *   <Descriptions.Item label="Öncelik">P1</Descriptions.Item>
 *   <Descriptions.Item label="Kategori">Network</Descriptions.Item>
 *   <Descriptions.Item label="Açıklama" span={2}>
 *     Detaylı açıklama...
 *   </Descriptions.Item>
 * </Descriptions>
 * ```
 */
function DescriptionsRoot({ className, ...rest }: DescriptionsProps) {
  return (
    <AntDescriptions
      {...rest}
      className={clsx(styles.descriptions, className)}
    />
  );
}

/** Descriptions.Item — children pattern (5.7'de tek seçenek, 5.8+ items prop). */
function DescriptionsItem(props: DescriptionsItemProps) {
  return <AntDescriptions.Item {...props} />;
}

DescriptionsRoot.Item = DescriptionsItem;

export const Descriptions = DescriptionsRoot;

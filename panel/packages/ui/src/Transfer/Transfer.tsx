import { Transfer as AntTransfer } from "antd";
import clsx from "clsx";
import styles from "./Transfer.module.css";
import type { TransferProps } from "./Transfer.types";

/** ServiceCore Transfer — AntD Transfer wrap.
 *
 * İki kolonlu item taşıma. Kullanıcıyı role atama, permission seçimi,
 * asset assignment, tag bulk taşıma. Sol kolon havuz, sağ kolon seçilen.
 *
 * AntD API'sini 1:1 korur.
 *
 * @example Temel
 * ```tsx
 * <Transfer
 *   dataSource={users}
 *   targetKeys={selected}
 *   onChange={setSelected}
 *   render={(u) => u.title}
 *   titles={["Tüm kullanıcılar", "Atanan"]}
 * />
 * ```
 *
 * @example Search + footer
 * ```tsx
 * <Transfer
 *   showSearch
 *   filterOption={(input, item) => item.title.includes(input)}
 *   footer={() => <Button size="small">Tümünü temizle</Button>}
 * />
 * ```
 */
export function Transfer({ className, ...rest }: TransferProps) {
  return (
    <AntTransfer {...rest} className={clsx(styles.transfer, className)} />
  );
}

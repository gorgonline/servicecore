import { Mentions as AntMentions } from "antd";
import clsx from "clsx";
import styles from "./Mentions.module.css";
import type { MentionsProps } from "./Mentions.types";

/** ServiceCore Mentions — AntD Mentions wrap.
 *
 * "@" veya "#" gibi prefix karakterleri yazıldığında autocomplete listesi
 * açan input. Bilet yorumlarında kullanıcı tag'leme (@mehmet), chat,
 * comment thread, asset tag'leme için.
 *
 * AntD API'sini 1:1 korur. Modern API'de `options` prop'u tercih edilir;
 * children pattern (`<Mentions.Option>`) hâlâ destekli ama deprecated yolda.
 *
 * @example Basit @ mention
 * ```tsx
 * <Mentions
 *   placeholder="@ ile kişi etiketle"
 *   options={[
 *     { value: "mehmet",  label: "Mehmet K." },
 *     { value: "ayse",    label: "Ayşe T."   },
 *     { value: "burak",   label: "Burak D."  },
 *   ]}
 *   onSelect={(opt) => console.log("tagged:", opt.value)}
 * />
 * ```
 *
 * @example Multi-prefix — @kişi + #kanal
 * ```tsx
 * <Mentions
 *   prefix={["@", "#"]}
 *   onSearch={(text, prefix) => {
 *     if (prefix === "@") loadUsers(text);
 *     if (prefix === "#") loadChannels(text);
 *   }}
 *   options={items}
 * />
 * ```
 */
export function Mentions({ className, popupClassName, ...rest }: MentionsProps) {
  return (
    <AntMentions
      {...rest}
      className={clsx(styles.mentions, className)}
      popupClassName={clsx(styles.popup, popupClassName)}
    />
  );
}

/** Mentions.Option — children pattern için. Modern API'de `options` prop'u
 *  tercih edilir, bu sadece backward compat için. */
Mentions.Option = AntMentions.Option;

import { Dropdown as AntDropdown } from "antd";
import type { DropdownProps as AntDropdownProps } from "antd";
import type { ComponentProps } from "react";
import { ChevronDown } from "@carbon/icons-react";
import clsx from "clsx";
import styles from "./Dropdown.module.css";

export interface DropdownProps extends AntDropdownProps {}

/** ServiceCore Dropdown — AntD Dropdown wrap.
 *
 * Trigger'a tıklayınca/hover edince açılan menü. Bir element (Button, Avatar, IconBtn,
 * row aksiyonu) için 3+ aksiyon barındıran kompakt menü.
 *
 * AntD API'sini 1:1 korur (menu, trigger, placement, arrow, open/onOpenChange,
 * dropdownRender, getPopupContainer, autoAdjustOverflow, destroyPopupOnHide).
 *
 * Modern API: `menu={{ items: [...] }}` — `overlay` prop'u 4.24+ DEPRECATED.
 *
 * NOT: AntD 5.7 baseline — `popupRender` (5.25+) ve `destroyOnHidden` (5.25+) yok.
 * `dropdownRender` ve `destroyPopupOnHide` kullan.
 */
function DropdownImpl({ overlayClassName, ...rest }: DropdownProps) {
  return (
    <AntDropdown
      {...rest}
      overlayClassName={clsx(styles.dropdown, overlayClassName)}
    />
  );
}

/* ── Dropdown.Button ──────────────────────────────────────── */

type AntDropdownButtonProps = ComponentProps<typeof AntDropdown.Button>;
export type DropdownButtonProps = AntDropdownButtonProps;

/** Split button — sol tarafta primary aksiyon, sağ tarafta dropdown caret.
 *
 * Default caret: Carbon ChevronDown (AntD'nin DownOutlined yerine).
 *
 * Kullanım: "Kaydet ▾" (Kaydet et / Kaydet ve kapat / Taslak kaydet) gibi
 * birincil aksiyon + ilgili alternatifler.
 */
function ButtonImpl({ icon, className, overlayClassName, ...rest }: AntDropdownButtonProps) {
  return (
    <AntDropdown.Button
      {...rest}
      icon={icon ?? <ChevronDown />}
      className={clsx(styles.button, className)}
      overlayClassName={clsx(styles.dropdown, overlayClassName)}
    />
  );
}

/* ── Compose ──────────────────────────────────────────────── */

type DropdownComponent = typeof DropdownImpl & {
  Button: typeof ButtonImpl;
};

export const Dropdown = DropdownImpl as DropdownComponent;
Dropdown.Button = ButtonImpl;

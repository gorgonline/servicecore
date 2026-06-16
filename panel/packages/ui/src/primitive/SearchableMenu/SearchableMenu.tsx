"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Checkmark, Search } from "@carbon/icons-react";
import clsx from "clsx";
import { Dropdown } from "../Dropdown";
import type { DropdownProps } from "../Dropdown";
import { Input } from "../Input";
import { Text } from "../../typography/Text";
import styles from "./SearchableMenu.module.css";

export interface SearchableMenuItem {
  key: string;
  /** Görünen etiket — aynı zamanda arama metni. */
  label: string;
  /** Opsiyonel sol ikon. */
  icon?: ReactNode;
}

export interface SearchableMenuProps {
  /** Tetikleyici — menüyü açan eleman (ör. "Örnek Pano ▾" butonu). */
  children: ReactNode;
  items: SearchableMenuItem[];
  /** Seçili öğe anahtarı (işaretlenir). */
  selectedKey?: string;
  /** Bir öğe seçilince (panel kapanır). */
  onSelect?: (key: string) => void;
  /** Arama input placeholder'ı. */
  placeholder?: string;
  /** Sonuç yoksa gösterilecek metin. */
  emptyText?: string;
  placement?: DropdownProps["placement"];
}

/**
 * SearchableMenu — üstünde arama olan dropdown menü (aranabilir seçici).
 *
 * Buton/etiket tetikleyicisi açılınca üstte bir `Input` (filtre) + altında
 * filtrelenmiş öğe listesi gelir. Header pano/tenant switcher gibi, tetikleyicinin
 * etiket görünümünü koruyup çok öğeli listede arama gerektiğinde kullanılır
 * (Select'in form-kutusu görünümüne karşı). İçeride Dropdown · Input · Text.
 *
 * @example
 * <SearchableMenu items={panolar} selectedKey="ornek" onSelect={go} placeholder="Pano ara">
 *   <Button trailingIcon={<ChevronDown size={14} />}>Örnek Pano</Button>
 * </SearchableMenu>
 */
export function SearchableMenu({
  children,
  items,
  selectedKey,
  onSelect,
  placeholder = "Ara",
  emptyText = "Sonuç yok",
  placement = "bottomLeft",
}: SearchableMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.trim().toLocaleLowerCase("tr");
  const filtered = q
    ? items.filter((it) => it.label.toLocaleLowerCase("tr").includes(q))
    : items;

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const select = (key: string) => {
    onSelect?.(key);
    close();
  };

  // Tüm overlay kendi kartımız — AntD .ant-dropdown-menu kartı search'ü dışarıda
  // bırakırdı; dropdownRender ile search + kendi item listesini tek kartta veriyoruz.
  const overlay = (
    <div className={styles.panel}>
      <div className={styles.search}>
        <Input
          size="small"
          autoFocus
          allowClear
          prefix={<Search size={14} />}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <Text size="sm" color="tertiary">
            {emptyText}
          </Text>
        </div>
      ) : (
        <div className={styles.list} role="menu">
          {filtered.map((it) => {
            const isSelected = it.key === selectedKey;
            return (
              <button
                key={it.key}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                className={clsx(styles.item, isSelected && styles.itemSelected)}
                onClick={() => select(it.key)}
              >
                {it.icon ? <span className={styles.itemIcon}>{it.icon}</span> : null}
                <span className={styles.itemLabel}>{it.label}</span>
                {isSelected ? <Checkmark size={16} className={styles.itemCheck} /> : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <Dropdown
      trigger={["click"]}
      placement={placement}
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close())}
      menu={{ items: [] }}
      dropdownRender={() => overlay}
    >
      {children}
    </Dropdown>
  );
}

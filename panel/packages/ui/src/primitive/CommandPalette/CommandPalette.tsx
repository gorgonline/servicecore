"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Search, RecentlyViewed } from "@carbon/icons-react";
import { Modal } from "../Modal";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import { Kbd } from "../Kbd";
import { Eyebrow } from "../../typography/Eyebrow";
import { Text } from "../../typography/Text";
import styles from "./CommandPalette.module.css";

export interface CommandItem {
  key: string;
  /** Satırda görünen ana metin. */
  label: string;
  /** Sol ikon. Verilmezse RecentlyViewed (son aramalar için). */
  icon?: ReactNode;
  /** Sağda küçük meta (tip, tarih vb.). */
  meta?: string;
}

export interface CommandFilter {
  key: string;
  label: string;
  defaultChecked?: boolean;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  /** Arama kutusu placeholder'ı. */
  placeholder?: string;
  /** Boş durumda gösterilen öğeler (son aramalar / öneriler). */
  recent?: CommandItem[];
  /** Boş durum başlığı. Default: "Son aramalar". */
  recentLabel?: string;
  /** Arama kutusu altındaki filtre checkbox'ları. */
  filters?: CommandFilter[];
  /** Bir öğeye tıklanınca. Verilmezse query'e yazılır. */
  onSelect?: (item: CommandItem) => void;
  /** Query veya filtre değişince — canlı sonuç bağlamak için (Adım 2). */
  onSearch?: (query: string, activeFilters: string[]) => void;
}

/** Tek satır — son aramalar ve (Adım 2) sonuçlar aynı bileşeni kullanır (DRY). */
function ItemRow({ item, onClick }: { item: CommandItem; onClick: () => void }) {
  return (
    <button type="button" className={styles.item} onClick={onClick}>
      <span className={styles.itemIcon}>{item.icon ?? <RecentlyViewed size={16} />}</span>
      <Text size="sm" color="secondary">
        {item.label}
      </Text>
      {item.meta ? (
        <Text size="xs" color="tertiary" className={styles.itemMeta}>
          {item.meta}
        </Text>
      ) : null}
    </button>
  );
}

/**
 * CommandPalette — global arama / komut paleti.
 *
 * Modal (üst-orta, backdrop) + arama kutusu + filtreler + boş durum (son
 * aramalar) + klavye ipucu footer'ı. Tamamen veri-güdümlü (props) — sayfaya
 * gömülü ad-hoc kod değil.
 *
 * Tetikleyici (Search butonu / ⌘K) consumer'da; bu bileşen sadece open/onClose.
 *
 * @example
 * <CommandPalette
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   placeholder="Olay, istek, varlık ara…"
 *   recent={[{ key: "1", label: "SC-4127 — Print server" }]}
 *   filters={[{ key: "desc", label: "Açıklamada da ara" }]}
 * />
 */
export function CommandPalette({
  open,
  onClose,
  placeholder = "Ara…",
  recent = [],
  recentLabel = "Son aramalar",
  filters = [],
  onSelect,
  onSearch,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string[]>(() =>
    filters.filter((f) => f.defaultChecked).map((f) => f.key),
  );

  // Her açılışta arama kutusunu temizle.
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const toggleFilter = (key: string, checked: boolean) => {
    setActive((prev) => {
      const next = checked ? [...prev, key] : prev.filter((k) => k !== key);
      onSearch?.(query, next);
      return next;
    });
  };

  const handleSelect = (item: CommandItem) => {
    if (onSelect) onSelect(item);
    else setQuery(item.label);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      title={null}
      width={640}
      style={{ top: 80 }}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
    >
      <div className={styles.box}>
        {/* Arama kutusu */}
        <div className={styles.searchRow}>
          <Input
            size="large"
            autoFocus
            allowClear
            bordered={false}
            prefix={<Search size={20} className={styles.searchIcon} />}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value, active);
            }}
          />
        </div>

        {/* Filtreler */}
        {filters.length > 0 ? (
          <div className={styles.filters}>
            {filters.map((f) => (
              <Checkbox
                key={f.key}
                checked={active.includes(f.key)}
                onChange={(e) => toggleFilter(f.key, e.target.checked)}
              >
                {f.label}
              </Checkbox>
            ))}
          </div>
        ) : null}

        {/* Sonuç alanı — boş durum: son aramalar. Canlı sonuç Adım 2. */}
        <div className={styles.results}>
          {recent.length > 0 ? (
            <>
              <Eyebrow className={styles.sectionLabel}>{recentLabel}</Eyebrow>
              {recent.map((item) => (
                <ItemRow key={item.key} item={item} onClick={() => handleSelect(item)} />
              ))}
            </>
          ) : null}
        </div>

        {/* Footer — klavye ipuçları */}
        <div className={styles.footer}>
          <span className={styles.hint}>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> gez
          </span>
          <span className={styles.hint}>
            <Kbd>↵</Kbd> aç
          </span>
          <span className={styles.hint}>
            <Kbd>esc</Kbd> kapat
          </span>
        </div>
      </div>
    </Modal>
  );
}

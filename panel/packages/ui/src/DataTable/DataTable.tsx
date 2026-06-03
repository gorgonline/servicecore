"use client";

import { useState } from "react";
import type { Key, ReactNode } from "react";
import { Column, ChevronDown, Filter, Search } from "@carbon/icons-react";
import type { FilterDropdownProps, FilterValue } from "antd/es/table/interface";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Dropdown } from "../Dropdown";
import { Input } from "../Input";
import { Table } from "../Table";
import type { TableProps } from "../Table";
import { Tag } from "../Tag";
import { Text } from "../Text";
import styles from "./DataTable.module.css";

const ACCENT = "var(--sc-color-accent)";
const TERTIARY = "var(--sc-color-text-tertiary)";

export type DataTableFilter =
  | { type: "text" }
  | { type: "enum"; options: { label: string; value: string }[] };

export interface DataTableColumn<T> {
  /** Benzersiz kolon anahtarı (Sütunlar + chip'lerde kullanılır). */
  key: string;
  /** Başlık (Sütunlar listesi + filtre chip etiketi). */
  title: string;
  dataIndex: Extract<keyof T, string>;
  width?: number;
  ellipsis?: boolean;
  align?: "left" | "center" | "right";
  /** Sıralama: true → Türkçe metin sıralaması; fonksiyon → özel karşılaştırma. */
  sortable?: boolean | ((a: T, b: T) => number);
  /** Kolon-başı huni filtre: metin araması veya enum (checkbox). */
  filter?: DataTableFilter;
  /** "Sütunlar"da varsayılan gizli (toggle ile açılır). */
  defaultHidden?: boolean;
  /** Hücre içeriği — satırdan render. */
  render?: (record: T) => ReactNode;
}

export interface DataTableProps<T extends object> {
  rowKey: Extract<keyof T, string>;
  data: T[];
  columns: DataTableColumn<T>[];
  pageSize?: number;
  pageSizeOptions?: number[];
  /** "Sütunlar" kolon görünürlüğü kontrolü (vars. true). */
  columnToggle?: boolean;
  /** Aktif filtre chip çubuğu (vars. true). */
  showFilterChips?: boolean;
  /** Sağ üstte ek araç düğmeleri (Dışa aktar vb.). */
  toolbar?: ReactNode;
}

/* ── Filtre popup içerikleri (bizim Input / Checkbox / Button) ── */

function FilterActions({ confirm, clearFilters }: Pick<FilterDropdownProps, "confirm" | "clearFilters">) {
  return (
    <div className={styles.filterActions}>
      <Button type="text" size="small" onClick={() => { clearFilters?.(); confirm(); }}>
        Temizle
      </Button>
      <Button type="primary" size="small" onClick={() => confirm()}>
        Filtrele
      </Button>
    </div>
  );
}

function TextFilter({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) {
  return (
    <div className={styles.filterPanel}>
      <Input
        autoFocus
        size="small"
        placeholder="Ara"
        prefix={<Search size={14} />}
        value={(selectedKeys[0] as string) ?? ""}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
      />
      <FilterActions confirm={confirm} clearFilters={clearFilters} />
    </div>
  );
}

function EnumFilter({
  options,
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}: FilterDropdownProps & { options: { label: string; value: string }[] }) {
  return (
    <div className={styles.filterPanel}>
      <Checkbox.Group
        className={styles.filterChecks}
        options={options}
        value={selectedKeys as string[]}
        onChange={(vals) => setSelectedKeys(vals as Key[])}
      />
      <FilterActions confirm={confirm} clearFilters={clearFilters} />
    </div>
  );
}

/**
 * DataTable — ITSM kayıt tarayıcısı (records browser) composite'i.
 *
 * Deklaratif kolon spec'inden sort + kolon-başı huni filtre (metin/enum) +
 * "Sütunlar" kolon görünürlüğü + aktif filtre chip'leri + sayfalama üretir.
 * Her modülde (Olay/Çağrı/Problem/İstek…) aynı liste deseni için tek bileşen.
 * İçeride Table · Dropdown · Input · Checkbox · Tag · Button (hepsi @servicecoreui/ui).
 *
 * NOT: Filtre/sort client-side (bu sürüm). Büyük veri için server-side'a
 * (onChange ile backend query) genişletilebilir.
 *
 * @example
 * <DataTable
 *   rowKey="key"
 *   data={kayitlar}
 *   columns={[
 *     { key: "id", title: "Id", dataIndex: "id", sortable: true, filter: { type: "text" }, render: (r) => r.id },
 *     { key: "durum", title: "Durum", dataIndex: "durum", filter: { type: "enum", options: DURUM_OPTS }, render: (r) => <Tag>{r.durum}</Tag> },
 *   ]}
 * />
 */
export function DataTable<T extends object>({
  rowKey,
  data,
  columns,
  pageSize = 10,
  pageSizeOptions,
  columnToggle = true,
  showFilterChips = true,
  toolbar,
}: DataTableProps<T>) {
  const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
  const [visible, setVisible] = useState<Set<string>>(
    () => new Set(columns.filter((c) => !c.defaultHidden).map((c) => c.key)),
  );

  const labelOf: Record<string, string> = Object.fromEntries(columns.map((c) => [c.key, c.title]));

  const toggleCol = (key: string) =>
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const removeFilter = (key: string, value: Key | boolean) =>
    setFilters((prev) => {
      const next = (prev[key] ?? []).filter((v) => v !== value);
      return { ...prev, [key]: next.length ? next : null };
    });

  const chips = Object.entries(filters).flatMap(([key, vals]) =>
    (vals ?? []).map((value) => ({ key, value })),
  );

  const toAntdColumn = (c: DataTableColumn<T>) => ({
    key: c.key,
    title: c.title,
    dataIndex: c.dataIndex,
    width: c.width,
    ellipsis: c.ellipsis,
    align: c.align,
    ...(c.render ? { render: (_value: unknown, record: T) => c.render!(record) } : {}),
    ...(c.sortable
      ? {
          sorter:
            typeof c.sortable === "function"
              ? c.sortable
              : (a: T, b: T) =>
                  String(a[c.dataIndex] ?? "").localeCompare(String(b[c.dataIndex] ?? ""), "tr"),
        }
      : {}),
    ...(c.filter
      ? {
          filteredValue: filters[c.key] ?? null,
          filterIcon: (active: boolean) =>
            c.filter!.type === "text" ? (
              <Search size={14} style={{ color: active ? ACCENT : TERTIARY }} />
            ) : (
              <Filter size={14} style={{ color: active ? ACCENT : TERTIARY }} />
            ),
          onFilter: (value: boolean | Key, record: T) =>
            c.filter!.type === "text"
              ? String(record[c.dataIndex] ?? "")
                  .toLocaleLowerCase("tr")
                  .includes(String(value).toLocaleLowerCase("tr"))
              : record[c.dataIndex] === value,
          filterDropdown: (props: FilterDropdownProps) =>
            c.filter!.type === "text" ? (
              <TextFilter {...props} />
            ) : (
              <EnumFilter options={c.filter!.options} {...props} />
            ),
        }
      : {}),
  });

  const antdColumns = columns
    .filter((c) => visible.has(c.key))
    .map(toAntdColumn) as NonNullable<TableProps<T>["columns"]>;

  const onTableChange: TableProps<T>["onChange"] = (_pagination, tableFilters) => {
    setFilters(tableFilters);
  };

  return (
    <div className={styles.root}>
      {columnToggle || toolbar ? (
        <div className={styles.toolbar}>
          {toolbar}
          {columnToggle ? (
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{ items: [] }}
              dropdownRender={() => (
                <div className={styles.colPanel}>
                  {columns.map((c) => (
                    <div key={c.key} className={styles.colItem}>
                      <Checkbox checked={visible.has(c.key)} onChange={() => toggleCol(c.key)}>
                        {c.title}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              )}
            >
              <Button type="default" leadingIcon={<Column size={16} />} trailingIcon={<ChevronDown size={14} />}>
                Sütunlar
              </Button>
            </Dropdown>
          ) : null}
        </div>
      ) : null}

      {showFilterChips && chips.length > 0 ? (
        <div className={styles.filterBar}>
          <Text size="sm" color="tertiary">
            Filtreler:
          </Text>
          {chips.map(({ key, value }) => (
            <Tag key={`${key}-${value}`} closable onClose={() => removeFilter(key, value)}>
              {labelOf[key] ?? key}: {String(value)}
            </Tag>
          ))}
          <Button type="link" size="small" onClick={() => setFilters({})}>
            Tümünü temizle
          </Button>
        </div>
      ) : null}

      <Table<T>
        rowKey={rowKey}
        dataSource={data}
        sticky
        scroll={{ x: "max-content" }}
        onChange={onTableChange}
        pagination={{
          pageSize,
          showSizeChanger: true,
          showTotal: (total) => `Toplam ${total} kayıt`,
          ...(pageSizeOptions ? { pageSizeOptions } : {}),
        }}
        columns={antdColumns}
      />
    </div>
  );
}

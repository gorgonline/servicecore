import { Table as AntTable } from "antd";
import {
  ArrowDown,
  ArrowsVertical,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "@carbon/icons-react";
import { cloneElement, isValidElement } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Table.module.css";
import type { TableProps, TableSortOrder } from "./Table.types";

/* ── Carbon ikon default'ları ──────────────────────────────────────────────
 * AntD, sort / filter / pagination ikonlarını kendi @ant-design/icons glyph'leriyle
 * basar. Panel genelinde Carbon kullandığımız için bunları Carbon'a çeviriyoruz.
 * Hepsi ilgili prop ile override edilebilir (kolon sortIcon / kolon filterIcon /
 * pagination itemRender). Renk + boyut CSS'te (Table.module.css), AntD wrapper class'ları
 * üzerinden — Carbon ikonları currentColor ile boyanır.
 * NOT: satır expand ikonu (+/−) AntD'de glyph değil CSS-çizimli; ona dokunmuyoruz. */

/** Sortable kolon başlığındaki yön oklarını Carbon'a çevirir.
 *  AntD custom sortIcon'u .ant-table-column-sorter ile sarmadığı için renk/boyut
 *  doğrudan ikon class'ında; aktif (sıralı) durumda accent. */
const defaultSortIcon = ({ sortOrder }: { sortOrder: TableSortOrder }): ReactNode => {
  const className = sortOrder ? styles.sortIconActive : styles.sortIcon;
  if (sortOrder === "ascend") return <ArrowUp className={className} />;
  if (sortOrder === "descend") return <ArrowDown className={className} />;
  return <ArrowsVertical className={className} />;
};

/** Filtreli kolon başlığındaki huni ikonunu Carbon'a çevirir. */
const defaultFilterIcon = (_filtered: boolean): ReactNode => <Filter />;

/** Pagination ileri/geri oklarını Carbon'a çevirir.
 *  AntD'nin kutulu `item-link` butonunu clone'layıp yalnız içindeki glyph'i
 *  değiştirir — kutu, class, aria-label ve tıklama davranışı korunur.
 *  Sayfa numaraları ve jump (çift-ok «...») AntD'de kalır. */
const defaultItemRender = (
  _page: number,
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
  element: ReactNode,
): ReactNode => {
  if ((type === "prev" || type === "next") && isValidElement(element)) {
    return cloneElement(element, undefined, type === "prev" ? <ChevronLeft /> : <ChevronRight />);
  }
  return element;
};

/** Sortable/filtreli kolonlara Carbon sortIcon + filterIcon default'larını enjekte eder.
 *  AntD 5.7'de bu ikonlar kolon seviyesinde (table seviyesinde değil). Kolon grupları için
 *  children'a recursive iner; consumer'ın verdiği sortIcon/filterIcon her zaman korunur. */
function withDefaultIcons<T extends object>(
  columns: NonNullable<TableProps<T>["columns"]>,
): NonNullable<TableProps<T>["columns"]> {
  return columns.map((col) => {
    if ("children" in col && Array.isArray(col.children)) {
      return { ...col, children: withDefaultIcons<T>(col.children) };
    }
    const next = { ...col };
    if ("sorter" in col && Boolean(col.sorter) && !next.sortIcon) {
      next.sortIcon = defaultSortIcon;
    }
    const hasFilter =
      "filters" in col || "filterDropdown" in col || "onFilter" in col;
    if (hasFilter && !next.filterIcon) {
      next.filterIcon = defaultFilterIcon;
    }
    return next;
  });
}

/** ServiceCore Table — AntD Table wrap.
 *
 * ITSM panelinin omurgası. Bilet listesi, asset envanteri, kullanıcı listesi,
 * audit log, change requests. Sortable/filterable kolonlar, pagination,
 * row selection (bulk action), expandable rows, fixed kolonlar.
 *
 * AntD API'sini 1:1 korur. Static helper'lar (<code>Table.Column</code>,{" "}
 * <code>Table.ColumnGroup</code>, <code>Table.Summary</code>,{" "}
 * <code>Table.SELECTION_*</code> sabitleri) <code>columns</code> prop tercih
 * edilirse gerekmez ama backward compat için sunuyoruz.
 *
 * @example Basic
 * ```tsx
 * <Table
 *   columns={[
 *     { title: "ID", dataIndex: "id", width: 80 },
 *     { title: "Bilet", dataIndex: "title", ellipsis: true },
 *     { title: "Öncelik", dataIndex: "priority", filters: priorityFilters },
 *     { title: "Atanan", dataIndex: "assignee", sorter: true },
 *   ]}
 *   dataSource={tickets}
 *   rowKey="id"
 *   pagination={{ pageSize: 20 }}
 * />
 * ```
 */
function TableRoot<T extends object = Record<string, unknown>>({
  className,
  columns,
  pagination,
  ...rest
}: TableProps<T>) {
  // pagination=false ise (sayfalama kapalı) dokunma; aksi halde consumer set
  // etmediyse Carbon ok'lu itemRender default'unu ekle. Consumer'ın itemRender'ı
  // (ve diğer pagination ayarları) bizim default'u override eder.
  const resolvedPagination =
    pagination === false
      ? false
      : { itemRender: defaultItemRender, ...(pagination ?? {}) };

  return (
    <AntTable<T>
      {...rest}
      columns={columns ? withDefaultIcons<T>(columns) : columns}
      pagination={resolvedPagination}
      className={clsx(styles.table, className)}
    />
  );
}

/** Children pattern Column — modern `columns` prop tercih edilir. */
TableRoot.Column = AntTable.Column;

/** Nested column grouping — `columns[].children` ile aynı işi yapar. */
TableRoot.ColumnGroup = AntTable.ColumnGroup;

/** Table footer summary — toplam satırı için. */
TableRoot.Summary = AntTable.Summary;

/** Bulk selection helper'ları —
 *  Table.SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE. */
TableRoot.SELECTION_ALL = AntTable.SELECTION_ALL;
TableRoot.SELECTION_INVERT = AntTable.SELECTION_INVERT;
TableRoot.SELECTION_NONE = AntTable.SELECTION_NONE;

export const Table = TableRoot;

import type { ComponentProps } from "react";
import type { Table as AntTable } from "antd";

/** Boyut. */
export type TableSize = "small" | "middle" | "large";

/** Cell hizalama. */
export type TableAlign = "left" | "center" | "right";

/** Sıralama yönü. */
export type TableSortOrder = "ascend" | "descend" | null;

/** Sabit kolon konumu. */
export type TableFixed = "left" | "right" | boolean;

/** ServiceCore Table — AntD Table 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   columns, dataSource, rowKey, bordered, size, loading, pagination,
 *   rowSelection (full API: type/selectedRowKeys/onChange/onSelect/
 *   getCheckboxProps/fixed/hideSelectAll/columnWidth/renderCell/
 *   checkStrictly/preserveSelectedRowKeys),
 *   expandable (full API), scroll ({x, y}), sticky (4.6+),
 *   showHeader, title, footer, onRow, onHeaderRow, locale,
 *   sortDirections, tableLayout, onChange,
 *   sortIcon (5.6+),
 *   filterMode (4.17+), filterSearch (4.17+)
 *
 * 5.7'de YOK:
 *   virtual (5.9+) — virtual scroll için kendi solution gerekir,
 *   nativeElement/scrollTo ref (5.11+),
 *   hidden column (5.13+) — kolonu manuel filter,
 *   showSorterTooltip (5.16+),
 *   rowHoverable (5.16+) — hover'ı CSS'le disable et,
 *   minWidth column (5.21+).
 */
export type TableProps<T extends object = Record<string, unknown>> = ComponentProps<
  typeof AntTable<T>
>;

/** Table.Column / Table.ColumnGroup — children pattern (deprecated, columns prop tercih). */
export type TableColumnProps = ComponentProps<typeof AntTable.Column>;
export type TableColumnGroupProps = ComponentProps<typeof AntTable.ColumnGroup>;

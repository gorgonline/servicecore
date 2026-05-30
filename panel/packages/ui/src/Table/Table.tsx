import { Table as AntTable } from "antd";
import clsx from "clsx";
import styles from "./Table.module.css";
import type { TableProps } from "./Table.types";

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
  ...rest
}: TableProps<T>) {
  return (
    <AntTable<T>
      {...rest}
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

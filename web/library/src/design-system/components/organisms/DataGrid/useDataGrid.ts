import { useId } from "react";
import type { DataGridProps } from "./DataGrid";

export function useDataGrid<Row>({
  label,
  rows,
  columns,
  getRowKey,
  sort = null,
  onSortChange,
  emptyContent,
  fullWidth = true,
  size = "md",
  showBorders = true,
  showColumnLines = false,
  showRowLines = true,
  rowAlternationEnabled = true,
  children,
  className,
  ...props
}: DataGridProps<Row>) {
  const id = useId();
  if (
    !columns.length ||
    columns.some((column) => !column.key.trim()) ||
    new Set(columns.map((column) => column.key)).size !== columns.length
  )
    throw new Error("Invalid grid columns");
  if (columns.filter((column) => column.rowHeader).length > 1)
    throw new Error("Only one row header is supported");
  if (columns.some((column) => column.sortable && (!column.sortLabel?.trim() || !onSortChange)))
    throw new Error("Sortable columns require a label and callback");
  if (sort && !columns.some((column) => column.key === sort.columnKey && column.sortable))
    throw new Error("Invalid sorted column");
  const keys = rows.map(getRowKey);
  if (keys.some((key) => !key.trim()) || new Set(keys).size !== keys.length)
    throw new Error("Invalid row keys");

  function requestSort(key: string) {
    if (!columns.find((column) => column.key === key)?.sortable) return;
    onSortChange?.({
      columnKey: key,
      direction:
        sort?.columnKey === key && sort.direction === "ascending" ? "descending" : "ascending",
    });
  }

  const headerId = (key: string) => id + "-header-" + encodeURIComponent(key);
  const rowId = (key: string) => id + "-row-" + encodeURIComponent(key);
  const rowHeaderId = (key: string) => id + "-row-header-" + encodeURIComponent(key);
  const columnMetadata = columns.map(({ key, header, rowHeader, sortable, sortLabel, align }) => ({
    key,
    header,
    rowHeader,
    sortable,
    sortLabel,
    align,
  }));

  return {
    label,
    rows,
    columns,
    keys,
    sort,
    emptyContent,
    fullWidth,
    size,
    showBorders,
    showColumnLines,
    showRowLines,
    rowAlternationEnabled,
    children,
    className,
    props,
    requestSort,
    headerId,
    rowId,
    rowHeaderId,
    columnMetadata,
  };
}

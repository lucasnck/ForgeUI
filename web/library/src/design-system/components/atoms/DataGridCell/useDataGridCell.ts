import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridCellProps } from "./DataGridCell";

export function useDataGridCell(input: DataGridCellProps) {
  const grid = useDataGridContext();
  const { rowKey, columnKey, rowHeader, children, className, ...props } = input;
  const column = grid.columns.find((column) => column.key === columnKey);
  if (
    !column ||
    !grid.rowKeys.includes(rowKey) ||
    (rowHeader !== undefined && rowHeader !== Boolean(column.rowHeader))
  )
    throw new Error("Invalid DataGrid cell identity");
  const isRowHeader = Boolean(column.rowHeader);
  const headers = [
    grid.headerId(columnKey),
    !isRowHeader && grid.columns.some((item) => item.rowHeader)
      ? grid.rowHeaderId(rowKey)
      : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return { grid, props, rowKey, columnKey, isRowHeader, headers, children, className };
}

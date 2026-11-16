import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridColumnHeaderProps } from "./DataGridColumnHeader";

export function useDataGridColumnHeader(input: DataGridColumnHeaderProps) {
  const grid = useDataGridContext();
  const { columnKey, label, children, className, ...props } = input;
  const column = grid.columns.find((column) => column.key === columnKey);
  if (!column) throw new Error("Invalid DataGrid column key");
  if (children !== undefined && children !== null)
    throw new Error("DataGridColumnHeader uses label");

  function requestSort() {
    grid.requestSort(columnKey);
  }

  return { grid, column, columnKey, label, props, className, requestSort };
}

import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridRowProps } from "./DataGridRow";

export function useDataGridRow(input: DataGridRowProps) {
  const grid = useDataGridContext();
  const { rowKey, children, className, ...props } = input;
  if (!grid.rowKeys.includes(rowKey)) throw new Error("Invalid DataGrid row key");
  return { grid, props, rowKey, children, className };
}

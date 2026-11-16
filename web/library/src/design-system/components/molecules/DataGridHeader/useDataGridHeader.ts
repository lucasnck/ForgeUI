import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridHeaderProps } from "./DataGridHeader";

export function useDataGridHeader(input: DataGridHeaderProps) {
  const grid = useDataGridContext();
  const { children, className, ...props } = input;
  if (children !== undefined && children !== null)
    throw new Error("DataGridHeader owns column headers");
  return { grid, props, className };
}

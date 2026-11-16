import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridBodyProps } from "./DataGridBody";

export function useDataGridBody(input: DataGridBodyProps) {
  const grid = useDataGridContext();
  const { children, className, ...props } = input;

  return { grid, props, children, className };
}

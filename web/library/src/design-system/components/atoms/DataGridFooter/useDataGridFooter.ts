import { useDataGridContext } from "../../../internal/datagrid/DataGridContext";
import type { DataGridFooterProps } from "./DataGridFooter";

export function useDataGridFooter(input: DataGridFooterProps) {
  const grid = useDataGridContext();
  const { children, className, ...props } = input;

  return { grid, props, children, className };
}

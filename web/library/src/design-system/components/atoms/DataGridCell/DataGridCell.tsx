"use client";
import type { NativeTableCellProps } from "../../../types/collection-contracts";
export interface DataGridCellProps extends NativeTableCellProps {
  rowKey: string;
  columnKey: string;
  rowHeader?: boolean;
}
import { useDataGridCell } from "./useDataGridCell";
import styles from "./DataGridCell.module.css";

export function DataGridCell(props: DataGridCellProps) {
  const view = useDataGridCell(props);

  return view.isRowHeader ? (
    <th
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      id={view.grid.rowHeaderId(view.rowKey)}
      scope="row"
      headers={view.headers}
    >
      {view.children}
    </th>
  ) : (
    <td
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      headers={view.headers}
    >
      {view.children}
    </td>
  );
}

"use client";
import type { ComponentPropsWithRef } from "react";
import { DataGridCell } from "../../atoms/DataGridCell";
import { validateDataGridCells } from "../../../internal/datagrid/validateParts";
export interface DataGridRowProps extends ComponentPropsWithRef<"tr"> {
  rowKey: string;
}
import { useDataGridRow } from "./useDataGridRow";
import styles from "./DataGridRow.module.css";

export function DataGridRow(props: DataGridRowProps) {
  const view = useDataGridRow(props);
  validateDataGridCells(
    view.children,
    DataGridCell,
    view.rowKey,
    view.grid.columns.map((column) => column.key),
  );
  return (
    <tr
      {...view.props}
      id={view.grid.rowId(view.rowKey)}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
    >
      {view.children}
    </tr>
  );
}

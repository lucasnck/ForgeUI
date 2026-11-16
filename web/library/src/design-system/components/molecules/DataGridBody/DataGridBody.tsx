"use client";
import type { ComponentPropsWithRef } from "react";
import { DataGridRow } from "../DataGridRow";
import { validateDataGridRows } from "../../../internal/datagrid/validateParts";
export interface DataGridBodyProps extends ComponentPropsWithRef<"tbody"> {}
import { useDataGridBody } from "./useDataGridBody";
import styles from "./DataGridBody.module.css";

export function DataGridBody(props: DataGridBodyProps) {
  const view = useDataGridBody(props);
  if (view.children !== undefined && view.children !== null)
    validateDataGridRows(view.children, DataGridRow, view.grid.rowKeys);
  return (
    <tbody {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      {view.children ?? view.grid.renderedRows}
    </tbody>
  );
}

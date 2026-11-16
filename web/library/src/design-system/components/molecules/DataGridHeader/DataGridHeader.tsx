"use client";
import type { ComponentPropsWithRef } from "react";
import { DataGridColumnHeader } from "../DataGridColumnHeader";
export interface DataGridHeaderProps extends ComponentPropsWithRef<"thead"> {}
import { useDataGridHeader } from "./useDataGridHeader";
import styles from "./DataGridHeader.module.css";

export function DataGridHeader(props: DataGridHeaderProps) {
  const view = useDataGridHeader(props);

  return (
    <thead {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")}>
      <tr>
        {view.grid.columns.map((column) => (
          <DataGridColumnHeader key={column.key} columnKey={column.key} label={column.header} />
        ))}
      </tr>
    </thead>
  );
}

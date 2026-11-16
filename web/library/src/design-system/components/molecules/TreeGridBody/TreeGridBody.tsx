"use client";
import { TreeGridRow } from "../TreeGridRow";
import { TreeGridCell } from "../../atoms/TreeGridCell";
import type { ComponentPropsWithRef } from "react";
import { validateTreeGridRows } from "../../../internal/treegrid/validateParts";
import { useTreeGridBody } from "./useTreeGridBody";
import styles from "./TreeGridBody.module.css";
export interface TreeGridBodyProps extends ComponentPropsWithRef<"tbody"> {}

export function TreeGridBody(props: TreeGridBodyProps) {
  const view = useTreeGridBody(props);

  return (
    <tbody
      {...view.props}
      role="rowgroup"
      className={[styles.root, view.className].filter(Boolean).join(" ")}
    >
      {view.children === undefined
        ? view.grid.renderedRows
        : validateTreeGridRows(
            view.children,
            view.grid.rows.map((row) => row.node.key),
            view.grid.columns.map((column) => column.key),
            TreeGridRow,
            TreeGridCell,
          )}
    </tbody>
  );
}

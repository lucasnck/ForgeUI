"use client";
import { TreeGridCell } from "../../atoms/TreeGridCell";
import type { NativeTreeGridRowProps } from "../../../types";
import { validateTreeGridCells } from "../../../internal/treegrid/validateParts";
import { useTreeGridRow } from "./useTreeGridRow";
import styles from "./TreeGridRow.module.css";
export interface TreeGridRowProps extends NativeTreeGridRowProps {
  rowKey: string;
}

export function TreeGridRow(props: TreeGridRowProps) {
  const view = useTreeGridRow(props);

  return (
    <tr
      {...view.props}
      role="row"
      tabIndex={undefined}
      aria-level={view.row.level}
      aria-posinset={view.row.position}
      aria-setsize={view.row.siblingCount}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
    >
      {validateTreeGridCells(view.children, view.row.node.key, view.columns, TreeGridCell)}
    </tr>
  );
}

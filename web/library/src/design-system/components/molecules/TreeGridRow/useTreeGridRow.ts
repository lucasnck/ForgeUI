"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridRowProps } from "./TreeGridRow";

export function useTreeGridRow(input: TreeGridRowProps) {
  const { rowKey, children, className, ...props } = input;
  const grid = useTreeGridContext();
  const row = grid.rows.find((entry) => entry.node.key === rowKey);
  if (!row) throw new Error("TreeGridRow requires a visible root key.");
  return { props, className, children, row, columns: grid.columns.map((column) => column.key) };
}

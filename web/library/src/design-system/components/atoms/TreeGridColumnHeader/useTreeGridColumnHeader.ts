"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridColumnHeaderProps } from "./TreeGridColumnHeader";

export function useTreeGridColumnHeader(input: TreeGridColumnHeaderProps) {
  const { columnKey, label, className, ...props } = input;
  const grid = useTreeGridContext();
  if (
    !grid.columns.some((column) => column.key === columnKey) ||
    !label.trim() ||
    ("children" in input && input.children != null)
  )
    throw new Error("TreeGridColumnHeader requires a root column and plain label.");
  return { props, className, columnKey, label, grid };
}

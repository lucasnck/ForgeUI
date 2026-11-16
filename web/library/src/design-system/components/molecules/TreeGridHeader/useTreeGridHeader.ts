"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridHeaderProps } from "./TreeGridHeader";

export function useTreeGridHeader(input: TreeGridHeaderProps) {
  const { children, className, ...props } = input;
  const grid = useTreeGridContext();

  return { props, className, children, grid };
}

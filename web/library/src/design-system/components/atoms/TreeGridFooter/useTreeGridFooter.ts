"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridFooterProps } from "./TreeGridFooter";

export function useTreeGridFooter(input: TreeGridFooterProps) {
  const { children, className, ...props } = input;
  useTreeGridContext();
  return { props, className, children };
}

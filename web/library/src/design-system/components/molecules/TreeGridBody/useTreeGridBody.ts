"use client";
import { useTreeGridContext } from "../../../internal/treegrid/TreeGridContext";
import type { TreeGridBodyProps } from "./TreeGridBody";

export function useTreeGridBody(input: TreeGridBodyProps) {
  const { children, className, ...props } = input;
  const grid = useTreeGridContext();

  return { props, className, children, grid };
}

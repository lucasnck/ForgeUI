"use client";
import { useTreeContext } from "../../../internal/tree/TreeContext";
import type { TreeGroupProps } from "./TreeGroup";

export function useTreeGroup(input: TreeGroupProps) {
  const { parentKey, nodes, level, className, ...props } = input;
  const tree = useTreeContext();

  return { props, className, nodes, level, hidden: !tree.isExpanded(parentKey) };
}

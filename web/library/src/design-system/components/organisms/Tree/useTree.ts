"use client";
import { useRef } from "react";
import { useTreeNavigation } from "../../../hooks/tree/useTreeNavigation";
import { indexTree } from "../../../helpers/tree";
import type { TreeProps } from "./Tree";

export function useTree(input: TreeProps) {
  const {
    nodes,
    value,
    defaultValue,
    onValueChange,
    expandedValue,
    defaultExpandedValue,
    onExpandedValueChange,
    label,
    children,
    animated = true,
    className,
    ...props
  } = input;
  if (!label.trim() || [...indexTree(nodes).values()].some((node) => !node.label.trim()))
    throw new Error("Tree requires nonempty plain labels.");
  const bodyRef = useRef<HTMLUListElement>(null);
  const tree = useTreeNavigation({
    nodes,
    value,
    defaultValue,
    onValueChange,
    expandedValue,
    defaultExpandedValue,
    onExpandedValueChange,
    fallbackRef: bodyRef,
  });

  return {
    props,
    children,
    className,
    context: {
      ...tree,
      label,
      nodes,
      bodyRef,
      fallback: !tree.visibleNodes.some((entry) => !entry.node.disabled),
      animated,
    },
  };
}

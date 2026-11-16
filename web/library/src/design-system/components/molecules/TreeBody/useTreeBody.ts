"use client";
import { useImperativeHandle } from "react";
import { useTreeContext } from "../../../internal/tree/TreeContext";
import type { TreeBodyProps } from "./TreeBody";

export function useTreeBody(input: TreeBodyProps) {
  const { ref, className, ...props } = input;
  const tree = useTreeContext();
  useImperativeHandle(ref, () => tree.bodyRef.current!, [tree.bodyRef]);
  return {
    props,
    className,
    bodyRef: tree.bodyRef,
    label: tree.label,
    nodes: tree.nodes,
    fallback: tree.fallback,
  };
}

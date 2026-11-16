"use client";
import { useTreeContext } from "../../../internal/tree/TreeContext";
import type { TreeFooterProps } from "./TreeFooter";

export function useTreeFooter(input: TreeFooterProps) {
  useTreeContext();
  return input;
}

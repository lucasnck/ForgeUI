"use client";
import { useTreeContext } from "../../../internal/tree/TreeContext";
import type { TreeHeaderProps } from "./TreeHeader";

export function useTreeHeader(input: TreeHeaderProps) {
  useTreeContext();
  return input;
}

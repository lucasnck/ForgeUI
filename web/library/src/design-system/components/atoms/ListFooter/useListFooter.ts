"use client";

import { useListContext } from "../../../internal/list/ListContext";
import type { ListFooterProps } from "./ListFooter";

export function useListFooter(input: ListFooterProps) {
  const { children, className, ...props } = input;
  const context = useListContext();

  return { children, className, props, context };
}

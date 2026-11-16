"use client";

import { useListContext } from "../../../internal/list/ListContext";
import type { ListHeaderProps } from "./ListHeader";

export function useListHeader(input: ListHeaderProps) {
  const { children, className, ...props } = input;
  const context = useListContext();

  return { children, className, props, context };
}

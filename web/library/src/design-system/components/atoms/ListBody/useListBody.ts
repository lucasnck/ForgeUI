"use client";

import { useListContext } from "../../../internal/list/ListContext";
import type { ListBodyProps } from "./ListBody";

export function useListBody(input: ListBodyProps) {
  const { children, className, ...props } = input;
  const context = useListContext();

  return { children, className, props, context };
}

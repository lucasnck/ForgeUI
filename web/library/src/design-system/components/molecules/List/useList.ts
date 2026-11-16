"use client";

import { useId } from "react";
import type { ListProps } from "./List";

export function useList(input: ListProps) {
  const { children, className, label, ...props } = input;
  const titleId = useId();

  return { children, className, props, titleId, label };
}

"use client";
import { useCollapseContext } from "../../../internal/collapse/CollapseContext";
import type { CollapseFooterProps } from "./CollapseFooter";

export function useCollapseFooter(input: CollapseFooterProps) {
  useCollapseContext();
  const { children, className, ...props } = input;

  return { children, className, props };
}

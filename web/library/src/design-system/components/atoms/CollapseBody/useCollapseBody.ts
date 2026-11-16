"use client";
import { useCollapseContext } from "../../../internal/collapse/CollapseContext";
import type { CollapseBodyProps } from "./CollapseBody";

export function useCollapseBody(input: CollapseBodyProps) {
  useCollapseContext();
  const { children, className, ...props } = input;

  return { children, className, props };
}

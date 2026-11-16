"use client";
import { createContext, useContext } from "react";
import type { CollapseContract } from "../../types/disclosure";
import type { ComponentAnimatedProps } from "../../types/animation";

export interface CollapseContextValue extends CollapseContract, Required<ComponentAnimatedProps> {}

export const CollapseContext = createContext<CollapseContextValue | null>(null);

export function useCollapseContext() {
  const context = useContext(CollapseContext);
  if (!context) throw new Error("Collapse parts must be inside Collapse.");
  return context;
}

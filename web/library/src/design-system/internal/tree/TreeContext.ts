"use client";
import { createContext, useContext } from "react";
import type { RefObject } from "react";
import type { TreeNavigationContract, TreeNodeDescriptor } from "../../types";
export interface TreeContextValue extends TreeNavigationContract {
  label: string;
  nodes: readonly TreeNodeDescriptor[];
  bodyRef: RefObject<HTMLUListElement | null>;
  fallback: boolean;
  animated: boolean;
}
export const TreeContext = createContext<TreeContextValue | null>(null);

export function useTreeContext() {
  const context = useContext(TreeContext);
  if (!context) throw new Error("Tree parts must be inside Tree.");
  return context;
}

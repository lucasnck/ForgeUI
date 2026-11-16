"use client";
import { createContext, useContext } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import type { GridCellAddress, GridNavigationContract, VisibleTreeNode } from "../../types";

export interface TreeGridContextValue {
  renderedRows: readonly ReactNode[];
  columns: readonly { key: string; header: string }[];
  hasHeader: boolean;
  animated: boolean;
  rows: readonly VisibleTreeNode[];
  navigation: GridNavigationContract;
  headerId(key: string): string;
  branchCellExpanded(address: GridCellAddress): boolean | undefined;
  onCellKeyDown(event: KeyboardEvent<HTMLElement>, address: GridCellAddress): void;
}
export const TreeGridContext = createContext<TreeGridContextValue | null>(null);

export function useTreeGridContext(): TreeGridContextValue {
  const value = useContext(TreeGridContext);
  if (!value) throw new Error("TreeGrid parts must be inside TreeGrid.");
  return value;
}

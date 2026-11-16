import type { RefObject, KeyboardEvent } from "react";
import type { NavigationDirection } from "./focus";

export interface GridCellAddress {
  rowKey: string;
  columnKey: string;
}

export interface GridNavigationOptions {
  rowKeys: readonly string[];
  columnKeys: readonly string[];
  direction?: NavigationDirection;
  pageRows?: number;
  fallbackRef?: RefObject<HTMLElement | null>;
  resolveRemovedCell?(previous: GridCellAddress): GridCellAddress | null;
}

export interface GridNavigationContract {
  active: GridCellAddress | null;
  registerCell(address: GridCellAddress, ref: RefObject<HTMLElement | null>): () => void;
  tabIndex(address: GridCellAddress): number;
  onCellFocus(address: GridCellAddress): void;
  focusCell(address: GridCellAddress): void;
  onCellKeyDown(event: KeyboardEvent<HTMLElement>, address: GridCellAddress): void;
}

"use client";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { DataGridColumn, DataGridSort } from "../../types/collection-contracts";
export interface DataGridContextValue {
  renderedRows: ReactNode;
  columns: readonly Pick<
    DataGridColumn<never>,
    "key" | "header" | "rowHeader" | "sortable" | "sortLabel" | "align"
  >[];
  rowKeys: readonly string[];
  sort: DataGridSort | null;
  requestSort(key: string): void;
  headerId(key: string): string;
  rowId(key: string): string;
  rowHeaderId(key: string): string;
}
export const DataGridContext = createContext<DataGridContextValue | null>(null);

export function useDataGridContext() {
  const context = useContext(DataGridContext);
  if (!context) throw new Error("DataGrid parts require DataGrid");
  return context;
}

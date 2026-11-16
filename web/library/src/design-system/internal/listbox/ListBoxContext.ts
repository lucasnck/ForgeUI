"use client";
import { createContext, useContext } from "react";
import type { RefObject, AriaAttributes } from "react";
import type { ListBoxOption, ListBoxStateContract, SelectionMode } from "../../types";
export interface ListBoxContextValue extends ListBoxStateContract {
  label: string;
  options: readonly ListBoxOption[];
  selectionMode: SelectionMode;
  disabled: boolean;
  invalid: AriaAttributes["aria-invalid"];
  listboxId: string;
  describedBy?: string;
  animated: boolean;
  bodyRef: RefObject<HTMLUListElement | null>;
}
export const ListBoxContext = createContext<ListBoxContextValue | null>(null);

export function useListBoxContext() {
  const context = useContext(ListBoxContext);
  if (!context) throw new Error("ListBox parts must be inside ListBox.");
  return context;
}

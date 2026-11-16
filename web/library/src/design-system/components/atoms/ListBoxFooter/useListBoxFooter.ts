"use client";
import { useListBoxContext } from "../../../internal/listbox/ListBoxContext";
import type { ListBoxFooterProps } from "./ListBoxFooter";

export function useListBoxFooter(input: ListBoxFooterProps) {
  useListBoxContext();
  return input;
}

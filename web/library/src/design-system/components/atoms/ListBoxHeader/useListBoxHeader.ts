"use client";
import { useListBoxContext } from "../../../internal/listbox/ListBoxContext";
import type { ListBoxHeaderProps } from "./ListBoxHeader";

export function useListBoxHeader(input: ListBoxHeaderProps) {
  useListBoxContext();
  return input;
}

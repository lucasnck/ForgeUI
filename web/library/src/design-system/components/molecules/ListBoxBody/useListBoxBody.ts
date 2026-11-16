"use client";
import { useImperativeHandle } from "react";
import { useListBoxContext } from "../../../internal/listbox/ListBoxContext";
import type { ListBoxBodyProps } from "./ListBoxBody";

export function useListBoxBody(input: ListBoxBodyProps) {
  const { ref, className, children: ignoredChildren, ...props } = input;
  if (ignoredChildren != null) throw new Error("ListBoxBody owns option rendering.");
  const list = useListBoxContext();
  useImperativeHandle(ref, () => list.bodyRef.current!, [list.bodyRef]);
  const fallback = !list.options.some((option) => !option.disabled) || list.disabled;

  return {
    props,
    className,
    bodyRef: list.bodyRef,
    options: list.options,
    id: list.listboxId,
    label: list.label,
    describedBy: list.describedBy,
    multiple: list.selectionMode === "multiple",
    invalid: list.invalid,
    fallback,
  };
}

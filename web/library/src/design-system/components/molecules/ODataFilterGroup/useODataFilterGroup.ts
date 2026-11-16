"use client";
import { useId, type ChangeEvent } from "react";
import type { ODataFilterGroupProps } from "./ODataFilterGroup";

export function useODataFilterGroup({
  value,
  onValueChange,
  labels,
  label,
  onAddCondition,
  onAddGroup,
  onRemove,
  children,
  disabled,
  className,
  ...props
}: ODataFilterGroupProps) {
  const id = useId();
  if (!label.trim()) throw new Error("Filter groups require distinct accessible names.");

  function change(event: ChangeEvent<HTMLSelectElement>) {
    const next = event.currentTarget.value;
    if (!disabled && (next === "and" || next === "or")) onValueChange(next);
  }

  function addCondition() {
    if (!disabled) onAddCondition?.();
  }

  function addGroup() {
    if (!disabled) onAddGroup?.();
  }

  function remove() {
    if (!disabled) onRemove?.();
  }

  return {
    id,
    value,
    labels,
    label,
    onAddCondition,
    onAddGroup,
    onRemove,
    children,
    disabled,
    className,
    props,
    change,
    addCondition,
    addGroup,
    remove,
  };
}

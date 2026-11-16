"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useRovingFocus } from "../focus";
import type { ListBoxStateContract, ListBoxStateOptions } from "../../types/listbox-state";

export function useListBoxState(options: ListBoxStateOptions): ListBoxStateContract {
  const keys = options.options.map((option) => option.value);

  if (keys.some((key) => !key.trim()) || new Set(keys).size !== keys.length) {
    throw new Error("ListBox option values must be nonempty and unique.");
  }

  const [localValue, setLocalValue] = useState<readonly string[]>(options.defaultValue ?? []);
  const supplied = [...new Set(options.value ?? localValue)];
  const selected = options.selectionMode === "multiple" ? supplied : supplied.slice(0, 1);
  const focus = useRovingFocus({
    orientation: "vertical",
    loop: false,
    typeahead: true,
    fallbackRef: options.fallbackRef,
    initialId: selected.find((key) =>
      options.options.some((option) => option.value === key && !option.disabled),
    ),
  });

  function select(key: string): void {
    const option = options.options.find((option) => option.value === key);
    if (!option || option.disabled || options.disabled) return;
    const next =
      options.selectionMode === "multiple"
        ? selected.includes(key)
          ? selected.filter((value) => value !== key)
          : [...selected, key]
        : [key];
    if (next.length === selected.length && next.every((value, index) => value === selected[index]))
      return;
    if (options.value === undefined) setLocalValue(next);
    options.onValueChange?.(next);
  }

  function onOptionKeyDown(event: KeyboardEvent<HTMLElement>, key: string): void {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      event.shiftKey ||
      options.disabled
    )
      return;
    const option = options.options.find((candidate) => candidate.value === key);
    if (!option || option.disabled) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      select(key);
    } else focus.onKeyDown(event);
  }

  return {
    selected,
    focus,
    isSelected: (key) => selected.includes(key),
    select,
    onOptionKeyDown,
    reset: () => {
      if (options.value === undefined) setLocalValue(options.defaultValue ?? []);
    },
  };
}

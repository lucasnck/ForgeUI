"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { DisclosureGroupContract, DisclosureGroupOptions } from "../../types/disclosure";

export function useDisclosureGroup(options: DisclosureGroupOptions = {}): DisclosureGroupContract {
  const [localValue, setLocalValue] = useState<readonly string[]>(options.defaultValue ?? []);
  const registry = useRef(new Map<string, { disabled: boolean }>());
  const supplied = [...new Set(options.value ?? localValue)];
  const value = options.multiple ? supplied : supplied.slice(0, 1);
  const latest = useRef(value);

  useLayoutEffect(() => {
    latest.current = value;
  }, [value]);

  const registerItem = useCallback((key: string, disabled = false) => {
    if (!key.trim() || registry.current.has(key)) {
      throw new Error("Disclosure item keys must be nonempty and unique: " + key);
    }

    const entry = { disabled };
    registry.current.set(key, entry);

    return () => {
      if (registry.current.get(key) === entry) registry.current.delete(key);
    };
  }, []);

  function setExpanded(key: string, nextOpen: boolean): void {
    const entry = registry.current.get(key);
    if (options.disabled || !entry || entry.disabled) return;
    const current = latest.current;
    if (current.includes(key) === nextOpen || (!nextOpen && options.collapsible === false)) return;
    const next = nextOpen
      ? options.multiple
        ? [...current, key]
        : [key]
      : current.filter((item) => item !== key);

    if (options.value === undefined) {
      latest.current = next;
      setLocalValue(next);
    }

    options.onValueChange?.(next);
  }

  return {
    disabled: options.disabled ?? false,
    value,
    registerItem,
    isExpanded: (key) => value.includes(key),
    setExpanded,
    toggle: (key) => setExpanded(key, !latest.current.includes(key)),
  };
}

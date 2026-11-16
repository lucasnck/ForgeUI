"use client";
import { useState } from "react";

import { indexTree, visibleTree } from "../../helpers/tree";

import type { TreeStateContract, TreeStateOptions } from "../../types/tree";

export function useTreeState(options: TreeStateOptions): TreeStateContract {
  const [localSelected, setLocalSelected] = useState<string | null>(options.defaultValue ?? null);
  const [localExpanded, setLocalExpanded] = useState<readonly string[]>(
    options.defaultExpandedValue ?? [],
  );
  const selected = options.value === undefined ? localSelected : options.value;
  const expanded = options.expandedValue ?? localExpanded;
  const byKey = indexTree(options.nodes);
  const visibleNodes = visibleTree(options.nodes, expanded);

  function setExpanded(key: string, open: boolean) {
    const node = byKey.get(key);
    if (!node?.children?.length || node.disabled || expanded.includes(key) === open) return;
    const next = open ? [...expanded, key] : expanded.filter((value) => value !== key);
    if (options.expandedValue === undefined) setLocalExpanded(next);
    options.onExpandedValueChange?.(next);
  }

  function select(key: string) {
    const node = byKey.get(key);
    if (!node || node.disabled || selected === key) return;
    if (options.value === undefined) setLocalSelected(key);
    options.onValueChange?.(key);
  }

  return {
    selected,
    expanded,
    visibleNodes,
    isExpanded: (key) => expanded.includes(key),
    setExpanded,
    select,
  };
}

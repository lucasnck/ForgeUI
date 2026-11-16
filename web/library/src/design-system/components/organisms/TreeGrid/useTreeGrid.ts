"use client";
import { useId, useLayoutEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import type { GridCellAddress, TreeGridNode, TreeNodeDescriptor } from "../../../types";
import { useTreeState } from "../../../hooks/tree/useTreeState";
import { useGridNavigation } from "../../../hooks/grid/useGridNavigation";
import type { TreeGridProps } from "./TreeGrid";

export function useTreeGrid<Row>(input: TreeGridProps<Row>) {
  const {
    nodes,
    columns,
    getNodeLabel,
    expandedValue,
    defaultExpandedValue,
    onExpandedValueChange,
    direction = "ltr",
    label,
    children,
    className,
    animated = true,
    ...props
  } = input;

  if (
    !label.trim() ||
    !columns.length ||
    columns.some((column) => !column.key.trim() || !column.header.trim()) ||
    new Set(columns.map((column) => column.key)).size !== columns.length
  ) {
    throw new Error("TreeGrid requires a label and uniquely keyed, named columns.");
  }

  const nodeByKey = new Map<string, TreeGridNode<Row>>();

  function describe(list: readonly TreeGridNode<Row>[]): readonly TreeNodeDescriptor[] {
    return list.map((node) => {
      if (!node.key.trim() || nodeByKey.has(node.key))
        throw new Error("TreeGrid keys must be nonempty, unique and acyclic.");
      nodeByKey.set(node.key, node);
      const text = getNodeLabel(node.item);
      if (!text.trim()) throw new Error("TreeGrid node labels must be nonempty.");
      return {
        key: node.key,
        label: text,
        children: node.children ? describe(node.children) : undefined,
      };
    });
  }

  const hierarchy = useTreeState({
    nodes: describe(nodes),
    expandedValue,
    defaultExpandedValue,
    onExpandedValueChange,
  });
  const tableRef = useRef<HTMLTableElement>(null);
  const previousVisible = useRef(hierarchy.visibleNodes);
  const id = useId();
  const rowKeys = hierarchy.visibleNodes.map((entry) => entry.node.key);

  function resolveRemovedCell(previous: GridCellAddress): GridCellAddress | null {
    let ancestor = previousVisible.current.find(
      (entry) => entry.node.key === previous.rowKey,
    )?.parentKey;

    while (ancestor) {
      if (rowKeys.includes(ancestor)) return { rowKey: ancestor, columnKey: previous.columnKey };
      ancestor = previousVisible.current.find((entry) => entry.node.key === ancestor)?.parentKey;
    }

    return null;
  }

  const navigation = useGridNavigation({
    rowKeys,
    columnKeys: columns.map((column) => column.key),
    direction,
    fallbackRef: tableRef,
    resolveRemovedCell,
  });
  useLayoutEffect(() => {
    previousVisible.current = hierarchy.visibleNodes;
  });

  function toggleBranch(key: string): void {
    if (!nodeByKey.get(key)?.children?.length) return;

    // Only a locally accepted request can repair focus before removing rows.
    // Controlled changes repair through the shared navigation commit policy.
    if (expandedValue === undefined && hierarchy.isExpanded(key) && navigation.active) {
      let parent = hierarchy.visibleNodes.find(
        (entry) => entry.node.key === navigation.active?.rowKey,
      )?.parentKey;

      while (parent) {
        if (
          parent === key &&
          tableRef.current?.contains(tableRef.current.ownerDocument.activeElement)
        ) {
          navigation.focusCell({ rowKey: key, columnKey: navigation.active.columnKey });
          break;
        }

        parent = hierarchy.visibleNodes.find((entry) => entry.node.key === parent)?.parentKey;
      }
    }

    hierarchy.setExpanded(key, !hierarchy.isExpanded(key));
  }

  function onCellKeyDown(event: KeyboardEvent<HTMLElement>, address: GridCellAddress): void {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      navigation.onCellKeyDown(event, address);
      return;
    }

    if (
      event.key === "Enter" &&
      address.columnKey === columns[0].key &&
      nodeByKey.get(address.rowKey)?.children?.length
    ) {
      event.preventDefault();
      toggleBranch(address.rowKey);
      return;
    }

    navigation.onCellKeyDown(event, address);
  }

  return {
    columns,
    hierarchy,
    navigation,
    nodeByKey,
    tableRef,
    onCellKeyDown,
    label,
    children,
    className,
    props,
    direction,
    animated,
    headerId: (key: string) => `${id}-column-${encodeURIComponent(key)}`,
    branchCellExpanded: (address: GridCellAddress) =>
      address.columnKey === columns[0].key && nodeByKey.get(address.rowKey)?.children?.length
        ? hierarchy.isExpanded(address.rowKey)
        : undefined,
  };
}

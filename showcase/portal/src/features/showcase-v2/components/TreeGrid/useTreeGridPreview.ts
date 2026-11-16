"use client";
import { useState } from "react";
import type { ChangeEvent, PointerEventHandler } from "react";
import type { TreeGridProps } from "@forge-ui/web";
import { visibleTree } from "../../../../../../../web/library/src/design-system/helpers/tree";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";
import {
  treeGridNodes,
  columns as baseColumns,
  filterTreeGrid,
  descriptorNodes,
  records,
  branchKeys,
} from "./fixtures";

export function useTreeGridPreview({
  partial = false,
  cellPrefix,
}: { partial?: boolean; cellPrefix?: string } = {}) {
  const copy = useResourceExampleCopy();
  const [expanded, setExpanded] = useState<readonly string[]>(["item-1"]);
  const [requested, setRequested] = useState<readonly string[] | null>(null);
  const [requests, setRequests] = useState(0);
  const [externalChanges, setExternalChanges] = useState(0);
  const [query, setQuery] = useState("");
  const nodes = filterTreeGrid(partial ? treeGridNodes.slice(0, 1) : treeGridNodes, query);
  const columns =
    cellPrefix === undefined
      ? baseColumns
      : baseColumns.map((column, index) =>
          index === 0
            ? {
                ...column,
                getCellText: (row: (typeof records)[number]) => cellPrefix + " " + row.index,
              }
            : column,
        );
  const getNodeLabel: TreeGridProps<(typeof records)[number]>["getNodeLabel"] = (row) =>
    columns[0].getCellText(row);
  const visibleRows = visibleTree(descriptorNodes(nodes), expanded).map((entry) =>
    records.find((row) => row.id === entry.node.key)!,
  );

  const expand: NonNullable<TreeGridProps<(typeof records)[number]>["onExpandedValueChange"]> = (
    next,
  ) => {
    setExpanded(next);
    setRequested(next);
    setRequests((n) => n + 1);
  };

  function search(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.value;
    setQuery(next);
    setExpanded(
      next.trim()
        ? branchKeys(filterTreeGrid(partial ? treeGridNodes.slice(0, 1) : treeGridNodes, next))
        : ["item-1"],
    );
  }

  function expandAll() {
    setExpanded(branchKeys(nodes));
    setExternalChanges((n) => n + 1);
  }

  function collapseAll() {
    setExpanded([]);
    setExternalChanges((n) => n + 1);
  }

  const preserveCellFocus: PointerEventHandler<HTMLButtonElement> = (event) => {
    if (event.button === 0) event.preventDefault();
  };

  return {
    preserveCellFocus,
    copy,
    nodes,
    columns,
    getNodeLabel,
    visibleRows,
    expanded,
    expand,
    query,
    search,
    expandAll,
    collapseAll,
    state: {
      expanded,
      requested,
      requests,
      externalChanges,
      visibleKeys: visibleRows.map((row) => row.id),
      ...(partial ? {} : { query }),
    },
  };
}

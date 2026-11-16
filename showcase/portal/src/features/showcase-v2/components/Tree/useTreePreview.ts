"use client";
import { useState } from "react";
import type { PointerEventHandler } from "react";
import type { TreeProps } from "@forge-ui/web";
import { visibleTree } from "../../../../../../../web/library/src/design-system/helpers/tree";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";
import { treeNodes, branchNodes } from "./fixtures";

export function useTreePreview({
  partial = false,
  reject = false,
}: { partial?: boolean; reject?: boolean } = {}) {
  const copy = useResourceExampleCopy();
  const nodes = partial ? branchNodes : treeNodes;
  const [value, setValue] = useState<string | null>(reject ? "item-2" : null);
  const [expanded, setExpanded] = useState<readonly string[]>(["item-1"]);
  const [rejectNext, setRejectNext] = useState(reject);
  const [requestedExpansion, setRequestedExpansion] = useState<readonly string[] | null>(null);
  const [selectionRequests, setSelectionRequests] = useState(0);
  const [expansionRequests, setExpansionRequests] = useState(0);
  const [rejections, setRejections] = useState(0);
  const [externalChanges, setExternalChanges] = useState(0);

  const select: NonNullable<TreeProps["onValueChange"]> = (next) => {
    setValue(next);
    setSelectionRequests((n) => n + 1);
  };

  const expand: NonNullable<TreeProps["onExpandedValueChange"]> = (next) => {
    setRequestedExpansion(next);
    setExpansionRequests((n) => n + 1);
    if (rejectNext) {
      setRejectNext(false);
      setRejections((n) => n + 1);
    } else setExpanded(next);
  };

  function expandAll() {
    setExpanded(partial ? ["item-1"] : ["item-1", "item-4"]);
    setExternalChanges((n) => n + 1);
  }

  function collapseAll() {
    setExpanded([]);
    setRejectNext(false);
    setExternalChanges((n) => n + 1);
  }

  const preserveTreeFocus: PointerEventHandler<HTMLButtonElement> = (event) => {
    if (event.button === 0) event.preventDefault();
  };

  const visible = visibleTree(nodes, expanded).map(
    ({ node, level, parentKey, position, siblingCount }) => ({
      key: node.key,
      level,
      parentKey,
      position,
      siblingCount,
    }),
  );

  return {
    preserveTreeFocus,
    copy,
    nodes,
    value,
    expanded,
    select,
    expand,
    expandAll,
    collapseAll,
    state: {
      value,
      expanded,
      selectionRequests,
      expansionRequests,
      requestedExpansion,
      ...(!partial ? { rejections, externalChanges, visible } : {}),
    },
  };
}

"use client";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { TreeNodeDescriptor } from "@forge-ui/web";
import { resourceNodes } from "../ResourceExamples/fixtures";

function withoutNode(
  nodes: readonly TreeNodeDescriptor[],
  key: string,
): readonly TreeNodeDescriptor[] {
  return nodes
    .filter((node) => node.key !== key)
    .map((node) => (node.children ? { ...node, children: withoutNode(node.children, key) } : node));
}

export function useTreeFixture() {
  const fallbackRef = useRef<HTMLUListElement>(null);
  const [nodes, setNodes] = useState(resourceNodes);
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<readonly string[]>([]);
  const [acceptChanges, setAcceptChanges] = useState(true);
  const [request, setRequest] = useState<unknown>(null);

  function select(next: string | null) {
    setRequest({ value: next });
    if (acceptChanges) setSelected(next);
  }

  function expand(next: readonly string[]) {
    setRequest({ expandedValue: next });
    if (acceptChanges) setExpanded(next);
  }

  function collapseAll() {
    expand([]);
  }

  function remove(key: string | null) {
    if (key) setNodes((current) => withoutNode(current, key));
  }

  function keepFocus(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return {
    fallbackRef,
    nodes,
    selected,
    expanded,
    acceptChanges,
    setAcceptChanges,
    request,
    select,
    expand,
    collapseAll,
    remove,
    keepFocus,
  };
}

"use client";
import { useState } from "react";
import { listItems } from "../List/fixtures";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useListFooterExample() {
  const copy = useResourceExampleCopy();
  const [filter, setFilter] = useState("all");
  const [reverse, setReverse] = useState(false);
  const [visible, setVisible] = useState(3);

  function showMore() {
    setVisible(6);
  }

  const items = listItems
    .slice(0, visible)
    .filter((item) => filter === "all" || (filter === "2" && item.index === 2))
    .map((item) => ({ ...item }));
  if (reverse) items.reverse();
  return {
    copy,
    filter,
    setFilter,
    reverse,
    setReverse,
    items,
    visible,
    showMore,
  };
}

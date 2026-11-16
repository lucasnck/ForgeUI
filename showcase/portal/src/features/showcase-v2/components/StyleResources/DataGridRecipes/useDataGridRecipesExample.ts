"use client";
import { useState } from "react";
import type { ComponentSize, DataGridSort } from "@forge-ui/web";
import { resourceRows, resourceColumns, resourceRowKey } from "../../ResourceExamples/fixtures";

export function useDataGridRecipesExample() {
  const [size, setSize] = useState<ComponentSize>("md");
  const [lines, setLines] = useState(true);
  const [alternating, setAlternating] = useState(true);
  const [sort, setSort] = useState<DataGridSort | null>(null);

  function changeSize(value: string) {
    setSize(value === "sm" ? "sm" : value === "lg" ? "lg" : "md");
  }

  const rows = sort?.direction === "descending" ? [...resourceRows].reverse() : resourceRows;

  return {
    size,
    changeSize,
    lines,
    setLines,
    alternating,
    setAlternating,
    sort,
    setSort,
    rows,
    columns: resourceColumns,
    getRowKey: resourceRowKey,
  };
}

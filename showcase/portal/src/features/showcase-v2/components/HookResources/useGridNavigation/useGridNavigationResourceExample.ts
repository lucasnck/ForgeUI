"use client";
import { useRef, useState } from "react";
import { useGridNavigation } from "@forge-ui/web";
import type { NavigationDirection } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";
export const columnKeys = ["column-1", "column-2"];

export function useGridNavigationResourceExample() {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [rowKeys, setRows] = useState(["row-1", "row-2", "row-3"]);
  const [direction, setDirection] = useState<NavigationDirection>("ltr");
  const grid = useGridNavigation({
    rowKeys,
    columnKeys,
    direction,
    pageRows: 2,
    fallbackRef,
  });

  function changeDirection(value: string) {
    if (value === "ltr" || value === "rtl") setDirection(value);
  }

  function remove() {
    setRows((rows) => rows.filter((row) => row !== grid.active?.rowKey));
  }

  const copy = useResourceExampleCopy();

  return {
    grid,
    fallbackRef,
    rowKeys,
    direction,
    changeDirection,
    remove,
    copy,
  };
}

"use client";
import type { DataGridRowProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useGridPartExample } from "../DataGrid/useGridPartExample";

export function useDataGridRowExample() {
  const { properties } = useExampleProperties<Pick<DataGridRowProps, "title">>("DataGridRow");
  const grid = useGridPartExample();
  useExamplePropertySnapshot("DataGridRow", { title: "Title" });
  return { ...grid, properties };
}

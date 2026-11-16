"use client";
import type { DataGridBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useGridPartExample } from "../DataGrid/useGridPartExample";

export function useDataGridBodyExample() {
  const { properties } = useExampleProperties<Pick<DataGridBodyProps, "title">>("DataGridBody");
  const grid = useGridPartExample();
  useExamplePropertySnapshot("DataGridBody", { title: "Title" });
  return { ...grid, properties };
}

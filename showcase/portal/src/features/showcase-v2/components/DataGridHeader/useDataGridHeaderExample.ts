"use client";
import type { DataGridHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useGridPartExample } from "../DataGrid/useGridPartExample";

export function useDataGridHeaderExample() {
  const { properties } = useExampleProperties<Pick<DataGridHeaderProps, "title">>("DataGridHeader");
  const grid = useGridPartExample();
  useExamplePropertySnapshot("DataGridHeader", { title: "Title" });
  return { ...grid, properties };
}

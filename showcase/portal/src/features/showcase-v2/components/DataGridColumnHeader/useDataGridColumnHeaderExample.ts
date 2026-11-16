"use client";
import type { DataGridColumnHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useGridPartExample } from "../DataGrid/useGridPartExample";

export function useDataGridColumnHeaderExample() {
  const { properties } =
    useExampleProperties<Pick<DataGridColumnHeaderProps, "label">>("DataGridColumnHeader");
  const grid = useGridPartExample(properties.label ?? "Header");
  useExamplePropertySnapshot("DataGridColumnHeader", { label: "Header" });
  return { ...grid, properties };
}

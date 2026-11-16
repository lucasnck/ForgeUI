"use client";
import { useState } from "react";
import type { DataGridCellProps, DataGridColumn, DataGridSort } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { records, type ExampleRecord } from "../DataGrid/data-grid.fixtures";

export function useDataGridCellExample() {
  const { properties } =
    useExampleProperties<Pick<DataGridCellProps, "children" | "title" | "rowHeader">>(
      "DataGridCell",
    );
  const [sort, setSort] = useState<DataGridSort | null>(null);
  const [calls, setCalls] = useState(0);

  function changeSort(next: DataGridSort) {
    setSort(next);
    setCalls((n) => n + 1);
  }

  const rows = [...records.slice(0, 3)];
  if (sort)
    rows.sort(
      (a, b) => (sort.direction === "descending" ? -1 : 1) * a.title.localeCompare(b.title),
    );
  const columns: readonly DataGridColumn<ExampleRecord>[] = [
    {
      key: "title",
      header: "Header 1",
      rowHeader: properties.rowHeader ?? true,
      sortable: true,
      sortLabel: "Header 1",
      renderCell: (row) => row.title,
    },
    {
      key: "description",
      header: "Header 2",
      renderCell: (row) => row.description,
    },
  ];
  useExamplePropertySnapshot("DataGridCell", {
    children: "Children",
    title: "Title",
    rowHeader: true,
  });
  return {
    properties,
    rows,
    columns,
    sort,
    changeSort,
    state: { sort, calls },
    index: (row: ExampleRecord) => row.index,
  };
}

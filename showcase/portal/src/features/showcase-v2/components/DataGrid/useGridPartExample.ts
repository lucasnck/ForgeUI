"use client";
import { useState } from "react";
import type { DataGridColumn, DataGridSort } from "@forge-ui/web";
import { records, type ExampleRecord } from "./data-grid.fixtures";

export function useGridPartExample(prefix = "Header") {
  const [sort, setSort] = useState<DataGridSort | null>(null);
  const [calls, setCalls] = useState(0);

  function changeSort(next: DataGridSort) {
    setSort(next);
    setCalls((n) => n + 1);
  }

  const rows = [...records.slice(0, 3)];

  if (sort) {
    const key = sort.columnKey === "description" ? "description" : "title";
    rows.sort((a, b) => (sort.direction === "descending" ? -1 : 1) * a[key].localeCompare(b[key]));
  }

  const columns: readonly DataGridColumn<ExampleRecord>[] = [
    {
      key: "title",
      header: prefix + " 1",
      rowHeader: true,
      sortable: true,
      sortLabel: prefix + " 1",
      renderCell: (row) => row.title,
    },
    {
      key: "description",
      header: prefix + " 2",
      sortable: true,
      sortLabel: prefix + " 2",
      renderCell: (row) => row.description,
    },
  ];

  return { rows, columns, sort, changeSort, state: { sort, calls } };
}

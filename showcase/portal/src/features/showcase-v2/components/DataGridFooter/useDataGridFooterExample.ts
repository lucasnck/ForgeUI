"use client";
import { useState } from "react";
import type { DataGridFooterProps, DataGridColumn } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { records, type ExampleRecord } from "../DataGrid/data-grid.fixtures";

export function useDataGridFooterExample() {
  const { properties } = useExampleProperties<Pick<DataGridFooterProps, "title">>("DataGridFooter");
  const [page, setPage] = useState(1);
  const [calls, setCalls] = useState(0);

  function changePage(next: number) {
    setPage(next);
    setCalls((n) => n + 1);
  }

  const rows = records.slice((page - 1) * 4, page * 4);
  const columns: readonly DataGridColumn<ExampleRecord>[] = [
    {
      key: "title",
      header: "Header 1",
      rowHeader: true,
      renderCell: (row) => row.title,
    },
    {
      key: "description",
      header: "Header 2",
      renderCell: (row) => row.description,
    },
  ];
  useExamplePropertySnapshot("DataGridFooter", { title: "Title" });
  return {
    properties,
    page,
    rows,
    columns,
    pageCount: 3,
    changePage,
    state: {
      page,
      calls,
      visible: rows.map((row) => row.id),
      total: records.length,
    },
  };
}

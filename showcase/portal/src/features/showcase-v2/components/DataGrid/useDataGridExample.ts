"use client";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { DataGridProps } from "@forge-ui/web";
import { useForgePreferences } from "../../preferences/ForgePreferences";
import { records, type ExampleRecord } from "./data-grid.fixtures";
const copy = {
  "pt-BR": {
    sort: "Ordenar",
    empty: "Nenhum resultado",
    visible: "Visíveis",
    total: "Total",
    page: "Página",
    search: "Pesquisar Title",
    clear: "Limpar pesquisa",
  },
  es: {
    sort: "Ordenar",
    empty: "Sin resultados",
    visible: "Visibles",
    total: "Total",
    page: "Página",
    search: "Buscar Title",
    clear: "Limpiar búsqueda",
  },
  en: {
    sort: "Sort",
    empty: "No results",
    visible: "Visible",
    total: "Total",
    page: "Page",
    search: "Search Title",
    clear: "Clear search",
  },
};

export function useDataGridExample(paginated = false) {
  const { locale } = useForgePreferences();
  const messages = copy[locale === "en" ? "en" : "pt-BR"];
  const [sort, setSort] = useState<DataGridProps<ExampleRecord>["sort"]>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showBorders, setShowBorders] = useState(true);
  const [showColumnLines, setShowColumnLines] = useState(false);
  const [showRowLines, setShowRowLines] = useState(true);
  const [rowAlternationEnabled, setRowAlternationEnabled] = useState(true);
  const [size, setSize] = useState<NonNullable<DataGridProps<ExampleRecord>["size"]>>("md");
  const [feedback, setFeedback] = useState("onSortChange: —");
  const filtered = records.filter((row) => row.title.toLowerCase().includes(query.toLowerCase()));
  const ordered = [...filtered].sort((a, b) => {
    if (!sort) return 0;
    const key = sort.columnKey === "description" ? "description" : "title";
    const result = a[key].localeCompare(b[key], "en", { numeric: true });

    return sort.direction === "ascending" ? result : -result;
  });
  const pageCount = Math.max(1, Math.ceil(ordered.length / 5));
  const rows = paginated ? ordered.slice((page - 1) * 5, page * 5) : ordered;

  function onSortChange(next: NonNullable<DataGridProps<ExampleRecord>["sort"]>) {
    setSort(next);
    setFeedback(`onSortChange: ${next.columnKey}, ${next.direction}`);
  }

  function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setPage(1);
    setFeedback(`onChange: ${event.target.value}`);
  }

  function onPageChange(next: number) {
    setPage(next);
    setFeedback(`onPageChange: ${next}`);
  }

  function changeSize(value: string) {
    setSize(value as NonNullable<DataGridProps<ExampleRecord>["size"]>);
  }

  const columns = [
    {
      key: "title",
      header: "Header 1",
      rowHeader: true,
      sortable: true,
      sortLabel: `${messages.sort} Header 1`,
      renderCell: (row: ExampleRecord) => row.title,
    },
    {
      key: "description",
      header: "Header 2",
      sortable: true,
      sortLabel: `${messages.sort} Header 2`,
      renderCell: (row: ExampleRecord) => row.description,
    },
  ];

  return {
    messages,
    rows,
    columns,
    sort,
    onSortChange,
    query,
    onSearchChange,
    page,
    pageCount,
    onPageChange,
    total: filtered.length,
    feedback,
    size,
    changeSize,
    showBorders,
    setShowBorders,
    showColumnLines,
    setShowColumnLines,
    showRowLines,
    setShowRowLines,
    rowAlternationEnabled,
    setRowAlternationEnabled,
  };
}

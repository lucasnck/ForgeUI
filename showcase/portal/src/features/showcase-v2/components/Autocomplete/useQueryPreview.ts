"use client";
import { useState } from "react";
import { filterQueryOptions } from "./fixtures";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useQueryPreview() {
  const copy = useResourceExampleCopy();
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [queries, setQueries] = useState(0);
  const [selections, setSelections] = useState(0);

  function changeQuery(next: string) {
    setQuery(next);
    setQueries((n) => n + 1);
  }

  function select(next: string | null) {
    setSelectedValue(next);
    setSelections((n) => n + 1);
  }

  function clear() {
    changeQuery("");
    select(null);
  }

  return {
    copy,
    query,
    selectedValue,
    changeQuery,
    select,
    clear,
    filterQueryOptions,
    queries,
    selections,
  };
}

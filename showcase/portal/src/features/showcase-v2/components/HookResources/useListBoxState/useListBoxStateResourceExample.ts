"use client";
import { useRef, useState } from "react";
import { useListBoxState } from "@forge-ui/web";
import type { SelectionMode } from "@forge-ui/web";
import { resourceOptions } from "../../ResourceExamples/fixtures";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useListBoxStateResourceExample() {
  const fallbackRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SelectionMode>("multiple");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [acceptChanges, setAcceptChanges] = useState(true);
  const [requested, setRequested] = useState<readonly string[]>([]);
  const options = resourceOptions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  function change(next: readonly string[]) {
    setRequested(next);
    if (acceptChanges) setSelected(next);
  }

  function changeMode(next: string) {
    if (next === "single" || next === "multiple") {
      setMode(next);
      setSelected([]);
      setRequested([]);
    }
  }

  function clear() {
    setSelected([]);
    setRequested([]);
  }

  const state = useListBoxState({
    options,
    selectionMode: mode,
    value: selected,
    onValueChange: change,
    fallbackRef,
  });
  const copy = useResourceExampleCopy();

  return {
    fallbackRef,
    query,
    setQuery,
    mode,
    changeMode,
    acceptChanges,
    setAcceptChanges,
    options,
    state,
    requested,
    copy,
    clear,
  };
}

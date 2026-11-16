"use client";
import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import type { FormProps, SelectionMode } from "@forge-ui/web";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";
import { listBoxOptions } from "./fixtures";

export function useListBoxPreview({
  mode = "single",
  label = "Label",
  firstDisabled = false,
  count = 5,
  name = "Name",
  visual,
}: {
  mode?: SelectionMode;
  label?: string;
  firstDisabled?: boolean;
  count?: number;
  name?: string;
  visual?: import("@forge-ui/web").VisualProps;
} = {}) {
  const formId = useId();
  const copy = useResourceExampleCopy();
  const [retained, setRetained] = useState<readonly string[]>([]);
  const [requested, setRequested] = useState<readonly string[]>([]);
  const [calls, setCalls] = useState(0);
  const [clears, setClears] = useState(0);
  const [query, setQuery] = useState("");
  const [submissions, setSubmissions] = useState(0);
  const [lastNativeValues, setLastNativeValues] = useState<readonly FormDataEntryValue[]>([]);
  const value = mode === "single" ? retained.slice(0, 1) : retained;
  const options = listBoxOptions(label, firstDisabled, visual)
    .slice(0, count)
    .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  function change(next: readonly string[]) {
    setRetained(next);
    setRequested(next);
    setCalls((n) => n + 1);
  }

  function clear() {
    setRetained([]);
    setClears((n) => n + 1);
  }

  function search(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  const capture: FormProps["onValidSubmit"] = (data) => {
    setLastNativeValues(data.getAll(name));
    setSubmissions((n) => n + 1);
  };

  const visibleSelected = value.filter((key) =>
    options.some((option) => option.value === key && !option.disabled),
  );
  const available = options.filter((option) => !option.disabled).length;

  return {
    formId,
    copy,
    value,
    options,
    mode,
    query,
    search,
    change,
    clear,
    capture,
    available,
    visibleSelected,
    state: {
      value,
      visibleSelected,
      requested,
      calls,
      clears,
      submissions,
      lastNativeValues,
    },
  };
}

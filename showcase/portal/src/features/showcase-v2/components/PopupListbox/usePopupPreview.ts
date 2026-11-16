"use client";
import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import { usePopupListbox } from "@forge-ui/web";
import { queryOptions } from "./fixtures";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function usePopupPreview(labelPrefix = "Label") {
  const id = useId();
  const copy = useResourceExampleCopy();
  const [query, setQuery] = useState("");
  const [accepted, setAccepted] = useState<string | null>(null);
  const [accepts, setAccepts] = useState(0);
  const options = queryOptions
    .filter((item) => !item.disabled)
    .map((item) => ({
      ...item,
      label: labelPrefix + " " + item.value.split("-").at(-1),
    }))
    .filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));
  const popup = usePopupListbox({
    id,
    count: options.length,
    queryKey: accepted ? null : JSON.stringify([query, labelPrefix]),
    onAcceptOption(index) {
      const item = options[index];

      if (item) {
        setQuery(item.label);
        setAccepted(item.value);
        setAccepts((n) => n + 1);
      }
    },
  });

  function change(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setAccepted(null);
  }

  function clear() {
    setQuery("");
    setAccepted(null);
  }

  return {
    id,
    copy,
    query,
    change,
    clear,
    popup,
    options,
    state: {
      query,
      accepted,
      accepts,
      isOpen: popup.isOpen,
      activeIndex: popup.activeIndex,
    },
  };
}

"use client";
import { useId, useRef, useState } from "react";
import type { ODataFilterExpression } from "@forge-ui/web";
import { useODataFilterExample } from "./useODataFilterExample";
import { filterRecords } from "./fixtures";

export function useODataFilterPlacementExample() {
  const view = useODataFilterExample();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const applied = useRef(view.expression);

  function apply(value: ODataFilterExpression, filter: string) {
    applied.current = value;
    view.apply(value, filter);
    setOpen(false);
  }

  function cancel() {
    view.change(applied.current);
    view.cancel();
    setOpen(false);
  }

  function changeOpen(next: boolean) {
    if (!next) cancel();
    else setOpen(true);
  }

  return {
    ...view,
    titleId,
    open,
    apply,
    cancel,
    changeOpen,
    rows: filterRecords.filter((row) => view.state.result.includes(row.id)),
    state: { ...view.state, open },
  };
}

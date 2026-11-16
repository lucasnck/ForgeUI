"use client";
import { useState } from "react";
import type { ODataFilterExpression } from "@forge-ui/web";
import { exactFields, exactExpression, labels } from "./fixtures";

export function useODataFilterExactExample() {
  const [expression, setExpression] = useState<ODataFilterExpression>(exactExpression);
  const [filter, setFilter] = useState("");
  const [applies, setApplies] = useState(0);

  function apply(_expression: ODataFilterExpression, serialized: string) {
    setFilter(serialized);
    setApplies((count) => count + 1);
  }

  return {
    fields: exactFields,
    labels,
    expression,
    change: setExpression,
    apply,
    state: { expression, filter, applies },
  };
}

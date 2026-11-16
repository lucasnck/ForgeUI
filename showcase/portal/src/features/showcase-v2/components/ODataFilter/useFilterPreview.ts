"use client";
import { useRef, useState } from "react";
import type {
  ODataFilterExpression,
  ODataFilterConditionData,
  ODataFilterValueData,
  ODataFilterConjunction,
} from "@forge-ui/web";
import {
  fields,
  labels,
  simpleExpression,
  advancedExpression,
  initialCondition,
  filterRecords,
  matchesFilter,
  serializationProof,
} from "./fixtures";

export function useFilterPreview(advanced = false) {
  const [expression, setExpression] = useState<ODataFilterExpression>(
    advanced ? advancedExpression : simpleExpression,
  );
  const [condition, setCondition] = useState<ODataFilterConditionData>(initialCondition);
  const [conjunction, setConjunction] = useState<ODataFilterConjunction>("and");
  const [conditions, setConditions] = useState<readonly ODataFilterConditionData[]>([
    initialCondition,
  ]);
  const [value, setValue] = useState<ODataFilterValueData>(null);
  const [filter, setFilter] = useState("");
  const [result, setResult] = useState(filterRecords);
  const [changes, setChanges] = useState(0);
  const [applies, setApplies] = useState(0);
  const [cancels, setCancels] = useState(0);
  const nextId = useRef(1);

  function change(next: ODataFilterExpression) {
    setExpression(next);
    setChanges((n) => n + 1);
  }

  function changeCondition(next: ODataFilterConditionData) {
    setCondition(next);
    setChanges((n) => n + 1);
  }

  function changeValue(next: ODataFilterValueData) {
    setValue(next);
    setChanges((n) => n + 1);
  }

  function changeConjunction(next: ODataFilterConjunction) {
    setConjunction(next);
    setChanges((n) => n + 1);
  }

  function addCondition() {
    setConditions((rows) => [
      ...rows,
      { ...initialCondition, id: "condition-" + ++nextId.current },
    ]);
    setChanges((n) => n + 1);
  }

  function updateCondition(id: string) {
    return (next: ODataFilterConditionData) => {
      setConditions((rows) => rows.map((row) => (row.id === id ? next : row)));
      setChanges((n) => n + 1);
    };
  }

  function removeCondition(id: string) {
    return () => {
      setConditions((rows) => rows.filter((row) => row.id !== id));
      setChanges((n) => n + 1);
    };
  }

  function apply(next: ODataFilterExpression, serialized: string) {
    setFilter(serialized);
    setResult(filterRecords.filter((row) => matchesFilter(next, row)));
    setApplies((n) => n + 1);
  }

  function cancel() {
    setCancels((n) => n + 1);
  }

  return {
    fields,
    labels,
    expression,
    change,
    condition,
    changeCondition,
    value,
    changeValue,
    conjunction,
    changeConjunction,
    conditions,
    addCondition,
    updateCondition,
    removeCondition,
    apply,
    cancel,
    state: {
      expression,
      condition,
      value,
      conjunction,
      conditions,
      filter,
      result: result.map((row) => row.id),
      changes,
      applies,
      cancels,
      serializationProof,
    },
  };
}

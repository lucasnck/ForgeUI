"use client";
import { useId, useRef, useState } from "react";
import {
  createODataFilterCondition,
  isODataFilterSimpleExpression,
  serializeODataFilter,
} from "../../../helpers/odata-filter";
import type {
  ODataFilterConditionData,
  ODataFilterConjunction,
  ODataFilterExpression,
  ODataFilterGroupData,
} from "../../../types/odata-filter";
import type { ODataFilterProps, ODataFilterNodeProps } from "./ODataFilter";

export function useODataFilter(input: ODataFilterProps) {
  const {
    mode,
    fields,
    value,
    onValueChange,
    onApply,
    onCancel,
    labels,
    disabled = false,
    actionsLayout = "inline",
    className,
    ...props
  } = input;
  const [error, setError] = useState<string | null>(null);
  const unsupported = mode === "simple" && !isODataFilterSimpleExpression(value, fields);
  const simpleConditions = fields.map((field) =>
    value.kind === "group"
      ? (value.children.find(
          (node): node is ODataFilterConditionData =>
            node.kind === "condition" && node.fieldId === field.id,
        ) ?? createODataFilterCondition(field, value.id + "-" + field.id))
      : createODataFilterCondition(field, value.id + "-" + field.id),
  );

  function change(next: ODataFilterExpression) {
    if (!disabled) {
      setError(null);
      onValueChange(next);
    }
  }

  function changeSimple(next: ODataFilterConditionData) {
    if (disabled || value.kind !== "group" || unsupported) return;
    const absent =
      next.value === null ||
      (Array.isArray(next.value) &&
        (next.value.length === 0 || next.value.every((item) => item === null)));
    const exists = value.children.some(
      (node) => node.kind === "condition" && node.fieldId === next.fieldId,
    );
    const children = absent
      ? value.children.filter((node) => node.kind !== "condition" || node.fieldId !== next.fieldId)
      : exists
        ? value.children.map((node) =>
            node.kind === "condition" && node.fieldId === next.fieldId ? next : node,
          )
        : [...value.children, next];
    change({ ...value, children });
  }

  function apply() {
    if (disabled || unsupported) return;
    let filter: string;

    try {
      filter = serializeODataFilter(value, fields);
    } catch {
      setError(labels.invalid);
      return;
    }

    setError(null);
    onApply(value, filter);
  }

  function clear() {
    change({ kind: "group", id: value.id, operator: "and", children: [] });
  }

  function cancel() {
    if (!disabled) onCancel?.();
  }

  return {
    mode,
    actionsLayout,
    fields,
    value,
    onCancel,
    labels,
    disabled,
    className,
    props,
    error,
    unsupported,
    simpleConditions,
    change,
    changeSimple,
    apply,
    clear,
    cancel,
  };
}

export function useODataFilterNode({
  node,
  fields,
  labels,
  disabled,
  path,
  onChange,
  onRemove,
}: ODataFilterNodeProps) {
  const namespace = useId();
  const sequence = useRef(0);

  function id() {
    return `${node.id}-${namespace}-${++sequence.current}`;
  }

  function changeChild(childId: string) {
    return (next: ODataFilterExpression) => {
      if (!disabled && node.kind === "group")
        onChange({
          ...node,
          children: node.children.map((child) => (child.id === childId ? next : child)),
        });
    };
  }

  function removeChild(childId: string) {
    return () => {
      if (!disabled && node.kind === "group")
        onChange({ ...node, children: node.children.filter((child) => child.id !== childId) });
    };
  }

  function conjunction(operator: ODataFilterConjunction) {
    if (!disabled && node.kind === "group") onChange({ ...node, operator });
  }

  function addCondition() {
    const field = fields.find((field) => !field.disabled);
    if (!disabled && node.kind === "group" && field)
      onChange({ ...node, children: [...node.children, createODataFilterCondition(field, id())] });
  }

  function addGroup() {
    if (!disabled && node.kind === "group") {
      const group: ODataFilterGroupData = { kind: "group", id: id(), operator: "or", children: [] };
      onChange({ ...node, children: [...node.children, group] });
    }
  }

  return {
    node,
    fields,
    labels,
    disabled,
    path,
    onChange,
    onRemove,
    changeChild,
    removeChild,
    conjunction,
    addCondition,
    addGroup,
  };
}

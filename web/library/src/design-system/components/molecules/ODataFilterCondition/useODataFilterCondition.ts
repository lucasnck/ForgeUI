"use client";
import { useId, type ChangeEvent } from "react";
import {
  createODataFilterCondition,
  getODataFilterOperators,
  replaceODataFilterConditionValue,
} from "../../../helpers/odata-filter";
import type { ODataFilterOperator, ODataFilterValueData } from "../../../types/odata-filter";
import type { ODataFilterConditionProps } from "./ODataFilterCondition";

export function useODataFilterCondition(input: ODataFilterConditionProps) {
  const {
    fields,
    value,
    onValueChange,
    labels,
    simple = false,
    disabled = false,
    onRemove,
    className,
    ...props
  } = input;
  const id = useId();
  const field = fields.find((field) => field.id === value.fieldId);
  if (!field || field.kind !== value.fieldKind)
    throw new Error("OData condition requires a matching schema field.");
  const operators = getODataFilterOperators(field);
  if (!operators.includes(value.operator)) throw new Error("Unsupported condition operator.");
  const blocked = disabled || field.disabled;

  function changeField(event: ChangeEvent<HTMLSelectElement>) {
    const next = fields.find((field) => field.id === event.currentTarget.value);
    if (!blocked && next && !next.disabled)
      onValueChange(createODataFilterCondition(next, value.id));
  }

  function changeOperator(event: ChangeEvent<HTMLSelectElement>) {
    const operator = event.currentTarget.value as ODataFilterOperator;
    if (!blocked && operators.includes(operator))
      onValueChange(createODataFilterCondition(field!, value.id, operator));
  }

  function changeValue(next: ODataFilterValueData) {
    if (!blocked) onValueChange(replaceODataFilterConditionValue(value, next));
  }

  function remove() {
    if (!blocked) onRemove?.();
  }

  return {
    fields,
    value,
    labels,
    simple,
    disabled: blocked,
    onRemove,
    className,
    props,
    id,
    field,
    operators,
    changeField,
    changeOperator,
    changeValue,
    remove,
  };
}

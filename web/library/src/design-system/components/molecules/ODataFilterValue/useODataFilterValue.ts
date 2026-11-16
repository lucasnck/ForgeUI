"use client";
import { useId, useState, type ChangeEvent } from "react";
import type { ODataFilterValueProps } from "./ODataFilterValue";
import type { ODataFilterValueData } from "../../../types/odata-filter";

export function useODataFilterValue(props: ODataFilterValueProps) {
  const id = useId();
  const [query, setQuery] = useState<string | null>(null);

  const change = (value: ODataFilterValueData) => {
    if (!props.disabled && !props.field.disabled) props.onValueChange(value);
  };

  const parse = (raw: string) =>
    raw === "" ? null : props.field.kind === "number" ? Number(raw) : raw;
  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    change(parse(event.target.value));
  const onMinimumChange = (event: ChangeEvent<HTMLInputElement>) =>
    change([
      parse(event.target.value),
      Array.isArray(props.value) ? (props.value[1] as string | number | null) : null,
    ]);
  const onMaximumChange = (event: ChangeEvent<HTMLInputElement>) =>
    change([
      Array.isArray(props.value) ? (props.value[0] as string | number | null) : null,
      parse(event.target.value),
    ]);
  const onBooleanChange = (value: string) => change(value === "all" ? null : value === "true");
  const onChoiceChange = (value: string) => change(value === "" ? null : value);

  const onSelectionChange = (value: string | null) => {
    change(value);
    if (value !== null) setQuery(null);
  };

  function dateValue(raw: string) {
    return raw === ""
      ? null
      : raw.slice(0, 4) +
          (raw.length > 4 ? "-" + raw.slice(4, 6) : "") +
          (raw.length > 6 ? "-" + raw.slice(6, 8) : "");
  }

  function onDateChange(raw: string) {
    change(dateValue(raw));
  }

  function onDateMinimumChange(raw: string) {
    change([dateValue(raw), Array.isArray(props.value) ? (props.value[1] as string | null) : null]);
  }

  function onDateMaximumChange(raw: string) {
    change([Array.isArray(props.value) ? (props.value[0] as string | null) : null, dateValue(raw)]);
  }

  return {
    onDateChange,
    onDateMinimumChange,
    onDateMaximumChange,
    id,
    query,
    setQuery,
    onChange,
    onMinimumChange,
    onMaximumChange,
    onBooleanChange,
    onChoiceChange,
    onSelectionChange,
    onMultipleChange: change,
    disabled: props.disabled || props.field.disabled,
  };
}

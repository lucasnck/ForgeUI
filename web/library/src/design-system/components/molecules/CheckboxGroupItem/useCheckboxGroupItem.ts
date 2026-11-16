"use client";

import { useId } from "react";
import { useChoiceGroupContext } from "../../../internal/choicegroup/ChoiceGroupContext";
import { useCheckboxGroupContext } from "../../../internal/checkboxgroup/CheckboxGroupContext";
import type { CheckboxGroupItemProps } from "./CheckboxGroupItem";

export function useCheckboxGroupItem({
  label,
  value,
  disabled,
  className,
  "aria-readonly": readOnly,
  ...props
}: CheckboxGroupItemProps) {
  const group = useCheckboxGroupContext();
  const choice = useChoiceGroupContext();
  const inputId = useId();
  const describedBy =
    [
      ...new Set([
        ...(choice.describedBy?.split(/\s+/).filter(Boolean) ?? []),
        ...(props["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? []),
      ]),
    ].join(" ") || undefined;

  // The fieldset handles selection after native caller events have bubbled.
  function onChange() {}

  return {
    group,
    choice,
    props,
    label,
    value,
    disabled,
    inputId,
    describedBy,
    className,
    readOnly,
    onChange,
  };
}

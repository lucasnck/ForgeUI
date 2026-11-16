"use client";

import { useId } from "react";
import { useChoiceGroupContext } from "../../../internal/choicegroup/ChoiceGroupContext";
import { useRadioGroupContext } from "../../../internal/radiogroup/RadioGroupContext";
import type { RadioGroupItemProps } from "./RadioGroupItem";

export function useRadioGroupItem({
  label,
  value,
  disabled,
  className,
  ...props
}: RadioGroupItemProps) {
  const group = useRadioGroupContext();
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
    onChange,
  };
}

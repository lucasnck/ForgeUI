"use client";

import type { ComponentSelectionProps } from "../../../types/compound-composition";
import { RadioGroupContext } from "../../../internal/radiogroup/RadioGroupContext";
import { ChoiceGroup } from "../ChoiceGroup";
import type { ChoiceGroupProps } from "../ChoiceGroup";
import { useRadioGroup } from "./useRadioGroup";
import styles from "./RadioGroup.module.css";

export interface RadioGroupProps extends ChoiceGroupProps, ComponentSelectionProps<string> {
  name: string;
}

export function RadioGroup(input: RadioGroupProps) {
  const { context, children, props, rootRef, onChange, className } = useRadioGroup(input);

  return (
    <RadioGroupContext value={context}>
      <ChoiceGroup
        {...props}
        ref={rootRef}
        onChange={onChange}
        disabled={context.disabled}
        invalid={context.invalid}
        className={[styles.root, className].filter(Boolean).join(" ")}
      >
        {children}
      </ChoiceGroup>
    </RadioGroupContext>
  );
}

"use client";

import type { ComponentSelectionProps } from "../../../types/compound-composition";
import { CheckboxGroupContext } from "../../../internal/checkboxgroup/CheckboxGroupContext";
import { ChoiceGroup } from "../ChoiceGroup";
import type { ChoiceGroupProps } from "../ChoiceGroup";
import { useCheckboxGroup } from "./useCheckboxGroup";
import styles from "./CheckboxGroup.module.css";

export interface CheckboxGroupProps
  extends ChoiceGroupProps, ComponentSelectionProps<readonly string[]> {
  name: string;
}

export function CheckboxGroup(input: CheckboxGroupProps) {
  const { context, children, props, rootRef, onChange, className } = useCheckboxGroup(input);

  return (
    <CheckboxGroupContext value={context}>
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
    </CheckboxGroupContext>
  );
}

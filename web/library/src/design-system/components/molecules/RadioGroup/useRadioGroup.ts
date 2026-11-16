"use client";

import { useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { RadioGroupProps } from "./RadioGroup";

export function useRadioGroup({
  name,
  value,
  defaultValue = "",
  onValueChange,
  disabled = false,
  invalid,
  children,
  ref,
  onChange: callerOnChange,
  className,
  ...props
}: RadioGroupProps) {
  const [localValue, setLocalValue] = useState<string>(defaultValue);
  const selected = value ?? localValue;
  const id = useId();
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  useImperativeHandle(ref, () => fieldsetRef.current!, []);
  const resetConfig = useRef({ value, defaultValue });
  useLayoutEffect(() => {
    resetConfig.current = { value, defaultValue };
  }, [value, defaultValue]);
  const isChecked = (key: string) => selected === key;

  function change(key: string, checked: boolean) {
    if (disabled || !checked || key === selected) return;
    const next = key;
    if (value === undefined) setLocalValue(next);
    onValueChange?.(next);
  }

  function onChange(event: ChangeEvent<HTMLFieldSetElement>) {
    callerOnChange?.(event);
    const target = event.target;
    const Input = event.currentTarget.ownerDocument.defaultView?.HTMLInputElement;
    if (
      event.defaultPrevented ||
      !Input ||
      !(target instanceof Input) ||
      target.dataset.choiceGroup !== id ||
      target.disabled
    )
      return;
    change(target.value, target.checked);
  }

  useEffect(() => {
    const fieldset = fieldsetRef.current;
    const form = fieldset?.form;
    if (!fieldset || !form) return;
    let active = true;
    const pending = new Set<ReturnType<typeof setTimeout>>();

    // Native dispatch may checkpoint microtasks before delegated React cancellation.
    const reset = (event: Event) => {
      const timer = setTimeout(() => {
        pending.delete(timer);
        if (!active || event.defaultPrevented) return;
        const current = resetConfig.current;
        const accepted = current.value === undefined ? current.defaultValue : current.value;
        if (current.value === undefined) setLocalValue(current.defaultValue);

        for (const input of fieldset.querySelectorAll<HTMLInputElement>('input[type="radio"]')) {
          if (input.dataset.choiceGroup === id) input.checked = accepted === input.value;
        }
      }, 0);
      pending.add(timer);
    };

    form.addEventListener("reset", reset);

    return () => {
      active = false;
      for (const timer of pending) clearTimeout(timer);
      pending.clear();
      form.removeEventListener("reset", reset);
    };
  }, [id, props.form]);
  return {
    context: { id, name, selected, isChecked, disabled, invalid },
    children,
    props,
    rootRef: fieldsetRef,
    onChange,
    className,
    change,
  };
}

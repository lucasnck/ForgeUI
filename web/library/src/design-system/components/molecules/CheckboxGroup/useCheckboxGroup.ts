"use client";

import { useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { CheckboxGroupProps } from "./CheckboxGroup";

export function useCheckboxGroup({
  name,
  value,
  defaultValue = [],
  onValueChange,
  disabled = false,
  invalid,
  children,
  ref,
  onChange: callerOnChange,
  className,
  ...props
}: CheckboxGroupProps) {
  const [localValue, setLocalValue] = useState<readonly string[]>(defaultValue);
  const selected = value ?? localValue;
  const id = useId();
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  useImperativeHandle(ref, () => fieldsetRef.current!, []);
  const resetConfig = useRef({ value, defaultValue });
  useLayoutEffect(() => {
    resetConfig.current = { value, defaultValue };
  }, [value, defaultValue]);
  const isChecked = (key: string) => selected.includes(key);

  function change(key: string, checked: boolean) {
    if (disabled || isChecked(key) === checked) return;
    const next = checked ? [...selected, key] : selected.filter((item) => item !== key);
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

        for (const input of fieldset.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) {
          if (input.dataset.choiceGroup === id) input.checked = accepted.includes(input.value);
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

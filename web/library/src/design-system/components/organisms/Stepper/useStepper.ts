"use client";

import { useCallback, useId, useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import type { StepperProps } from "./Stepper";
import type { StepperContextValue } from "../../../internal/stepper/StepperContext";

interface StepRegistration {
  disabled: boolean;
  ref: RefObject<HTMLButtonElement | null>;
}

export function useStepper({
  label,
  value,
  onStepChange,
  children,
  className,
  ...props
}: StepperProps) {
  const id = useId();
  const registry = useRef(new Map<string, StepRegistration>());
  const navigation = useRef<RefObject<HTMLElement | null> | null>(null);
  const focusedPanel = useRef<string | null>(null);
  const previous = useRef(value);
  const registerStep = useCallback(
    (key: string, disabled: boolean, ref: RefObject<HTMLButtonElement | null>) => {
      if (!key.trim() || registry.current.has(key))
        throw new Error("Stepper values must be unique and nonempty.");
      const entry = { disabled, ref };
      registry.current.set(key, entry);

      return () => {
        if (registry.current.get(key) === entry) registry.current.delete(key);
      };
    },
    [],
  );
  const registerNavigation = useCallback((ref: RefObject<HTMLElement | null>) => {
    navigation.current = ref;

    return () => {
      if (navigation.current === ref) navigation.current = null;
    };
  }, []);
  useLayoutEffect(() => {
    if (previous.current !== value && focusedPanel.current === previous.current) {
      const selected = registry.current.get(value);
      const fallback = [...registry.current.values()].find(
        (entry) => !entry.disabled && entry.ref.current?.isConnected,
      );
      const target =
        !selected?.disabled && selected?.ref.current?.isConnected
          ? selected.ref.current
          : (fallback?.ref.current ?? navigation.current?.current);
      target?.focus();
      focusedPanel.current = null;
    }

    previous.current = value;
  }, [value]);

  function requestStep(key: string) {
    const entry = registry.current.get(key);
    if (
      !entry ||
      entry.disabled ||
      !entry.ref.current?.isConnected ||
      entry.ref.current.disabled ||
      key === value
    )
      return;
    onStepChange(key);
  }

  function markPanelFocus(key: string, focused: boolean) {
    if (focused) focusedPanel.current = key;
    else if (focusedPanel.current === key) focusedPanel.current = null;
  }

  const stepId = (key: string) => id + "-step-" + encodeURIComponent(key);
  const panelId = (key: string) => id + "-panel-" + encodeURIComponent(key);
  const context: StepperContextValue = {
    label,
    value,
    registerStep,
    registerNavigation,
    requestStep,
    markPanelFocus,
    stepId,
    panelId,
  };

  return { context, props, children, className };
}

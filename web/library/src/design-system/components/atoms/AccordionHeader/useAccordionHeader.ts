"use client";
import { useAccordionContext } from "../../../internal/accordion/AccordionContext";
import { useMemo } from "react";
import type { Ref } from "react";
import { useAccordionItemContext } from "../../../internal/accordion/AccordionItemContext";
import type { AccordionHeaderProps } from "./AccordionHeader";

function mergeRefs(
  owned: { current: HTMLButtonElement | null },
  supplied: Ref<HTMLButtonElement> | undefined,
) {
  return (node: HTMLButtonElement | null) => {
    owned.current = node;
    if (typeof supplied === "function") {
      const cleanup = supplied(node);

      if (cleanup)
        return () => {
          owned.current = null;
          cleanup();
        };
    } else if (supplied) supplied.current = node;
  };
}

export function useAccordionHeader(input: AccordionHeaderProps) {
  const collapse = useAccordionItemContext();
  const { level, animated } = useAccordionContext();
  const {
    children,
    className,
    onClick,
    disabled: suppliedDisabled,
    ref: suppliedRef,
    ...props
  } = input;
  const disabled = collapse.disabled || suppliedDisabled;

  const handleClick: NonNullable<AccordionHeaderProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled) collapse.toggle();
  };

  const ref = useMemo(
    () => mergeRefs(collapse.triggerRef, suppliedRef),
    [collapse.triggerRef, suppliedRef],
  );

  return {
    level,
    animated,
    children,
    className,
    props,
    triggerProps: { ...collapse.triggerProps, disabled },
    handleClick,
    ref,
  };
}

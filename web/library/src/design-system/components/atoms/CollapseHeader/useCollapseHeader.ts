"use client";
import { useMemo } from "react";
import type { Ref } from "react";
import { useCollapseContext } from "../../../internal/collapse/CollapseContext";
import type { CollapseHeaderProps } from "./CollapseHeader";

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

export function useCollapseHeader(input: CollapseHeaderProps) {
  const collapse = useCollapseContext();
  const {
    children,
    className,
    onClick,
    disabled: suppliedDisabled,
    ref: suppliedRef,
    ...props
  } = input;
  const disabled = collapse.disabled || suppliedDisabled;

  const handleClick: NonNullable<CollapseHeaderProps["onClick"]> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled) collapse.toggle();
  };

  const ref = useMemo(
    () => mergeRefs(collapse.triggerRef, suppliedRef),
    [collapse.triggerRef, suppliedRef],
  );

  return {
    animated: collapse.animated,
    children,
    className,
    props,
    triggerProps: { ...collapse.triggerProps, disabled },
    handleClick,
    ref,
  };
}

"use client";
import { useLayoutEffect } from "react";
import { useAccordionContext } from "../../../internal/accordion/AccordionContext";
import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { AccordionItemProps } from "./AccordionItem";

export function useAccordionItem(input: AccordionItemProps) {
  const { value, disabled = false, children, className, ...props } = input;
  const accordion = useAccordionContext();
  const collapse = useCollapse({
    open: accordion.isExpanded(value),
    disabled: accordion.disabled || disabled,
    onOpenChange: (next) => accordion.setExpanded(value, next),
  });
  const presence = usePresence({
    open: collapse.open,
    elementRef: collapse.bodyRef,
    enabled: accordion.animated,
  });
  const registerItem = accordion.registerItem;
  useLayoutEffect(() => registerItem(value, disabled), [registerItem, value, disabled]);
  return {
    props,
    children,
    className,
    context: collapse,
    bodyRef: collapse.bodyRef,
    bodyProps: collapse.bodyProps,
    acceptedOpen: collapse.open,
    animated: accordion.animated,
    phase: presence.phase,
    onTransitionEnd: presence.onTransitionEnd,
  };
}

"use client";
import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { CollapseProps } from "./Collapse";

export function useCollapseView(input: CollapseProps) {
  const {
    open,
    defaultOpen,
    onOpenChange,
    disabled,
    children,
    animated = true,
    className,
    ...props
  } = input;
  const collapse = useCollapse({ open, defaultOpen, onOpenChange, disabled });
  const presence = usePresence({
    open: collapse.open,
    elementRef: collapse.bodyRef,
    enabled: animated,
  });

  return {
    props,
    children,
    className,
    animated,
    context: { ...collapse, animated },
    bodyRef: collapse.bodyRef,
    bodyProps: collapse.bodyProps,
    acceptedOpen: collapse.open,
    phase: presence.phase,
    onTransitionEnd: presence.onTransitionEnd,
  };
}

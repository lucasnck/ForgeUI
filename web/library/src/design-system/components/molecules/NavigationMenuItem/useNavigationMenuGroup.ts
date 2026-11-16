"use client";

import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { MouseEventHandler } from "react";
import type { NavigationMenuItemProps } from "./NavigationMenuItem";

export function useNavigationMenuGroup({
  open,
  defaultOpen,
  onOpenChange,
  onClick,
  ...props
}: NavigationMenuItemProps) {
  const collapse = useCollapse({ open, defaultOpen, onOpenChange });
  const presence = usePresence({
    open: collapse.open,
    elementRef: collapse.bodyRef,
    enabled: props.animated,
  });

  const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && collapse.triggerRef.current?.contains(event.target as Node))
      collapse.toggle();
  };

  return {
    props,
    context: collapse,
    open: collapse.open,
    triggerProps: collapse.triggerProps,
    triggerRef: collapse.triggerRef,
    bodyProps: collapse.bodyProps,
    bodyRef: collapse.bodyRef,
    phase: presence.phase,
    onTransitionEnd: presence.onTransitionEnd,
    handleClick,
  };
}

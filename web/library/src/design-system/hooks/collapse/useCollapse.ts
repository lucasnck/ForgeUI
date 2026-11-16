"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import type { CollapseContract, CollapseOptions } from "../../types/disclosure";

export function useCollapse({
  open: suppliedOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  id,
}: CollapseOptions = {}): CollapseContract {
  const generatedId = useId();
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const open = suppliedOpen ?? localOpen;
  const latest = useRef(open);
  const previousOpen = useRef(open);
  const focusedWithin = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const triggerId = id ?? `collapse-${generatedId}`;
  const bodyId = `${triggerId}-body`;

  function repairFocus(): void {
    const body = bodyRef.current;

    if (focusedWithin.current || body?.contains(body.ownerDocument.activeElement)) {
      triggerRef.current?.focus();
      focusedWithin.current = false;
    }
  }

  function requestOpen(next: boolean): void {
    if (disabled || next === latest.current) return;

    if (suppliedOpen === undefined) {
      if (!next) repairFocus();
      latest.current = next;
      setLocalOpen(next);
    }

    onOpenChange?.(next);
  }

  useLayoutEffect(() => {
    if (previousOpen.current && !open) repairFocus();
    previousOpen.current = open;
    latest.current = open;
  }, [open]);

  return {
    disabled,
    open,
    triggerRef,
    bodyRef,
    triggerProps: {
      id: triggerId,
      disabled,
      "aria-expanded": open,
      "aria-controls": bodyId,
    },
    bodyProps: {
      id: bodyId,
      hidden: !open,
      "aria-labelledby": triggerId,
      onFocusCapture: () => {
        focusedWithin.current = true;
      },
      onBlurCapture: (event) => {
        if (open) {
          focusedWithin.current = !!bodyRef.current?.contains(event.relatedTarget);
        }
      },
    },
    requestOpen,
    toggle: () => requestOpen(!latest.current),
  };
}

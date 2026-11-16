"use client";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { useRovingFocus } from "../../../hooks/focus/useRovingFocus";
import type { TabIdentity } from "../../../internal/tabs/TabsContext";
import type { TabsProps } from "./Tabs";

export function useTabs(input: TabsProps, identities: readonly TabIdentity[]) {
  const {
    value,
    defaultValue,
    onValueChange,
    label,
    direction = "ltr",
    children,
    animated = true,
    className,
    ...props
  } = input;
  if (!label.trim()) throw new Error("Tabs requires a nonempty label.");
  const first = identities.find((item) => !item.disabled)?.value;
  const [local, setLocal] = useState(defaultValue ?? first);
  const supplied = value ?? local;
  const selected = identities.some((item) => item.value === supplied && !item.disabled)
    ? supplied
    : first;
  const generatedId = useId();
  const headerRef = useRef<HTMLDivElement>(null);
  const focusedPanel = useRef<string | null>(null);
  const previous = useRef(selected);
  const focus = useRovingFocus({
    orientation: "horizontal",
    direction,
    loop: true,
    typeahead: false,
    initialId: selected,
    fallbackRef: headerRef,
  });

  function repair(next: string | undefined) {
    if (next) focus.focus(next);
    else headerRef.current?.focus();
    focusedPanel.current = null;
  }

  function select(next: string) {
    if (next === selected || !identities.some((item) => item.value === next && !item.disabled))
      return;

    if (value === undefined) {
      if (focusedPanel.current === selected) repair(next);
      setLocal(next);
    }

    onValueChange?.(next);
  }

  useLayoutEffect(() => {
    if (previous.current !== selected && focusedPanel.current === previous.current)
      repair(selected);
    previous.current = selected;
  });
  return {
    children,
    props: { ...props, dir: direction },
    className,
    context: {
      selected,
      select,
      focus,
      label,
      animated,
      headerRef,
      fallback: first === undefined,
      tabId: (key: string) => generatedId + "-tab-" + encodeURIComponent(key),
      panelId: (key: string) => generatedId + "-panel-" + encodeURIComponent(key),
      panelFocused: (key: string) => {
        focusedPanel.current = key;
      },
      panelBlurred: (key: string, related: EventTarget | null) => {
        if (related && focusedPanel.current === key) focusedPanel.current = null;
      },
    },
  };
}

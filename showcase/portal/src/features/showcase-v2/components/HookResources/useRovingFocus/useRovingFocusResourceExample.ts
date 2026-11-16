"use client";
import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useRovingFocus } from "@forge-ui/web";
import type { NavigationOrientation, NavigationDirection } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useRovingFocusResourceExample() {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [ids, setIds] = useState(["item-1", "item-2", "item-3"]);
  const [orientation, setOrientation] = useState<NavigationOrientation>("horizontal");
  const [direction, setDirection] = useState<NavigationDirection>("ltr");
  const [loop, setLoop] = useState(true);
  const [disableThird, setDisableThird] = useState(true);
  const [activated, setActivated] = useState<string | null>(null);
  const focus = useRovingFocus({
    orientation,
    direction,
    loop,
    typeahead: true,
    fallbackRef,
  });

  function changeOrientation(value: string) {
    if (value === "horizontal" || value === "vertical") setOrientation(value);
  }

  function changeDirection(value: string) {
    if (value === "ltr" || value === "rtl") setDirection(value);
  }

  function remove() {
    setIds((items) => items.filter((id) => id !== focus.activeId));
  }

  function key(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Delete") {
      event.preventDefault();
      remove();
    } else focus.onKeyDown(event);
  }

  const copy = useResourceExampleCopy();

  return {
    focus,
    fallbackRef,
    ids,
    orientation,
    changeOrientation,
    direction,
    changeDirection,
    loop,
    setLoop,
    disableThird,
    setDisableThird,
    activated,
    setActivated,
    remove,
    key,
    copy,
  };
}

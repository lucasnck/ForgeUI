"use client";
import { useLayoutEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { useRovingFocus } from "../focus";
import { useTreeState } from "./useTreeState";
import type { TreeStateOptions, TreeNavigationContract } from "../../types/tree";

export function useTreeNavigation(options: TreeStateOptions): TreeNavigationContract {
  const state = useTreeState(options);
  const preferred = state.visibleNodes.find(
    (entry) => entry.node.key === state.selected && !entry.node.disabled,
  )?.node.key;
  const first = state.visibleNodes.find((entry) => !entry.node.disabled)?.node.key;
  const focus = useRovingFocus({
    orientation: "vertical",
    loop: false,
    typeahead: true,
    initialId: preferred ?? first,
    fallbackRef: options.fallbackRef,
  });
  const focusWithin = useRef(false);
  useLayoutEffect(() => {
    const scope = options.fallbackRef?.current;
    if (!scope) return;
    focusWithin.current = scope.contains(scope.ownerDocument.activeElement);

    const onFocus = () => {
      focusWithin.current = true;
    };

    const onBlur = (event: FocusEvent) => {
      if (event.relatedTarget) focusWithin.current = scope.contains(event.relatedTarget as Node);
    };

    scope.addEventListener("focusin", onFocus);
    scope.addEventListener("focusout", onBlur);

    return () => {
      scope.removeEventListener("focusin", onFocus);
      scope.removeEventListener("focusout", onBlur);
    };
  }, [options.fallbackRef]);

  function ownsFocus() {
    const scope = options.fallbackRef?.current;

    return (
      !options.fallbackRef ||
      focusWithin.current ||
      !!scope?.contains(scope.ownerDocument.activeElement)
    );
  }

  const previousVisible = useRef(state.visibleNodes);
  useLayoutEffect(() => {
    let current = previousVisible.current.find((entry) => entry.node.key === focus.activeId);

    if (
      ownsFocus() &&
      current &&
      !state.visibleNodes.some((entry) => entry.node.key === current?.node.key)
    ) {
      while (current?.parentKey) {
        const parent = state.visibleNodes.find((entry) => entry.node.key === current?.parentKey);

        if (parent && !parent.node.disabled) {
          focus.focus(parent.node.key);
          break;
        }

        current = previousVisible.current.find((entry) => entry.node.key === current?.parentKey);
      }
    }

    previousVisible.current = state.visibleNodes;
  });

  function collapse(key: string) {
    let current = state.visibleNodes.find((entry) => entry.node.key === focus.activeId);

    while (current?.parentKey) {
      if (current.parentKey === key && options.expandedValue === undefined && ownsFocus()) {
        focus.focus(key);
        break;
      }

      current = state.visibleNodes.find((entry) => entry.node.key === current?.parentKey);
    }

    state.setExpanded(key, false);
  }

  function onNodeKeyDown(event: KeyboardEvent<HTMLElement>, key: string) {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    const entry = state.visibleNodes.find((entry) => entry.node.key === key);
    if (!entry || entry.node.disabled) return;
    if (event.key === "ArrowRight") {
      if (!entry.node.children?.length) return;
      event.preventDefault();

      if (!state.isExpanded(key)) state.setExpanded(key, true);
      else {
        const child = entry.node.children.find((node) => !node.disabled);
        if (child) focus.focus(child.key);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (state.isExpanded(key)) collapse(key);
      else if (entry.parentKey) focus.focus(entry.parentKey);
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      state.select(key);
    } else focus.onKeyDown(event);
  }

  return {
    ...state,
    focus,
    setExpanded: (key, open) => (open ? state.setExpanded(key, true) : collapse(key)),
    onNodeKeyDown,
  };
}

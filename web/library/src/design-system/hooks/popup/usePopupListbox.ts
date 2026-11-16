"use client";

import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import type { PopupListboxContract, PopupListboxOptions } from "../../types/popup";
export type { PopupListboxContract } from "../../types/popup";

export function usePopupListbox({
  id,
  count,
  queryKey,
  onAcceptOption,
}: PopupListboxOptions): PopupListboxContract {
  const generatedId = useId();
  const baseId = id ?? `popup-${generatedId}`;
  const listboxId = `${baseId}-listbox`;
  const [focused, setFocused] = useState(false);
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);
  const [rawActiveIndex, setRawActiveIndex] = useState(-1);
  const [previousQueryKey, setPreviousQueryKey] = useState(queryKey);

  // A new option set must never inherit selection or dismissal from its query.
  // Adjust during render so consumers cannot commit a stale active descendant.
  if (previousQueryKey !== queryKey) {
    setPreviousQueryKey(queryKey);
    setDismissedKey(null);
    setRawActiveIndex(-1);
  }

  const isOpen = focused && queryKey !== null && count > 0 && queryKey !== dismissedKey;
  const activeIndex = isOpen && rawActiveIndex >= 0 ? Math.min(rawActiveIndex, count - 1) : -1;

  function optionId(index: number) {
    return `${listboxId}-option-${index}`;
  }

  function acceptOption(index: number) {
    if (!Number.isInteger(index) || index < 0 || index >= count) return;
    setDismissedKey(null);
    setRawActiveIndex(-1);
    onAcceptOption(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.defaultPrevented || event.nativeEvent.isComposing || count <= 0 || queryKey === null)
      return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setDismissedKey(null);
      setRawActiveIndex(isOpen ? (activeIndex + 1) % count : 0);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setDismissedKey(null);
      setRawActiveIndex(isOpen && activeIndex > 0 ? activeIndex - 1 : count - 1);
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      acceptOption(activeIndex);
      return;
    }

    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setDismissedKey(queryKey);
      setRawActiveIndex(-1);
    }
  }

  return {
    isOpen,
    activeIndex,
    listboxId,
    optionId,
    comboboxAttributes: {
      role: "combobox",
      "aria-expanded": isOpen,
      "aria-controls": isOpen ? listboxId : undefined,
      "aria-activedescendant": activeIndex >= 0 ? optionId(activeIndex) : undefined,
    },
    listboxAttributes: { id: listboxId, role: "listbox" },
    optionAttributes: (index) => ({
      id: optionId(index),
      role: "option",
      "aria-selected": index === activeIndex,
      "data-active": index === activeIndex || undefined,
    }),
    onFocus: () => {
      setFocused(true);
    },
    onBlur: () => {
      setFocused(false);
      setDismissedKey(null);
      setRawActiveIndex(-1);
    },
    onKeyDown,
    acceptOption,
  };
}

"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { MaskedInputContract, MaskedInputOptions } from "../../types/mask";
import { applyMask, caretForIndex, isMaskComplete, unmask } from "../../helpers/mask";

export function useMaskedInput({
  mask,
  value,
  onValueChange,
}: MaskedInputOptions): MaskedInputContract {
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingCaret = useRef<{ value: string; index: number } | null>(null);
  const [composition, setComposition] = useState<{
    sourceValue: string;
    mask: string;
    display: string;
  } | null>(null);
  const [previousSource, setPreviousSource] = useState({ value, mask });

  if (previousSource.value !== value || previousSource.mask !== mask) {
    setPreviousSource({ value, mask });
    setComposition(null);
  }

  const formattedValue = applyMask(value, mask);
  const composing = composition?.sourceValue === value && composition.mask === mask;
  const displayValue = composing ? composition.display : formattedValue;

  function rawIndex(display: string, caret: number): number {
    const length = unmask(display, mask).length;
    let index = 0;

    for (let position = 1; position <= length; position++) {
      if (caretForIndex(display, mask, position) > caret) break;
      index = position;
    }

    return index;
  }

  function commit(next: string, index: number): void {
    pendingCaret.current = { value: next, index };
    onValueChange(next);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    const input = event.currentTarget;

    if ((event.nativeEvent as InputEvent).isComposing) {
      // Keep the native composition visible without committing a new raw value.
      setComposition({ sourceValue: value, mask, display: input.value });
      return;
    }

    setComposition(null);
    commit(
      unmask(input.value, mask),
      rawIndex(input.value, input.selectionStart ?? input.value.length),
    );
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      composing ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      (event.key !== "Backspace" && event.key !== "Delete")
    )
      return;
    const input = event.currentTarget;
    const raw = unmask(formattedValue, mask);
    const start = rawIndex(formattedValue, input.selectionStart ?? 0);
    const end = rawIndex(formattedValue, input.selectionEnd ?? 0);
    const from = start === end && event.key === "Backspace" ? Math.max(0, start - 1) : start;
    const to = start === end && event.key === "Delete" ? Math.min(raw.length, end + 1) : end;
    event.preventDefault();
    if (from !== to) commit(raw.slice(0, from) + raw.slice(to), from);
  }

  useLayoutEffect(() => {
    const input = inputRef.current;
    const pending = pendingCaret.current;
    if (!input || !pending) return;

    if (value === pending.value) {
      const position = caretForIndex(displayValue, mask, pending.index);
      input.setSelectionRange(position, position);
    }

    pendingCaret.current = null;
  });

  return {
    inputRef,
    displayValue,
    complete: isMaskComplete(value, mask),
    inputMode: /[AS]/.test(mask) ? "text" : "numeric",
    maxLength: mask.length,
    onChange,
    onKeyDown,
  };
}

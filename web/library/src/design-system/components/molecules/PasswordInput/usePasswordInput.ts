"use client";

import { useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import type { PasswordInputProps } from "./PasswordInput";

export function usePasswordInput({
  revealable = true,
  disabled = false,
  concealLabel,
  revealLabel,
  fullWidth = true,
  ref,
  ...props
}: PasswordInputProps) {
  const [revealed, setRevealed] = useState(false);
  const [previousRevealable, setPreviousRevealable] = useState(revealable);

  if (previousRevealable !== revealable) {
    setPreviousRevealable(revealable);
    if (!revealable) setRevealed(false);
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const selection = useRef<{
    start: number | null;
    end: number | null;
    direction: HTMLInputElement["selectionDirection"];
  } | null>(null);
  useImperativeHandle(ref, () => inputRef.current!, []);
  const showText = revealable && revealed;

  function toggle() {
    const input = inputRef.current;
    if (disabled || !revealable) return;
    if (input)
      selection.current = {
        start: input.selectionStart,
        end: input.selectionEnd,
        direction: input.selectionDirection,
      };
    setRevealed((current) => !current);
  }

  useLayoutEffect(() => {
    const saved = selection.current;
    const input = inputRef.current;
    selection.current = null;
    if (input && saved?.start !== null && saved?.start !== undefined && saved.end !== null)
      input.setSelectionRange(saved.start, saved.end, saved.direction ?? undefined);
  }, [showText]);
  return {
    showText,
    revealable,
    props,
    disabled,
    concealLabel,
    revealLabel,
    fullWidth,
    inputRef,
    toggle,
  };
}

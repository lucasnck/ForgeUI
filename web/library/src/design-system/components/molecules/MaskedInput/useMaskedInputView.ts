"use client";

import { useImperativeHandle } from "react";
import type { KeyboardEvent } from "react";
import { useMaskedInput } from "../../../hooks/mask/useMaskedInput";
import type { MaskedInputProps } from "./MaskedInput";

export function useMaskedInputView({
  mask,
  value,
  onValueChange,
  onKeyDown,
  ref,
  ...props
}: MaskedInputProps) {
  const masked = useMaskedInput({ mask, value, onValueChange });
  const { inputRef } = masked;
  useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (!event.defaultPrevented && !props.disabled && !props.readOnly) masked.onKeyDown(event);
  }

  return { ...masked, props, handleKeyDown };
}

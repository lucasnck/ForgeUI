"use client";

import { Input } from "../../atoms/Input";
import type { NativeMaskedInputProps } from "../../../types/native-control-contracts";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";
import { useMaskedInputView } from "./useMaskedInputView";

export interface MaskedInputProps
  extends NativeMaskedInputProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {
  value: string;
  onValueChange(value: string): void;
  mask: string;
}

export function MaskedInput(props: MaskedInputProps) {
  const {
    props: inputProps,
    inputRef,
    displayValue,
    inputMode,
    maxLength,
    onChange,
    handleKeyDown,
  } = useMaskedInputView(props);

  return (
    <Input
      {...inputProps}
      ref={inputRef}
      type="text"
      value={displayValue}
      inputMode={inputMode}
      maxLength={maxLength}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  );
}

import type { RefObject, ChangeEvent, KeyboardEvent } from "react";

export interface MaskedInputOptions {
  mask: string;
  value: string;
  onValueChange(value: string): void;
}

export interface MaskedInputContract {
  inputRef: RefObject<HTMLInputElement | null>;
  displayValue: string;
  complete: boolean;
  inputMode: "numeric" | "text";
  maxLength: number;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onKeyDown(event: KeyboardEvent<HTMLInputElement>): void;
}

import type { KeyboardEvent, RefObject } from "react";
import type { ComponentSelectionProps } from "./compound-composition";
import type { ChoiceOption } from "./selection-navigation";
import type { SelectionMode } from "./collection-contracts";
import type { RovingFocusContract } from "./focus";

export interface ListBoxStateOptions extends ComponentSelectionProps<readonly string[]> {
  options: readonly ChoiceOption[];
  fallbackRef?: RefObject<HTMLElement | null>;
  selectionMode?: SelectionMode;
  disabled?: boolean;
}

export interface ListBoxStateContract {
  selected: readonly string[];
  focus: RovingFocusContract;
  isSelected(value: string): boolean;
  select(value: string): void;
  reset(): void;
  onOptionKeyDown(event: KeyboardEvent<HTMLElement>, value: string): void;
}

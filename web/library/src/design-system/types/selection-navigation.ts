import type { VisualProps } from "./component-capabilities";

export interface ComponentOpenProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
}

export interface ChoiceOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ListBoxOption extends ChoiceOption, VisualProps {}

export interface MenuAction {
  id: string;
  label: string;
  disabled?: boolean;
}

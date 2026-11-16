import type { NativeCollectionItemProps } from "./compound-composition";
import type { FocusEvent, KeyboardEvent } from "react";

export interface ComponentPopupProps {
  listboxLabel?: string;
}

export interface PopupListboxOptions {
  id?: string;
  count: number;
  queryKey: string | null;
  onAcceptOption(index: number): void;
}

export interface PopupComboboxAttributes {
  role: "combobox";
  "aria-expanded": boolean;
  "aria-controls": string | undefined;
  "aria-activedescendant": string | undefined;
}

export interface PopupListboxAttributes {
  id: string;
  role: "listbox";
}

export interface PopupOptionAttributes {
  id: string;
  role: "option";
  "aria-selected": boolean;
  "data-active": true | undefined;
}

export interface PopupListboxContract {
  isOpen: boolean;
  activeIndex: number;
  listboxId: string;
  optionId(index: number): string;
  comboboxAttributes: PopupComboboxAttributes;
  listboxAttributes: PopupListboxAttributes;
  optionAttributes(index: number): PopupOptionAttributes;
  onFocus(event: FocusEvent<HTMLElement>): void;
  onBlur(event: FocusEvent<HTMLElement>): void;
  onKeyDown(event: KeyboardEvent<HTMLElement>): void;
  acceptOption(index: number): void;
}

export interface NativePopupListboxItemProps extends Omit<NativeCollectionItemProps, "children"> {}

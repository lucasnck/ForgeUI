import type { RefObject, KeyboardEvent } from "react";

export type NavigationOrientation = "horizontal" | "vertical";

export type NavigationDirection = "ltr" | "rtl";

export interface FocusItemRegistration {
  id: string;
  ref: RefObject<HTMLElement | null>;
  textValue: string;
  disabled?: boolean;
}

export interface RovingFocusOptions {
  orientation: NavigationOrientation;
  direction?: NavigationDirection;
  loop?: boolean;
  typeahead?: boolean;
  initialId?: string;
  fallbackRef?: RefObject<HTMLElement | null>;
}

export interface RovingFocusContract {
  activeId: string | null;
  registerItem(item: FocusItemRegistration): () => void;
  tabIndex(id: string): number;
  isEnabled(id: string): boolean;
  onItemFocus(id: string): void;
  focus(id: string): void;
  focusFirst(): void;
  focusLast(): void;
  onKeyDown(event: KeyboardEvent<HTMLElement>): void;
}

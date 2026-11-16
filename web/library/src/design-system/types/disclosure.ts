import type { RefObject, ComponentPropsWithRef } from "react";
import type { ComponentOpenProps } from "./selection-navigation";
import type { ComponentDisclosureGroupProps } from "./compound-composition";

export interface CollapseOptions extends ComponentOpenProps {
  disabled?: boolean;
  id?: string;
}

export interface CollapseContract {
  disabled: boolean;
  open: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  bodyRef: RefObject<HTMLDivElement | null>;
  triggerProps: ComponentPropsWithRef<"button">;
  bodyProps: ComponentPropsWithRef<"div">;
  requestOpen(open: boolean): void;
  toggle(): void;
}

export interface DisclosureGroupOptions extends ComponentDisclosureGroupProps {}

export interface DisclosureGroupContract {
  disabled: boolean;
  value: readonly string[];
  registerItem(value: string, disabled?: boolean): () => void;
  isExpanded(value: string): boolean;
  setExpanded(value: string, open: boolean): void;
  toggle(value: string): void;
}

export interface AccordionOptions extends DisclosureGroupOptions {}

export interface AccordionContract extends DisclosureGroupContract {}

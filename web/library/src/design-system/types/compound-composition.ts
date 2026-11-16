import type { ElementType, ReactElement, ReactNode, ComponentPropsWithRef } from "react";

export interface ComponentChildrenProps {
  children: ReactNode;
}

export interface ComponentSelectionProps<Value> {
  value?: Value;
  defaultValue?: Value;
  onValueChange?(value: Value): void;
}

export interface ComponentDisclosureGroupProps extends ComponentSelectionProps<readonly string[]> {
  multiple?: boolean;
  collapsible?: boolean;
  disabled?: boolean;
}

export interface NativeCollectionRootProps extends Omit<
  ComponentPropsWithRef<"div">,
  "defaultValue" | "children"
> {}

export interface NativeCollectionListProps extends Omit<ComponentPropsWithRef<"ul">, "children"> {}

export interface NativeChoiceGroupProps extends Omit<
  ComponentPropsWithRef<"fieldset">,
  "defaultValue" | "children"
> {}

export interface NativeCompoundTriggerProps extends Omit<
  ComponentPropsWithRef<"button">,
  "type" | "aria-expanded" | "aria-controls"
> {}

export interface NativeCollectionButtonProps extends Omit<
  ComponentPropsWithRef<"button">,
  "type" | "value" | "role" | "aria-selected" | "aria-controls" | "tabIndex"
> {}

export interface NativeCollectionItemProps extends Omit<
  ComponentPropsWithRef<"li">,
  "role" | "aria-selected" | "tabIndex"
> {}

export interface NativeTagGroupItemProps extends Omit<ComponentPropsWithRef<"li">, "children"> {}

export interface AccordionItemDescriptor {
  value: string;
  disabled?: boolean;
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}

export interface TabDescriptor {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface BreadcrumbItemDescriptor {
  id: string;
  label: string;
  href?: string;
}

export type CompoundRegion = "header" | "body" | "footer";

export interface CompoundParts {
  header?: ReactElement;
  body?: ReactElement;
  footer?: ReactElement;
}

export type CompoundConstructors = Readonly<Record<CompoundRegion, ElementType>>;

export interface NativePaginationEllipsisProps extends Pick<
  ComponentPropsWithRef<"span">,
  "id" | "className" | "style" | "title" | "hidden" | "dir" | "lang" | "ref"
> {}

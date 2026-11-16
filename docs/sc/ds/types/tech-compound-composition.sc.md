---
title: "Compound component composition"
scope: "Own shared compound contracts, contextual part boundaries and the applicability matrix. Atomic categories describe rendered parts; behavior stays in DS hooks."
status: "DONE"
type: "type"
ds-level: "none"
---

# Compound component composition

## Files

```text
design-system/types/contracts.test.ts (M)
design-system/types/behavior-contracts.test.ts (M)
design-system/types/forms.test.ts (M)
design-system/types/compound-composition.ts (M)
design-system/types/index.ts (M)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Contract

```ts
import type { ComponentChildrenProps, CompoundParts } from "@forge-ui/web";
type Children = ComponentChildrenProps;
type Regions = CompoundParts;
```

## Content

```ts
import type {
  ElementType,
  ReactElement,
  ReactNode,
  ComponentPropsWithRef,
} from "react";

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

export interface NativeCollectionRootProps extends Omit<ComponentPropsWithRef<"div">, "defaultValue" | "children"> {
}

export interface NativeCollectionListProps extends Omit<ComponentPropsWithRef<"ul">, "children"> {
}

export interface NativeChoiceGroupProps extends Omit<ComponentPropsWithRef<"fieldset">, "defaultValue" | "children"> {
}

export interface NativeCompoundTriggerProps extends Omit<ComponentPropsWithRef<"button">, "type" | "aria-expanded" | "aria-controls"> {
}

export interface NativeCollectionButtonProps extends Omit<ComponentPropsWithRef<"button">, "type" | "value" | "role" | "aria-selected" | "aria-controls" | "tabIndex"> {
}

export interface NativeCollectionItemProps extends Omit<ComponentPropsWithRef<"li">, "role" | "aria-selected" | "tabIndex"> {
}

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

export interface NativePaginationEllipsisProps extends Pick<ComponentPropsWithRef<"span">, "id" | "className" | "style" | "title" | "hidden" | "dir" | "lang" | "ref"> {}
```

## Tests

- V2 Consumer snippets for Card, Modal, Accordion retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile generic selection values and matching callbacks; reject callbacks receiving a different value type.
- Compile required children and declared compound regions; reject unknown region names and missing constructor mappings.
- Reject conflicting role, tabIndex and native defaultValue channels in owned native adaptations.
- Accept passive native span attributes and HTMLSpanElement ref for NativePaginationEllipsisProps; reject children, event handlers, role, tabIndex, page targets and required-label assumptions.

## Criteria

- [x] Children, generic selection, disclosure capabilities and native region adapters have one canonical owner.
- [x] Selection callbacks preserve their generic value type; readonly group keys do not become scalar values.
- [x] Native role/tabIndex/defaultValue conflicts are excluded once at the shared adaptation.
- [x] Compound regions are header, body and footer and map to actual ElementType constructors.
- [x] CompoundParts retains the original ReactElement identity and optional region fields.
- [x] Rendered context, collection validation and focus behavior remain with their owning components, helpers and hooks.

- [x] NativePaginationEllipsisProps canonically permits only id/className/style/title/hidden/dir/lang/ref from the native span contract.
- [x] The passive marker contract excludes children, event handlers, role and tabIndex; semantic/focus overrides are not exposed as component capabilities.

- [x] V2 typed usage fixtures cover Card, Modal, Accordion: Required/optional public parts, duplicate rejection and owner context. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

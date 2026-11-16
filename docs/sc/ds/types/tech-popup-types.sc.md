---
title: "Popup contracts"
scope: "Popup contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Popup contracts

## Files

```text
design-system/types/popup-item.contracts.test.ts (C)
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/foundations/types.ts (D)
design-system/types/popup.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Contract

```ts
import type { ComponentPopupProps } from "@forge-ui/web";
type Contract = ComponentPopupProps;
```

## Content

```ts
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
```

## Tests

- V2 Consumer snippets for Autocomplete, Combobox, usePopupListbox retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile required popup id/count/query/acceptance channels and optional popup accessible name.
- Reject missing required options and incorrectly typed acceptance callbacks.
- Compile the exact combobox/listbox/option attribute sets and reject incompatible ARIA literal values.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 typed usage fixtures cover Autocomplete, Combobox, usePopupListbox: Query/option identity and active-descendant/acceptance contracts. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

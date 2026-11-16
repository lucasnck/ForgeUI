---
title: "Listbox state contracts"
scope: "Listbox state contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Listbox state contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/listbox-state.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [Compound component composition](tech-compound-composition.sc.md)
- [Selection, panel and open-state contracts](tech-selection-navigation.sc.md)
- [Collection, feedback and form contracts](tech-collection-contracts.sc.md)
- [Focus contracts](tech-focus-contracts.sc.md)

## Contract

```ts
import type { ListBoxStateOptions } from "@forge-ui/web";
type Contract = ListBoxStateOptions;
```

## Content

```ts
import type {
  KeyboardEvent,
  RefObject,
} from "react";
import type {
  ComponentSelectionProps,
} from "./compound-composition";
import type {
  ChoiceOption,
} from "./selection-navigation";
import type {
  SelectionMode,
} from "./collection-contracts";
import type {
  RovingFocusContract,
} from "./focus";

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
```

## Tests

- V2 Consumer snippets for ListBox, useListBoxState retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile readonly choice collections and single/multiple selection with matching readonly-string callbacks.
- Reject scalar selection values, unsupported selection modes and incompatible option handlers.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 typed usage fixtures cover ListBox, useListBoxState: Option identity, supported selection modes and accepted controlled values. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

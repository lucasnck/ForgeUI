---
title: "Focus contracts"
scope: "Focus contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Focus contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/focus.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Contract

```ts
import type { NavigationOrientation } from "@forge-ui/web";
type Contract = NavigationOrientation;
```

## Content

```ts
import type {
  RefObject,
  KeyboardEvent,
} from "react";

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
```

## Tests

- V2 Consumer snippets for Toolbar, Tabs, useRovingFocus retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile horizontal/vertical orientation and ltr/rtl direction; reject missing orientation and unsupported directions.
- Compile typed focus registration and keyboard callbacks; reject incompatible element refs.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 typed usage fixtures cover Toolbar, Tabs, useRovingFocus: Registered DOM focus identity, orientation/direction and disabled navigation. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

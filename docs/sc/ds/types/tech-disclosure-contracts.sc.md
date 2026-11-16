---
title: "Disclosure contracts"
scope: "Disclosure contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Disclosure contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/disclosure.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [Selection, panel and open-state contracts](tech-selection-navigation.sc.md)
- [Compound component composition](tech-compound-composition.sc.md)

## Contract

```ts
import type { CollapseOptions } from "@forge-ui/web";
type Contract = CollapseOptions;
```

## Content

```ts
import type {
  RefObject,
  ComponentPropsWithRef,
} from "react";
import type {
  ComponentOpenProps,
} from "./selection-navigation";
import type {
  ComponentDisclosureGroupProps,
} from "./compound-composition";

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

export interface DisclosureGroupOptions extends ComponentDisclosureGroupProps {
}

export interface DisclosureGroupContract {
  disabled: boolean;
  value: readonly string[];
  registerItem(value: string, disabled?: boolean): () => void;
  isExpanded(value: string): boolean;
  setExpanded(value: string, open: boolean): void;
  toggle(value: string): void;
}

export interface AccordionOptions extends DisclosureGroupOptions {
}

export interface AccordionContract extends DisclosureGroupContract {
}
```

## Tests

- V2 Consumer snippets for Collapse, Accordion retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile controlled and uncontrolled collapse/group options with matching boolean or readonly-key callbacks.
- Reject scalar group selections, mismatched callbacks and incompatible trigger/body refs.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 typed usage fixtures cover Collapse, Accordion: Controlled/default state, accepted callbacks and registered disclosure identity. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

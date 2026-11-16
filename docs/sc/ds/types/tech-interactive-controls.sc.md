---
title: "Interactive native controls"
scope: "Interactive native controls shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Interactive native controls

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/foundations/types.ts (D)
design-system/types/interactive-controls.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [Native Control Contracts and Checkable Styles](tech-native-control-contracts.sc.md)

## Contract

```ts
import type { NativeIconButtonProps } from "@forge-ui/web";
type Contract = NativeIconButtonProps;
```

## Content

```ts
import type { ComponentPropsWithRef } from "react";
import type {
  NativeInputProps,
  NativeCheckboxProps,
} from "./native-control-contracts";

export interface NativeIconButtonProps
  extends Omit<ComponentPropsWithRef<"button">, "children"> {}

export interface NativeRadioProps
  extends Omit<NativeInputProps, "type" | "children"> {}

export interface NativeSwitchProps
  extends Omit<NativeCheckboxProps, "role" | "aria-checked"> {}

export interface ComponentAccessibleNameProps {
  label: string;
}
```

## Tests

- V2 Consumer snippets for Checkbox, RadioGroup, Switch retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile required accessible names and inherited native refs/events.
- Reject children on icon buttons, caller type on radio and caller role/aria-checked on switch adaptations.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 typed usage fixtures cover Checkbox, RadioGroup, Switch: Native checked/value semantics and supported selection controls. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

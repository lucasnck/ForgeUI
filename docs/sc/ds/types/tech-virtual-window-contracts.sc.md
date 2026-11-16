---
title: "Virtual window contracts"
scope: "Virtual window contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Virtual window contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/virtual-window.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [Component capabilities](tech-component-capabilities.sc.md)

## Contract

```ts
import type { VirtualWindowOptions } from "@forge-ui/web";
type Contract = VirtualWindowOptions;
```

## Content

```ts
import type {
  RefObject,
} from "react";
import type {
  ComponentSize,
} from "./component-capabilities";

export interface VirtualWindowOptions {
  keys: readonly string[];
  size?: ComponentSize;
  overscan?: number;
  initialCount?: number;
  pinnedKey?: string;
  viewportRef: RefObject<HTMLElement | null>;
}

export interface VirtualWindowContract {
  start: number;
  end: number;
  paddingBefore: number;
  paddingAfter: number;
  scrollToIndex(index: number): void;
}
```

## Tests

- V2 Typed VirtualWindowOptions/VirtualWindowContract fixtures retain the actual keys/ref/overscan/pinned-key and range/spacer/scrollToIndex shapes. No current ListBox/TreeGrid virtualization prop is assumed.

- Compile readonly keys, semantic size, viewport ref, overscan and pinned key.
- Reject caller pixel-height fields, non-string keys and incompatible viewport refs.
- Compile the bounded range/spacer contract and typed scrollToIndex method.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 type-only fixtures cover the exported VirtualWindowOptions/VirtualWindowContract shapes directly. Current ListBox/TreeGrid APIs expose no virtual-window prop; do not add one or invent a virtual-window hook to make a preview. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

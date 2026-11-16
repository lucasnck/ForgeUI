---
title: "Loading contracts"
scope: "Loading contracts shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Loading contracts

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/foundations/types.ts (D)
design-system/types/loading.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Contract

```ts
import type { SkeletonKind } from "@forge-ui/web";
type Contract = SkeletonKind;
```

## Content

```ts
export type SkeletonKind = "rectangle" | "text" | "circle";

export interface ComponentSkeletonKindProps {
  kind?: SkeletonKind;
}
```

## Tests

- V2 Consumer snippets for Button, Spinner, Skeleton retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile rectangle, text and circle skeleton kinds; reject unsupported kinds.
- Compile optional kind capability without requiring an unrelated loading state.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.

- [x] V2 typed usage fixtures cover Button, Spinner, Skeleton: Loading state, status ownership and explicit opt-out. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

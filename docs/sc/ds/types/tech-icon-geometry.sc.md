---
title: "Icon geometry"
scope: "Icon geometry shared value and capability contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Icon geometry

## Files

```text
design-system/types/contracts.test.ts (C)
design-system/types/behavior-contracts.test.ts (C)
design-system/types/forms.test.ts (C)
design-system/types/icon-geometry.ts (C)
design-system/types/index.ts (C)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Contract

```ts
import type { IconGeometry } from "@forge-ui/web";
type Contract = IconGeometry;
```

## Content

```ts
export interface IconGeometry {
  readonly name: string;
  readonly viewBox: string;
  readonly drawing: "stroke" | "filled";
  readonly paths: readonly string[];
}

export type IconName = keyof typeof import("../helpers/icon-data.generated").iconData;
```

## Tests

- V2 Consumer snippets for Icon retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile every generated canonical IconName and reject a name absent from iconData.
- Reject mutation of readonly geometry and unsupported drawing modes.
- Regenerate after adding/removing a manifest icon and verify the inferred name contract changes with the data.

## Criteria

- [x] Each shared declaration has one canonical owner and remains exported through @/design-system.
- [x] IconName derives from generated canonical keys through a type-only query; geometry declarations introduce no runtime cycle or parallel name inventory.

- [x] V2 typed usage fixtures cover Icon: Canonical geometry values and decorative/named SVG usage. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

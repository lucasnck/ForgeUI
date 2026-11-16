---
title: "Page transition contracts"
scope: "Canonical neutral navigation intents, transition recipe classes and shared-element identity contracts"
status: "DONE"
type: "type"
ds-level: "none"
---

# Page transition contracts

## Files

```text
design-system/types/page-transitions.ts (C)
design-system/types/page-transitions.contracts.test.ts (C)
design-system/types/index.ts (M)
design-system/index.ts (M)
../scripts/check-crud-home.cjs (C)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Contract

```ts
import type { PageTransitionIntent, SharedElementName } from "@forge-ui/web";
type NavigationIntent = PageTransitionIntent;
type RecordVisualIdentity = SharedElementName;
```

## Content

```ts
export type PageTransitionIntent = "forward" | "back" | "replace" | "reveal";
export type SharedElementName = string;
export const pageTransitionTypes = {
  forward: "praticar-nav-forward",
  back: "praticar-nav-back",
  replace: "praticar-content-replace",
  reveal: "praticar-content-reveal",
} as const satisfies Record<PageTransitionIntent, string>;
export const pageTransitionClasses = {
  forward: "praticar-page-forward",
  back: "praticar-page-back",
  replace: "praticar-page-replace",
  reveal: "praticar-page-reveal",
  shared: "praticar-shared-element",
} as const;
```

## Tests

- V2 Consumer snippets for PageTransition, SharedElement retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile every supported intent; reject unknown intents and numeric identity values.
- Assert each intent has exactly one type and class mapping, with distinct namespaced values.

## Criteria

- [x] Public declarations have one owner and no Next.js, routing, business-record, DOM or infrastructure import.
- [x] SharedElementName is an opaque stable nonempty identity supplied by the feature; one mounted participant per name per document, independently of array index, current page, translated text or generated random values.
- [x] Feature identity includes example/entity scope, immutable record key and semantic element role; name and image are separate names.
- [x] Transition type and transition class are distinct concepts; wrappers and recipes consume these exact mappings without duplicate literal maps.
- [x] Native browser back/forward without a known explicit intent selects no directional recipe; missing source/destination is normal enter/exit, not a promised morph.

- [x] V2 typed usage fixtures cover PageTransition, SharedElement: Supported local transition ownership and stable shared identity. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. The accepted and rejected consumer fixtures use the available canonical exports.

- [x] This type resource owns canonical intent/type/class declarations only. Application route readiness, loading boundaries, scroll policy and observed navigation motion belong to the consuming page/shared application component SCs and core-page-transition-guide.sc.md; a valid mapping alone is not visual acceptance.

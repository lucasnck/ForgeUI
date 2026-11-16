---
title: "LoadingStateFooter"
scope: "LoadingState public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# LoadingStateFooter

## Files

```text
design-system/components/atoms/LoadingStateFooter/LoadingStateFooter.module.css (M)
features/showcase/examples/LoadingStateFooter.example.tsx (M)
features/showcase/examples/LoadingStateContentExamples.tsx (C)
features/showcase/examples/useLoadingStateExampleCopy.ts (C)
features/showcase/examples/LoadingStateExamples.module.css (C)
features/showcase-v2/components/LoadingStateFooter/definition.ts (C)
features/showcase-v2/components/LoadingStateFooter/LoadingStateFooter.example.tsx (C)
features/showcase-v2/components/LoadingStateFooter/useLoadingStateFooterExample.ts (C)
features/showcase-v2/components/LoadingStateFooter/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [LoadingState.sc.md](../molecules/LoadingState.sc.md)

## Contract

```tsx
import { Button, LoadingState, LoadingStateBody, LoadingStateFooter } from "@forge-ui/web";

<LoadingState label="Loading records">
  <LoadingStateBody hidden />
  <LoadingStateFooter><Button onClick={requestCancellation}>Cancel</Button></LoadingStateFooter>
</LoadingState>
```

## Styles

```css
.root {
  composes: inline from "../../../styles/layout-components.module.css";
  --inline-gap: var(--space-2);
  --inline-wrap: wrap;
  min-inline-size: var(--zero);
  color: var(--color-text-default);
  overflow-wrap: anywhere;
}

.root[hidden] {
  display: none;
}
```

## Hooks

```ts
"use client";

import { useLoadingStateContext } from "../../../internal/loadingstate/LoadingStateContext";
import type { LoadingStateFooterProps } from "./LoadingStateFooter";

export function useLoadingStateFooter(input: LoadingStateFooterProps) {
  const { children, className, ...props } = input;
  const context = useLoadingStateContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useLoadingStateFooter } from "./useLoadingStateFooter";
import styles from "./LoadingStateFooter.module.css";

export interface LoadingStateFooterProps extends ComponentPropsWithRef<"footer"> {}

export function LoadingStateFooter(props: LoadingStateFooterProps) {
  const view = useLoadingStateFooter(props);
  return (
    <footer {...view.props} className={[styles.root, view.className].filter(Boolean).join(" ")} >
      {view.children}
    </footer>
  );
}
```

## Tests

- V2 LoadingStateFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.
- Header-only and Footer-only compositions retain a real required Body with hidden; Body-only compositions omit optional Header/Footer.
- Additional Body children occupy a full-width content wrapper while Spinner and localized status label remain a single announcement.
- Only Body owns its status/alert announcement; Footer controls stay outside the live content.

## Criteria

- [x] Given LoadingStateFooter, Footer is a scoped LoadingState region; render optional caller actions/messages without adding a live role.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Footer is a scoped LoadingState region; render optional caller actions/messages without adding a live role.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useLoadingStateFooter is colocated with LoadingStateFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content variations and no duplicated complete-family preview.

- [x] Footer-only examples show caller-owned cancellation actions with and without a composed Divider; required Body is hidden and Header omitted.
- [x] The example action produces local cancellation-request feedback only; DS performs no fetching, completion or automatic cancellation.
- [x] Explicit hidden attributes continue to hide flex regions; hidden required context does not leak a visible spinner or loading label into part previews.
- [x] Dedicated example copy covers pt-BR, es and en without changing DS public APIs or the shared example dictionary.
- [x] Integrated visual verification confirms padding, atomic isolation, image sizing and narrow-width layout in the running Showcase.

- [x] V2 **LoadingStateFooter contextual region**: Compose LoadingState and required Body for a cancellable local fixture operation. Footer exposes a visible named Cancel Button that cancels only caller work and reports cancellation; reset/unmount clears pending work without a DS request API. Link to the full owning composition.
- [x] The LoadingStateFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useLoadingStateFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

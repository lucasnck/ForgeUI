---
title: "ToastFooter"
scope: "Toast public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# ToastFooter

## Files

```text
features/showcase/examples/ToastAtomicExamples.tsx (C)
../scripts/check-overlays.cjs (M)
design-system/components/molecules/ToastFooter/ToastFooter.tsx (C)
design-system/components/molecules/ToastFooter/ToastFooter.module.css (C)
design-system/components/molecules/ToastFooter/index.ts (C)
design-system/internal/toast/ToastContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ToastFooter.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/ToastFooter/useToastFooter.ts (C)
features/showcase-v2/components/ToastFooter/definition.ts (C)
features/showcase-v2/components/ToastFooter/ToastFooter.example.tsx (C)
features/showcase-v2/components/ToastFooter/useToastFooterExample.ts (C)
features/showcase-v2/components/ToastFooter/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/components/ToastRegion/fixtures.ts (C)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Toast.sc.md](Toast.sc.md)

## Contract

```tsx
import { ToastRegion, Toast, ToastFooter, ToastBody } from "@forge-ui/web";
<ToastRegion label="Notifications" defaultRecords={records} renderToast={record => <Toast record={record}><ToastBody hidden /><ToastFooter>Additional information</ToastFooter></Toast>} />;
```

## Styles

```css
.root {
  composes: inline from "../../../styles/layout-components.module.css";
  min-inline-size: var(--zero);
  flex-wrap: wrap;
  justify-content: flex-end;
  --inline-gap: var(--space-2);
}

.root[hidden] { display: none; }
```

## Hooks

```tsx
"use client";
import styles from "./ToastFooter.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ToastFooterProps extends ComponentPropsWithRef<"footer"> {
}
import { useToastFooter } from "./useToastFooter";
export function ToastFooter(props: ToastFooterProps) {
  const view = useToastFooter(props);
  return <footer {...view.props} aria-live="off" role={undefined} className={[styles.root, view.props.className].filter(Boolean).join(" ")}>{view.children}</footer>;
}
```

## Content

```tsx
"use client";
import styles from "./ToastFooter.module.css";
import type { ComponentPropsWithRef } from "react";
export interface ToastFooterProps extends ComponentPropsWithRef<"footer"> {
}
import { useToastFooter } from "./useToastFooter";
export function ToastFooter(props: ToastFooterProps) {
  const view = useToastFooter(props);
  return <footer {...view.props} aria-live="off" role={undefined} className={[styles.root, view.props.className].filter(Boolean).join(" ")}>{view.children}</footer>;
}
```

## Tests

- V2 ToastFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Removing or unmounting a record disposes only that record’s lifecycle and timers.
- Focus/pointer pause does not emit a duplicate live announcement.

## Criteria

- [x] Given ToastFooter, Toast part consumes one nearest Toast context and remains a visual region without a live role.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header/Body render supplied text; Footer holds caller action and native dismiss button, whose policy stays in ToastRegion.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useToastFooter is colocated with ToastFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] Showcase uses the public ToastRegion renderer and real Toast owner to display only this region, with all required contextual parts hidden and no repeated complete queue playground.

- [x] V2 **ToastFooter contextual region**: Render through ToastRegion renderToast returning Toast with its required Body. Footer uses the real record action and a named dismiss control through the public scoped notification contract; preserve record identity and one announcement channel. Link to the full owning composition.
- [x] The ToastFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useToastFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the ToastRegion fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

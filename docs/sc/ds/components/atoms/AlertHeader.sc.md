---
title: "AlertHeader"
scope: "Alert public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# AlertHeader

## Files

```text
design-system/components/atoms/AlertHeader/AlertHeader.module.css (M)
features/showcase/examples/AlertHeader.example.tsx (M)
features/showcase/examples/useAlertExample.ts (C)
features/showcase-v2/components/AlertHeader/definition.ts (C)
features/showcase-v2/components/AlertHeader/AlertHeader.example.tsx (C)
features/showcase-v2/components/AlertHeader/useAlertHeaderExample.ts (C)
features/showcase-v2/components/AlertHeader/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Alert.sc.md](../molecules/Alert.sc.md)

## Contract

```tsx
import { Alert, AlertHeader, AlertBody, Heading } from "@forge-ui/web";
<Alert announcement="off"><AlertHeader><Heading level={3}>Saved</Heading></AlertHeader><AlertBody hidden /></Alert>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  --stack-gap: var(--space-2);
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

import { useAlertContext } from "../../../internal/alert/AlertContext";
import type { AlertHeaderProps } from "./AlertHeader";

export function useAlertHeader(input: AlertHeaderProps) {
  const { children, className, ...props } = input;
  const context = useAlertContext();
  return { children, className, props, context };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useAlertHeader } from "./useAlertHeader";
import styles from "./AlertHeader.module.css";

export interface AlertHeaderProps extends ComponentPropsWithRef<"header"> {}

export function AlertHeader(props: AlertHeaderProps) {
  const view = useAlertHeader(props);
  return (
    <header
      {...view.props}
      className={[styles.root, view.className].filter(Boolean).join(" ")}
      id={view.context.titleId}
    >
      {view.children}
    </header>
  );
}
```

## Tests

- V2 AlertHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server rendering forwards native attributes/classes and produces deterministic semantic regions.
- Missing required Body, duplicate/unknown regions and orphan contextual parts fail clearly.
- Optional Header/Footer add no empty wrapper; Header IDs stay scoped.
- Only Body owns its status/alert announcement; Footer controls stay outside the live content.

## Criteria

- [x] Given AlertHeader, Header is a scoped Alert region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Header is a scoped Alert region; provide visible title content with an explicit Heading where a semantic heading is needed.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useAlertHeader is colocated with AlertHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase isolates title-only and icon-plus-title headers with a hidden required Body and no Footer.

- [x] Hidden parts remain display:none; visible child content has tokenized vertical spacing.

- [x] V2 **AlertHeader contextual region**: Render AlertHeader through public Alert with the minimum valid siblings. Use a real Heading or owner title slot with Children/Title text; any decorative icon has an aligned Inline gap="2" row outside heading text. Hide/omit optional siblings only where allowed by the owner; link to the full Alert composition.
- [x] The AlertHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAlertHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

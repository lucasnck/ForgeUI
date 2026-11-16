---
title: "StepperBody"
scope: "Stepper public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# StepperBody

## Files

```text
features/showcase/examples/StepperPartExamples.tsx (C)
design-system/components/atoms/StepperBody/StepperBody.tsx (C)
design-system/components/atoms/StepperBody/StepperBody.module.css (C)
design-system/components/atoms/StepperBody/index.ts (C)
design-system/internal/stepper/StepperContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/StepperBody.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/StepperBody/useStepperBody.ts (C)
../scripts/check-static-components.cjs (M)
features/showcase-v2/components/StepperBody/definition.ts (C)
features/showcase-v2/components/StepperBody/StepperBody.example.tsx (C)
features/showcase-v2/components/StepperBody/useStepperBodyExample.ts (C)
features/showcase-v2/components/StepperBody/usage-code.ts (C)
features/showcase-v2/components/Stepper/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Stepper.sc.md](../organisms/Stepper.sc.md)

## Contract

```tsx
import { Stepper, StepperBody, StepperHeader, StepperItem, StepperPanel } from "@forge-ui/web";
<Stepper label="Setup" value="details" onStepChange={setStep}><StepperHeader hidden><StepperItem value="details" label="Details" /></StepperHeader><StepperBody><StepperPanel value="details">Lorem ipsum dolor sit amet.</StepperPanel></StepperBody></Stepper>;
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

```tsx
"use client";

import { useStepperContext } from "../../../internal/stepper/StepperContext";
import type { StepperBodyProps } from "./StepperBody";

export function useStepperBody({ children, className, ...props }: StepperBodyProps) {
  useStepperContext();
  return { props, children, className };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { collectStepperChildren } from "../../../internal/stepper/collectStepperChildren";
import { StepperPanel } from "../StepperPanel";
import { useStepperBody } from "./useStepperBody";
import styles from "./StepperBody.module.css";

export interface StepperBodyProps extends ComponentPropsWithRef<"div"> {}

export function StepperBody(input: StepperBodyProps) {
  const { props, children, className } = useStepperBody(input);
  collectStepperChildren(children, StepperPanel, "StepperBody");
  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
```

## Tests

- V2 StepperBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server-render one current step, linked control/panel ids, visible status descriptions and mounted hidden panels.
- Reject unknown controlled values, duplicate values, missing matching panels and orphan parts.
- Exercise the owning hook: ignore current/disabled/unregistered/disconnected requests, preserve controlled rejection, emit one accepted request and repair focus on accepted panel change.
- In the browser, verify native activation, caller prevention, input preservation and focus repair without roving or automatic progression.

## Criteria

- [x] Given StepperBody, Body is a scoped Stepper region; render content without owning business state.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Body is a scoped Stepper region; render content without owning business state.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useStepperBody is colocated with StepperBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **StepperBody contextual region**: Render StepperBody through public Stepper with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full Stepper composition.
- [x] The StepperBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useStepperBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Stepper fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

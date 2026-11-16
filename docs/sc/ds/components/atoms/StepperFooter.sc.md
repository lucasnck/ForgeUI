---
title: "StepperFooter"
scope: "Stepper public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# StepperFooter

## Files

```text
features/showcase/examples/StepperPartExamples.tsx (C)
design-system/components/atoms/StepperFooter/StepperFooter.tsx (C)
design-system/components/atoms/StepperFooter/StepperFooter.module.css (C)
design-system/components/atoms/StepperFooter/index.ts (C)
design-system/internal/stepper/StepperContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/StepperFooter.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/StepperFooter/useStepperFooter.ts (C)
../scripts/check-static-components.cjs (M)
features/showcase-v2/components/StepperFooter/definition.ts (C)
features/showcase-v2/components/StepperFooter/StepperFooter.example.tsx (C)
features/showcase-v2/components/StepperFooter/useStepperFooterExample.ts (C)
features/showcase-v2/components/StepperFooter/usage-code.ts (C)
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
import { Stepper, StepperHeader, StepperItem, StepperBody, StepperPanel, StepperFooter, Button } from "@forge-ui/web";
<Stepper label="Setup" value="details" onStepChange={setStep}><StepperHeader><StepperItem value="details" label="Details"/><StepperItem value="review" label="Review"/></StepperHeader><StepperBody><StepperPanel value="details">Details fields</StepperPanel><StepperPanel value="review">Review fields</StepperPanel></StepperBody><StepperFooter><Button onClick={nextStep}>Next</Button></StepperFooter></Stepper>;
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
import type { StepperFooterProps } from "./StepperFooter";

export function useStepperFooter({ children, className, ...props }: StepperFooterProps) {
  useStepperContext();
  return { props, children, className };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useStepperFooter } from "./useStepperFooter";
import styles from "./StepperFooter.module.css";

export interface StepperFooterProps extends ComponentPropsWithRef<"div"> {}

export function StepperFooter(input: StepperFooterProps) {
  const { props, children, className } = useStepperFooter(input);
  return (
    <div {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
```

## Tests

- V2 StepperFooter contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server-render one current step, linked control/panel ids, visible status descriptions and mounted hidden panels.
- Reject unknown controlled values, duplicate values, missing matching panels and orphan parts.
- Exercise the owning hook: ignore current/disabled/unregistered/disconnected requests, preserve controlled rejection, emit one accepted request and repair focus on accepted panel change.
- In the browser, verify native activation, caller prevention, input preservation and focus repair without roving or automatic progression.

## Criteria

- [x] Given StepperFooter, Footer is a scoped Stepper region; render optional caller actions/messages without adding a live role.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Footer is a scoped Stepper region; render optional caller actions/messages without adding a live role.
- [x] No independent state store or route landmark is created.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useStepperFooter is colocated with StepperFooter and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **StepperFooter contextual region**: Compose StepperHeader/Body with two matching Item/Panel values; Footer places Back and Next Buttons in an end-aligned wrapping Inline gap="2" group. Caller onStepChange/value owns accepted progress; boundary buttons disable appropriately. Link to the full owning composition.
- [x] The StepperFooter V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useStepperFooterExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Stepper fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

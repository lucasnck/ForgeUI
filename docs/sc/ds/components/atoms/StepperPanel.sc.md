---
title: "StepperPanel"
scope: "Stepper public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# StepperPanel

## Files

```text
features/showcase/examples/StepperPartExamples.tsx (C)
design-system/components/atoms/StepperPanel/StepperPanel.tsx (C)
design-system/components/atoms/StepperPanel/StepperPanel.module.css (C)
design-system/components/atoms/StepperPanel/index.ts (C)
design-system/internal/stepper/StepperContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/StepperPanel.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/StepperPanel/useStepperPanel.ts (C)
../scripts/check-static-components.cjs (M)
features/showcase-v2/components/StepperPanel/definition.ts (C)
features/showcase-v2/components/StepperPanel/StepperPanel.example.tsx (C)
features/showcase-v2/components/StepperPanel/useStepperPanelExample.ts (C)
features/showcase-v2/components/StepperPanel/usage-code.ts (C)
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
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";

import { useImperativeHandle, useRef } from "react";
import type { FocusEventHandler } from "react";
import { useStepperContext } from "../../../internal/stepper/StepperContext";
import type { StepperPanelProps } from "./StepperPanel";

export function useStepperPanel({ value, children, className, ref, onFocusCapture, onBlurCapture, ...props }: StepperPanelProps) {
  const { value: current, stepId, panelId, markPanelFocus } = useStepperContext();
  const panelRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => panelRef.current!, []);
  const hidden = current !== value;
  const handleFocus: FocusEventHandler<HTMLDivElement> = (event) => {
    onFocusCapture?.(event);
    if (!event.defaultPrevented) markPanelFocus(value, true);
  };
  const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    onBlurCapture?.(event);
    if (!hidden && !event.defaultPrevented) markPanelFocus(value, !!panelRef.current?.contains(event.relatedTarget));
  };
  return { props, children, className, panelRef, hidden, id: panelId(value), labelId: stepId(value), handleFocus, handleBlur };
}
```

## Content

```tsx
"use client";

import type { ComponentPropsWithRef } from "react";
import { useStepperPanel } from "./useStepperPanel";
import styles from "./StepperPanel.module.css";

export interface StepperPanelProps extends ComponentPropsWithRef<"div"> { value: string; }
export function StepperPanel(input: StepperPanelProps) {
  const { props, children, className, panelRef, hidden, id, labelId, handleFocus, handleBlur } = useStepperPanel(input);
  return <div {...props} ref={panelRef} id={id} aria-labelledby={labelId} hidden={hidden} onFocusCapture={handleFocus} onBlurCapture={handleBlur} className={[styles.root, className].filter(Boolean).join(" ")}>{children}</div>;
}
```

## Tests

- V2 StepperPanel contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server-render one current step, linked control/panel ids, visible status descriptions and mounted hidden panels.
- Reject unknown controlled values, duplicate values, missing matching panels and orphan parts.
- Exercise the owning hook: ignore current/disabled/unregistered/disconnected requests, preserve controlled rejection, emit one accepted request and repair focus on accepted panel change.
- In the browser, verify native activation, caller prevention, input preservation and focus repair without roving or automatic progression.

## Criteria

- [x] Given StepperPanel, Panel remains mounted so inputs retain values.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Panel remains mounted so inputs retain values.
- [x] Root/consumer owns accepted transition focus before hiding prior focused content; geometry/content switch is immediate.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useStepperPanel is colocated with StepperPanel and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **StepperPanel contextual region**: Render StepperPanel through public Stepper with the minimum valid siblings. Pair this panel with its public registered trigger/item and stable value item-1; accepted selection reveals the corresponding content and preserves focus/hidden-state rules. Hide/omit optional siblings only where allowed by the owner; link to the full Stepper composition.
- [x] The StepperPanel V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useStepperPanelExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Stepper fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

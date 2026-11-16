---
title: "StepperItem"
scope: "Stepper public part with independently specified semantics and no duplicate family state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# StepperItem

## Files

```text
features/showcase/examples/StepperPartExamples.tsx (C)
design-system/components/molecules/StepperItem/StepperItem.tsx (C)
design-system/components/molecules/StepperItem/StepperItem.module.css (C)
design-system/components/molecules/StepperItem/index.ts (C)
design-system/internal/stepper/StepperContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/StepperItem.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/StepperItem/useStepperItem.ts (C)
design-system/components/static-components.contracts.test.ts (M)
../scripts/check-static-components.cjs (M)
features/showcase-v2/components/StepperItem/definition.ts (C)
features/showcase-v2/components/StepperItem/StepperItem.example.tsx (C)
features/showcase-v2/components/StepperItem/useStepperItemExample.ts (C)
features/showcase-v2/components/StepperItem/usage-code.ts (C)
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
- [Button.sc.md](../atoms/Button.sc.md)
- [Badge.sc.md](../atoms/Badge.sc.md)

## Contract

```tsx
import { Stepper, StepperHeader, StepperItem, StepperBody, StepperPanel, StepperFooter, Button } from "@forge-ui/web";
<Stepper label="Setup" value="details" onStepChange={setStep}><StepperHeader><StepperItem value="details" label="Details"/><StepperItem value="review" label="Review"/></StepperHeader><StepperBody><StepperPanel value="details">Details fields</StepperPanel><StepperPanel value="review">Review fields</StepperPanel></StepperBody><StepperFooter><Button onClick={nextStep}>Next</Button></StepperFooter></Stepper>;
```

## Styles

```css
.root {
  composes: inline from "../../../styles/layout-components.module.css";
  min-inline-size: var(--zero);
  color: var(--color-text-default);
}
.action {
  composes: stateFeedback from "../../../styles/motion-components.module.css";
}
```

## Hooks

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import type { MouseEventHandler } from "react";
import { useStepperContext } from "../../../internal/stepper/StepperContext";
import type { StepperItemProps } from "./StepperItem";

export function useStepperItem({ value, label, status = "pending", statusLabel, disabled = false, onClick, className, animated = true, children, ...props }: StepperItemProps) {
  const { registerStep, requestStep, stepId, panelId, value: current } = useStepperContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  if (!label.trim()) throw new Error("StepperItem requires a nonempty label.");
  if (status !== "pending" && !statusLabel?.trim()) throw new Error("A complete/error StepperItem requires a visible statusLabel.");
  useLayoutEffect(() => registerStep(value, disabled, buttonRef), [registerStep, value, disabled]);
  const handleClick: MouseEventHandler<HTMLLIElement> = (event) => {
    onClick?.(event);
    if (!event.defaultPrevented && !disabled && buttonRef.current?.contains(event.target as Node)) requestStep(value);
  };
  const statusId = status === "pending" ? undefined : stepId(value) + "-status";
  return { props, className, children, buttonRef, disabled, animated, label, status, statusLabel, statusId, selected: current === value, id: stepId(value), panel: panelId(value), handleClick };
}
```

## Content

```tsx
"use client";

import type { NativeCollectionItemProps } from "../../../types/compound-composition";
import type { StepStatus } from "../../../types/collection-contracts";
import type { ComponentAnimatedProps } from "../../../types/animation";
import { Button } from "../../atoms/Button";
import { Badge } from "../../atoms/Badge";
import { useStepperItem } from "./useStepperItem";
import styles from "./StepperItem.module.css";

export interface StepperItemProps extends NativeCollectionItemProps, ComponentAnimatedProps {
  value: string;
  label: string;
  status?: StepStatus;
  statusLabel?: string;
  disabled?: boolean;
}
export function StepperItem(input: StepperItemProps) {
  const { props, className, children, buttonRef, disabled, animated, label, status, statusLabel, statusId, selected, id, panel, handleClick } = useStepperItem(input);
  return <li {...props} role={undefined} aria-current={undefined} className={[styles.root, className].filter(Boolean).join(" ")} onClick={handleClick}>
    <Button ref={buttonRef} id={id} aria-controls={panel} aria-describedby={statusId} disabled={disabled} type="button" aria-current={selected ? "step" : undefined} tone="neutral" appearance={selected ? "soft" : "ghost"} data-animated={animated} className={styles.action}>{label}</Button>
    {status !== "pending" && <Badge id={statusId} tone={status === "complete" ? "success" : "danger"}>{statusLabel}</Badge>}
    {children}
  </li>;
}
```

## Tests

- V2 Registered step control: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server-render one current step, linked control/panel ids, visible status descriptions and mounted hidden panels.
- Reject unknown controlled values, duplicate values, missing matching panels and orphan parts.
- Exercise the owning hook: ignore current/disabled/unregistered/disconnected requests, preserve controlled rejection, emit one accepted request and repair focus on accepted panel change.
- In the browser, verify native activation, caller prevention, input preservation and focus repair without roving or automatic progression.

## Criteria

- [x] Given StepperItem, Item composes native action and optional status Badge.
- [x] The Native attributes / children contract uses Forward to semantic owner; context-owned role/id/ARIA fields take precedence.
- [x] The Local fields contract uses Required unless optional in Signature; constraints stated below.
- [x] The Missing region contract uses Parent omits it; no empty wrapper.
- [x] Root registers enabled value metadata for request validation; no click marks completion or bypasses owner validation.
- [x] Use the existing control/surface recipes for composed atoms; local spacing consumes --space-2 only where this part owns it.
- [x] useStepperItem is colocated with StepperItem and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **Registered step control**: Compose StepperHeader with two StepperItems and matching StepperPanels inside StepperBody. Stable item-1..2 values pair Label/Children 1..2; selection and disabled navigation use accepted onStepChange and the part links to Stepper.
- [x] The StepperItem V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useStepperItemExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Stepper fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

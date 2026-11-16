---
title: "AccordionHeader"
scope: "Accordion compound part: AccordionHeader. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# AccordionHeader

## Files

```text
features/showcase/examples/AccordionContentExamples.tsx (C)
features/showcase/examples/AccordionExamples.module.css (C)
features/showcase/examples/AccordionBehaviorExamples.tsx (C)
features/showcase/examples/useExampleCopy.ts (M)
../public/images/showcase/accordion-landscape.svg (C)
design-system/components/atoms/AccordionHeader/AccordionHeader.tsx (C)
design-system/components/atoms/AccordionHeader/AccordionHeader.module.css (C)
design-system/components/atoms/AccordionHeader/index.ts (C)
design-system/internal/accordion/AccordionContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/AccordionHeader.example.tsx (M)
features/showcase/examples/AccordionBody.example.tsx (M)
../scripts/check-overlays.cjs (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/AccordionHeader/useAccordionHeader.ts (C)
features/showcase-v2/components/DisclosureExamples/DisclosureExamples.module.css (C)
features/showcase-v2/components/AccordionHeader/definition.ts (C)
features/showcase-v2/components/AccordionHeader/AccordionHeader.example.tsx (C)
features/showcase-v2/components/AccordionHeader/useAccordionHeaderExample.ts (C)
features/showcase-v2/components/AccordionHeader/usage-code.ts (C)
features/showcase-v2/components/Accordion/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)

## Contract

```tsx
import {
  Surface,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "@forge-ui/web";

<Surface padding="2" shape="rounded">
  <Accordion
    level={3}
    value={expandedValues}
    onValueChange={onExpandedValuesChange}
  >
    <AccordionItem value="item-1">
      <AccordionHeader>Children 1</AccordionHeader>
      <AccordionBody hidden />
    </AccordionItem>
  </Accordion>
</Surface>;
```

## Styles

```css
.root {
  composes: interactive from "../../../styles/interactive-components.module.css";
  composes: stateFeedback from "../../../styles/motion-components.module.css";
  appearance: none;
  background: var(--color-transparent);
  border: var(--zero);
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-align: start;
  display: flex;
  align-items: center;
  min-block-size: var(--component-height-md);
  padding: var(--space-2);
  inline-size: var(--size-full);
  overflow-wrap: anywhere;
}
```

## Animations

```text
stateFeedback
```

## Hooks

```tsx
"use client";
import { useAccordionContext } from "../../../internal/accordion/AccordionContext";
import { useMemo } from "react";
import type { Ref } from "react";
import { useAccordionItemContext } from "../../../internal/accordion/AccordionItemContext";
import type { AccordionHeaderProps } from "./AccordionHeader";
function mergeRefs(owned: { current: HTMLButtonElement | null }, supplied: Ref<HTMLButtonElement> | undefined) {
  return (node: HTMLButtonElement | null) => {
    owned.current = node;
    if (typeof supplied === "function") {
      const cleanup = supplied(node);
      if (cleanup) return () => { owned.current = null; cleanup(); };
    } else if (supplied) supplied.current = node;
  };
}
export function useAccordionHeader(input: AccordionHeaderProps) {
  const collapse = useAccordionItemContext();
  const { level, animated } = useAccordionContext();
  const { children, className, onClick, disabled: suppliedDisabled, ref: suppliedRef, ...props } = input;
  const disabled = collapse.disabled || suppliedDisabled;
  const handleClick: NonNullable<AccordionHeaderProps["onClick"]> = (event) => { onClick?.(event); if (!event.defaultPrevented && !disabled) collapse.toggle(); };
  const ref = useMemo(() => mergeRefs(collapse.triggerRef, suppliedRef), [collapse.triggerRef, suppliedRef]);
  return { level, animated, children, className, props, triggerProps: { ...collapse.triggerProps, disabled }, handleClick, ref };
}
```

## Content

```tsx
"use client";
import type { NativeCompoundTriggerProps } from "../../../types";
import { useAccordionHeader } from "./useAccordionHeader";
import { Heading } from "../Heading";
import styles from "./AccordionHeader.module.css";
export interface AccordionHeaderProps extends NativeCompoundTriggerProps {}
export function AccordionHeader(input: AccordionHeaderProps) {
  const { level, animated, children, className, props, triggerProps, handleClick, ref } = useAccordionHeader(input);
  return <Heading level={level}><button {...props}  {...triggerProps} ref={ref} type="button" data-animated={animated} onClick={handleClick} className={[styles.root, className].filter(Boolean).join(" ")}>{children}</button></Heading>;
}
```

## Tests

- V2 AccordionHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR for native relationships, retained closed content, heading depth, scoped parts and unique Accordion identities. Browser checks cover Enter/Space single activation, caller cancellation, disabled state, scoped relationships and inherited animated=false with zero transition duration and immediate focus.

- Opening and closing request state once while rejected controlled updates remain authoritative.
- A disabled trigger and caller-prevented activation emit no owned request.
- Closing a panel with focus inside repairs focus before pixels can remain on exit.

## Criteria

- [x] Given AccordionHeader, Header is the sole native disclosure trigger; Enter/Space activate through click exactly once.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Header is the sole native disclosure trigger; Enter/Space activate through click exactly once.
- [x] Preserve visible text as the accessible name and never trigger a separate state toggle.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] inactive ↔ active/selected → Current selection, active-descendant or native activation → Actual item control/background, not a second list surface → stateFeedback; --motion-fast / --ease-standard.
- [x] Use only the item states supported by its owning contract.
- [x] Native focus and aria-selected/current/expanded/activedescendant update immediately; arrow navigation never waits for motion.
- [x] The item does not allocate a presence/selection clock.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useAccordionHeader is colocated with AccordionHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase presents isolated text-only and text-with-icon headers, using the real family context and no visible Body or Footer.

- [x] V2 **AccordionHeader contextual region**: Render AccordionHeader through public Accordion and AccordionItem with the minimum valid siblings. Use Children text in the actual owner-provided trigger/heading structure; any decorative icon has explicit gap="2". Do not nest another Heading or interactive control inside the trigger. Hide/omit optional siblings only where allowed by the owner; link to the full Accordion composition.
- [x] The AccordionHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAccordionHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Accordion fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

- [x] V2 uses public Surface around the family and padded public Surface content with DS Inline icon/text spacing. Disclosure owners remain structural/behavioral; direct public parts and a single native trigger are preserved, without nested buttons. Where present, action footers retain aligned secondary/primary buttons; minimal copyable code matches the visible composition.

- [x] Header neutralizes browser button appearance without adding a card surface; the immediate focus outline and native disabled state remain visible.

---
title: "CollapseHeader"
scope: "Collapse compound part: CollapseHeader. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# CollapseHeader

## Files

```text
design-system/components/atoms/CollapseHeader/CollapseHeader.module.css (M)
features/showcase/examples/CollapseHeader.example.tsx (M)
features/showcase-v2/components/DisclosureExamples/DisclosureExamples.module.css (C)
features/showcase-v2/components/CollapseHeader/definition.ts (C)
features/showcase-v2/components/CollapseHeader/CollapseHeader.example.tsx (C)
features/showcase-v2/components/CollapseHeader/useCollapseHeaderExample.ts (C)
features/showcase-v2/components/CollapseHeader/usage-code.ts (C)
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
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "@forge-ui/web";

<Surface padding="2" shape="rounded">
  <Collapse open={open} onOpenChange={onOpenChange}>
    <CollapseHeader>Children</CollapseHeader>
    <CollapseBody hidden />
  </Collapse>
</Surface>;
```

## Styles

```css
.root {
  composes: interactive from "../../../styles/interactive-components.module.css";
  composes: stateFeedback from "../../../styles/motion-components.module.css";
  display: flex;
  align-items: center;
  gap: var(--space-1);
  min-inline-size: var(--zero);
  min-block-size: var(--component-height-md);
  padding: var(--space-2);
  overflow-wrap: anywhere;
  text-align: start;
  appearance: none;
  background: var(--color-transparent);
  border: var(--zero);
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.root[hidden] {
  display: none;
}
```

## Animations

```text
stateFeedback
```

## Hooks

```tsx
"use client";
import { useMemo } from "react";
import type { Ref } from "react";
import { useCollapseContext } from "../../../internal/collapse/CollapseContext";
import type { CollapseHeaderProps } from "./CollapseHeader";
function mergeRefs(owned: { current: HTMLButtonElement | null }, supplied: Ref<HTMLButtonElement> | undefined) {
  return (node: HTMLButtonElement | null) => {
    owned.current = node;
    if (typeof supplied === "function") {
      const cleanup = supplied(node);
      if (cleanup) return () => { owned.current = null; cleanup(); };
    } else if (supplied) supplied.current = node;
  };
}
export function useCollapseHeader(input: CollapseHeaderProps) {
  const collapse = useCollapseContext();
  const { children, className, onClick, disabled: suppliedDisabled, ref: suppliedRef, ...props } = input;
  const disabled = collapse.disabled || suppliedDisabled;
  const handleClick: NonNullable<CollapseHeaderProps["onClick"]> = (event) => { onClick?.(event); if (!event.defaultPrevented && !disabled) collapse.toggle(); };
  const ref = useMemo(() => mergeRefs(collapse.triggerRef, suppliedRef), [collapse.triggerRef, suppliedRef]);
  return { animated: collapse.animated, children, className, props, triggerProps: { ...collapse.triggerProps, disabled }, handleClick, ref };
}
```

## Content

```tsx
"use client";
import type { NativeCompoundTriggerProps } from "../../../types";
import { useCollapseHeader } from "./useCollapseHeader";
import styles from "./CollapseHeader.module.css";
export interface CollapseHeaderProps extends NativeCompoundTriggerProps {}
export function CollapseHeader(input: CollapseHeaderProps) {
  const { animated, children, className, props, triggerProps, handleClick, ref } = useCollapseHeader(input);
  return <button {...props} {...triggerProps} ref={ref} type="button" data-animated={animated} onClick={handleClick} className={[styles.root, className].filter(Boolean).join(" ")}>{children}</button>;
}
```

## Tests

- V2 CollapseHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR for native relationships, retained closed content, scoped parts and unique Collapse identities. Browser checks cover Enter/Space single activation, caller cancellation, disabled state, immediate focus and inherited motion opt-out.

- Opening and closing request state once while rejected controlled updates remain authoritative.
- A disabled trigger and caller-prevented activation emit no owned request.
- Closing a panel with focus inside repairs focus before pixels can remain on exit.

## Criteria

- [x] Given CollapseHeader, Header is the sole native disclosure trigger; Enter/Space activate through click exactly once.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing optional region contract uses Owner omits Footer; no generated empty wrapper. Header and Body remain required.
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
- [x] useCollapseHeader is colocated with CollapseHeader and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase isolates native text, icon-plus-text and disabled triggers with a hidden required Body, without Footer, nested buttons, close actions or forced dividers.

- [x] Hidden parts remain display:none; visible child content receives tokenized inset and spacing without altering the shared disclosure boundary.

- [x] V2 **CollapseHeader contextual region**: Render CollapseHeader through public Collapse with the minimum valid siblings. Use Children text in the actual owner-provided trigger/heading structure; any decorative icon has explicit gap="2". Do not nest another Heading or interactive control inside the trigger. Hide/omit optional siblings only where allowed by the owner; link to the full Collapse composition.
- [x] The CollapseHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useCollapseHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

- [x] V2 uses public Surface around the family and padded public Surface content with DS Inline icon/text spacing. Disclosure owners remain structural/behavioral; direct public parts and a single native trigger are preserved, without nested buttons. Where present, action footers retain aligned secondary/primary buttons; minimal copyable code matches the visible composition.

- [x] Header neutralizes browser button appearance without adding a card surface; the immediate focus outline and native disabled state remain visible.

---
title: "Collapse"
scope: "Aggregate scoped Collapse parts and consume DS-owned behavior; no duplicate item markup or hook state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Collapse

## Files

```text
design-system/components/molecules/Collapse/Collapse.tsx (M)
design-system/components/molecules/Collapse/Collapse.module.css (M)
features/showcase/examples/Collapse.example.tsx (M)
features/showcase/examples/CollapseBehaviorExamples.tsx (C)
features/showcase-v2/components/DisclosureExamples/DisclosureExamples.module.css (C)
features/showcase-v2/components/Collapse/definition.ts (C)
features/showcase-v2/components/Collapse/Collapse.example.tsx (C)
features/showcase-v2/components/Collapse/useCollapseExample.ts (C)
features/showcase-v2/components/Collapse/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)
- [CollapseHeader.sc.md](../atoms/CollapseHeader.sc.md)
- [CollapseBody.sc.md](../atoms/CollapseBody.sc.md)
- [CollapseFooter.sc.md](../atoms/CollapseFooter.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [usePresence](../../hooks/tech-presence.sc.md)
- [Selection, panel and open-state contracts](../../types/tech-selection-navigation.sc.md)
- [Compound parts](../../helpers/tech-compound-parts.sc.md)

## Contract

```tsx
import {
  Surface,
  Collapse,
  CollapseHeader,
  CollapseBody,
  Text,
  CollapseFooter,
  Inline,
  Button,
} from "@forge-ui/web";

<Surface padding="2" shape="rounded">
  <Collapse open={open} onOpenChange={onOpenChange}>
    <CollapseHeader>Children</CollapseHeader>
    <CollapseBody>
      <Surface elevation="flat" padding="4">
        <Text>Children</Text>
      </Surface>
    </CollapseBody>
    <CollapseFooter>
      <Inline gap="2" padding="4" justify="end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </Inline>
    </CollapseFooter>
  </Collapse>
</Surface>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; min-inline-size: var(--zero); }
.panel { composes: disclosurePresence from "../../../styles/motion-components.module.css"; }
.panel[hidden] { display: none; }
.clip { composes: clip from "../../../styles/motion-components.module.css"; }

.root[hidden] { display: none; }
```

## Animations

```text
disclosurePresence
clip
```

## Hooks

```tsx
"use client";
import { useCollapse } from "../../../hooks/collapse/useCollapse";
import { usePresence } from "../../../hooks/motion/usePresence";
import type { CollapseProps } from "./Collapse";
export function useCollapseView(input: CollapseProps) {
  const { open, defaultOpen, onOpenChange, disabled, children, animated = true, className, ...props } = input;
  const collapse = useCollapse({ open, defaultOpen, onOpenChange, disabled });
  const presence = usePresence({ open: collapse.open, elementRef: collapse.bodyRef, enabled: animated });
  return { props, children, className, animated, context: { ...collapse, animated }, bodyRef: collapse.bodyRef, bodyProps: collapse.bodyProps, acceptedOpen: collapse.open, phase: presence.phase, onTransitionEnd: presence.onTransitionEnd };
}
```

## Content

```tsx
"use client";
import type { ComponentAnimatedProps, ComponentChildrenProps, ComponentOpenProps, NativeCollectionRootProps } from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { CollapseContext } from "../../../internal/collapse/CollapseContext";
import { CollapseHeader } from "../../atoms/CollapseHeader";
import { CollapseBody } from "../../atoms/CollapseBody";
import { CollapseFooter } from "../../atoms/CollapseFooter";
import { useCollapseView } from "./useCollapseView";
import styles from "./Collapse.module.css";
export interface CollapseProps extends NativeCollectionRootProps, ComponentChildrenProps, ComponentOpenProps, ComponentAnimatedProps { disabled?: boolean; }
export function Collapse(input: CollapseProps) {
  const { props, children, className, animated, context, bodyRef, bodyProps, acceptedOpen, phase, onTransitionEnd } = useCollapseView(input);
  const parts = collectCompoundParts(children, { header: CollapseHeader, body: CollapseBody, footer: CollapseFooter });
  return <CollapseContext value={context}><div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="0">
    {parts.header}<div {...bodyProps} ref={bodyRef} hidden={phase === "unmounted"} inert={!acceptedOpen || undefined} aria-hidden={!acceptedOpen || undefined} className={styles.panel} data-motion-state={phase} data-animated={animated} onTransitionEnd={onTransitionEnd}><div className={styles.clip}>{parts.body}{parts.footer}</div></div>
  </div></CollapseContext>;
}
```

## Tests

- V2 Visible disclosure: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR for native relationships, retained closed content, heading depth, scoped parts and unique Accordion identities. Browser transition/focus coverage remains separate.

- Opening and closing request state once while rejected controlled updates remain authoritative.
- A disabled trigger and caller-prevented activation emit no owned request.
- Closing a panel with focus inside repairs focus before pixels can remain on exit.

## Criteria

- [x] The children contract uses Explicit public parts; keyed fragments allowed; no arbitrary descendant cloning.
- [x] Header and Body are required; an absent optional Footer introduces no empty region.
- [x] The open / defaultOpen / disabled contract uses undefined / false / false.
- [x] Root owns the single hidden outer panel, which wraps Body and Footer together.
- [x] Closing repairs focus through the hook; children stay mounted.
- [x] Root has no sibling exclusivity rule.
- [x] Disclosure motion uses the shared recipe and the animated opt-out; semantic state and focus remain immediate.
- [x] Public native attributes go to their semantic owner.
- [x] Normalize permitted direct parts/keyed fragments with private collectCompoundParts; it receives actual imported component identities, never displayName strings.
- [x] Forward caller events before owned handlers and respect defaultPrevented.
- [x] No new token family or motion is added.
- [x] State, callbacks, native form values and focus update immediately.
- [x] collapsed ↔ expanded → Authoritative useCollapse/useAccordion state → One root-owned .panel containing Body and Footer → disclosurePresence; --motion-normal / --ease-standard.
- [x] Closing repairs focus and makes the retained panel inert/aria-hidden immediately.
- [x] Body/Footer stay mounted through the accepted transition and share one completion owner.
- [x] Reduced motion, animated=false and zero computed duration settle immediately.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useCollapseView is colocated with Collapse and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Complete text and illustrated compositions retain disclosure behavior; the controlled behavior playground is demonstrated only under Collapse.
- [x] Owned Header, Body and Footer provide internal spacing while one unchanged outer panel controls disclosure visibility and motion.

- [x] V2 **Visible disclosure**: Use the actual trigger/body contract with Children/Label text; keyboard/pointer opens and closes, supported controlled rejection stays authoritative, and animation opt-out preserves focus behavior.
- [x] The Collapse V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useCollapseExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

- [x] V2 uses public Surface around the family and padded public Surface content with DS Inline icon/text spacing. Disclosure owners remain structural/behavioral; direct public parts and a single native trigger are preserved, without nested buttons. Where present, action footers retain aligned secondary/primary buttons; minimal copyable code matches the visible composition.

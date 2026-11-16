---
title: "Accordion"
scope: "Aggregate scoped Accordion parts and consume DS-owned behavior; no duplicate item markup or hook state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Accordion

## Files

```text
features/showcase/examples/AccordionContentExamples.tsx (C)
features/showcase/examples/AccordionExamples.module.css (C)
features/showcase/examples/AccordionBehaviorExamples.tsx (C)
features/showcase/examples/useExampleCopy.ts (M)
../public/images/showcase/accordion-landscape.svg (C)
design-system/components/molecules/Accordion/Accordion.tsx (C)
design-system/components/molecules/Accordion/Accordion.module.css (C)
design-system/components/molecules/Accordion/index.ts (C)
design-system/internal/accordion/AccordionContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/Accordion.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/Accordion/useAccordionView.ts (C)
features/showcase-v2/components/DisclosureExamples/DisclosureExamples.module.css (C)
features/showcase-v2/components/Accordion/definition.ts (C)
features/showcase-v2/components/Accordion/Accordion.example.tsx (C)
features/showcase-v2/components/Accordion/useAccordionExample.ts (C)
features/showcase-v2/components/Accordion/usage-code.ts (C)
features/showcase-v2/components/Accordion/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)
- [AccordionItem.sc.md](AccordionItem.sc.md)
- [AccordionHeader.sc.md](../atoms/AccordionHeader.sc.md)
- [AccordionBody.sc.md](../atoms/AccordionBody.sc.md)
- [AccordionFooter.sc.md](../atoms/AccordionFooter.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [usePresence](../../hooks/tech-presence.sc.md)
- [Typography contracts](../../types/tech-typography-contracts.sc.md)

## Contract

```tsx
import {
  Surface,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Text,
  AccordionFooter,
  Inline,
  Button,
} from "@forge-ui/web";

<Surface padding="2" shape="rounded">
  <Accordion
    level={3}
    value={expandedValues}
    onValueChange={onExpandedValuesChange}
  >
    <AccordionItem value="item-1">
      <AccordionHeader>Children 1</AccordionHeader>
      <AccordionBody>
        <Surface elevation="flat" padding="4">
          <Text>Children 1</Text>
        </Surface>
      </AccordionBody>
      <AccordionFooter>
        <Inline gap="2" padding="4" justify="end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </Inline>
      </AccordionFooter>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionHeader>Children 2</AccordionHeader>
      <AccordionBody>
        <Surface elevation="flat" padding="4">
          <Text>Children 2</Text>
        </Surface>
      </AccordionBody>
      <AccordionFooter>
        <Inline gap="2" padding="4" justify="end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </Inline>
      </AccordionFooter>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionHeader>Children 3</AccordionHeader>
      <AccordionBody>
        <Surface elevation="flat" padding="4">
          <Text>Children 3</Text>
        </Surface>
      </AccordionBody>
      <AccordionFooter>
        <Inline gap="2" padding="4" justify="end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </Inline>
      </AccordionFooter>
    </AccordionItem>
  </Accordion>
</Surface>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; min-inline-size: var(--zero); }
```

## Animations

```text
disclosurePresence
clip
```

## Hooks

```tsx
"use client";
import { useAccordion } from "../../../hooks/disclosure-group/useAccordion";
import type { AccordionProps } from "./Accordion";
export function useAccordionView(input: AccordionProps) {
  const { value, defaultValue, onValueChange, multiple, collapsible, disabled, level, animated = true, children, className, ...props } = input;
  const accordion = useAccordion({ value, defaultValue, onValueChange, multiple, collapsible, disabled });
  return { props, children, className, context: { ...accordion, level, animated } };
}
```

## Content

```tsx
"use client";
import { Children, Fragment, isValidElement } from "react";
import type { ReactNode } from "react";
import type { NativeCollectionRootProps, ComponentChildrenProps, ComponentDisclosureGroupProps, ComponentHeadingLevelProps, ComponentAnimatedProps } from "../../../types";
import { AccordionContext } from "../../../internal/accordion/AccordionContext";
import { AccordionItem } from "../AccordionItem";
import { useAccordionView } from "./useAccordionView";
import styles from "./Accordion.module.css";
export interface AccordionProps extends NativeCollectionRootProps, ComponentChildrenProps, ComponentDisclosureGroupProps, ComponentHeadingLevelProps, ComponentAnimatedProps {}
function validateItems(children: ReactNode, identities = new Set<string>()) {
  Children.forEach(children, (child) => {
    if (child == null || typeof child === "boolean") return;
    if (!isValidElement<{ value: string; children?: ReactNode }>(child)) throw new Error("Invalid Accordion child.");
    if (child.type === Fragment && child.key !== null) { validateItems(child.props.children, identities); return; }
    if (child.type !== AccordionItem) throw new Error("Accordion accepts direct AccordionItem components.");
    if (!child.props.value.trim() || identities.has(child.props.value)) throw new Error("Accordion item values must be nonempty and unique.");
    identities.add(child.props.value);
  });
}
export function Accordion(input: AccordionProps) {
  const { props, children, className, context } = useAccordionView(input);
  validateItems(children);
  return <AccordionContext value={context}><div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-gap="2">{children}</div></AccordionContext>;
}
```

## Tests

- V2 Indexed expansion: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR for native relationships, retained closed content, heading depth, scoped parts and unique Accordion identities. Browser transition/focus coverage remains separate.

- Opening and closing request state once while rejected controlled updates remain authoritative.
- A disabled trigger and caller-prevented activation emit no owned request.
- Closing a panel with focus inside repairs focus before pixels can remain on exit.

## Criteria

- [x] The children contract uses Explicit public parts; keyed fragments allowed; no arbitrary descendant cloning.
- [x] Each Item requires Header and Body; an absent optional Footer creates no empty region.
- [x] The value / defaultValue contract uses undefined / [].
- [x] The multiple / collapsible / disabled contract uses false / true / false.
- [x] The level contract uses Required canonical heading depth.
- [x] Root receives AccordionItem children; every Item owns Header/Body/optional Footer under private item context.
- [x] Every item uses controlled useCollapse for its own panel attributes/focus.
- [x] Root level is required, imported from the shared heading contract.
- [x] Enter/Space are native; optional accordion arrows are excluded.
- [x] No items data prop is exposed; a future convenience descriptor may only map to these same parts.
- [x] Public native attributes go to their semantic owner.
- [x] Validate direct AccordionItem constructors and nonempty unique values through keyed fragments; each Item normalizes its own public parts using collectCompoundParts.
- [x] Forward caller events before owned handlers and respect defaultPrevented.
- [x] No new token family or motion is added.
- [x] State, callbacks, native form values and focus update immediately.
- [x] collapsed ↔ expanded → Authoritative useCollapse/useAccordion state → One root-owned .panel containing Body and Footer → disclosurePresence; --motion-normal / --ease-standard.
- [x] Closing repairs focus and makes the retained panel inert/aria-hidden immediately.
- [x] Body/Footer stay mounted through the accepted transition and share one completion owner.
- [x] Reduced motion, animated=false and zero computed duration settle immediately.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useAccordionView is colocated with Accordion and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] The complete Showcase composition uses text-only and text-with-icon headers with Lorem ipsum and image bodies, independently of the behavior playground.

- [x] V2 **Indexed expansion**: Compose three AccordionItems with public Header/Body/Footer and stable item-1..3 values; actual supported single/multiple expansion and focus repair preserve Children 1..3.
- [x] The Accordion V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAccordionExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

- [x] V2 uses public Surface around the family and padded public Surface content with DS Inline icon/text spacing. Disclosure owners remain structural/behavioral; direct public parts and a single native trigger are preserved, without nested buttons. Where present, action footers retain aligned secondary/primary buttons; minimal copyable code matches the visible composition.

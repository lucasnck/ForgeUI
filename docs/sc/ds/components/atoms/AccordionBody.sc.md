---
title: "AccordionBody"
scope: "Accordion compound part: AccordionBody. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "atoms"
---

# AccordionBody

## Files

```text
features/showcase/examples/AccordionContentExamples.tsx (C)
features/showcase/examples/AccordionExamples.module.css (C)
features/showcase/examples/AccordionBehaviorExamples.tsx (C)
../public/images/showcase/accordion-landscape.svg (C)
design-system/components/atoms/AccordionBody/AccordionBody.tsx (C)
design-system/components/atoms/AccordionBody/AccordionBody.module.css (C)
design-system/components/atoms/AccordionBody/index.ts (C)
design-system/internal/accordion/AccordionItemContext.ts (M)
design-system/index.ts (M)
features/showcase/examples/AccordionBody.example.tsx (M)
features/showcase/examples/useExampleCopy.ts (M)
../scripts/check-overlays.cjs (M)
features/showcase/model/showcase-registry.ts (M)
design-system/components/atoms/AccordionBody/useAccordionBody.ts (C)
features/showcase-v2/components/AccordionBody/definition.ts (C)
features/showcase-v2/components/AccordionBody/AccordionBody.example.tsx (C)
features/showcase-v2/components/AccordionBody/useAccordionBodyExample.ts (C)
features/showcase-v2/components/AccordionBody/usage-code.ts (C)
features/showcase-v2/components/Accordion/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)

## Contract

```tsx
import {
  Surface,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  Text,
} from "@forge-ui/web";

<Surface padding="2" shape="rounded">
  <Accordion
    level={3}
    value={expandedValues}
    onValueChange={onExpandedValuesChange}
  >
    <AccordionItem value="item-1">
      <AccordionHeader hidden>Children 1</AccordionHeader>
      <AccordionBody>
        <Surface elevation="flat" padding="4">
          <Text>Children 1</Text>
        </Surface>
      </AccordionBody>
    </AccordionItem>
  </Accordion>
</Surface>;
```

## Styles

```css
.root { min-inline-size: var(--zero); }
```

## Hooks

```tsx
"use client";
import { useAccordionItemContext } from "../../../internal/accordion/AccordionItemContext";
import type { AccordionBodyProps } from "./AccordionBody";
export function useAccordionBody(input: AccordionBodyProps) {
  useAccordionItemContext();
  const { children, className, ...props } = input;
  
  return { children, className, props,  };
}
```

## Content

```tsx
"use client";
import type { ComponentPropsWithRef } from "react";
import { useAccordionBody } from "./useAccordionBody";
import styles from "./AccordionBody.module.css";
export interface AccordionBodyProps extends ComponentPropsWithRef<"div"> {}
export function AccordionBody(input: AccordionBodyProps) {
  const { children, className, props,  } = useAccordionBody(input);
  return <div {...props}  className={[styles.root, className].filter(Boolean).join(" ")}>{children}</div>;
}
```

## Tests

- V2 AccordionBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- `npm run test:overlays` verifies real React SSR for native relationships, retained closed content, heading depth, scoped parts and unique Accordion identities. Browser checks cover retained input values, nested scopes, close-action focus repair, controlled rejection, caller cancellation, reversal, runtime motion opt-out and teardown.

- Opening and closing request state once while rejected controlled updates remain authoritative.
- A disabled trigger and caller-prevented activation emit no owned request.
- Closing a panel with focus inside repairs focus before pixels can remain on exit.

## Criteria

- [x] Given AccordionBody, Body content stays mounted inside the root-owned hidden panel and is unavailable to focus when the panel is closed.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Body content stays mounted inside the root-owned hidden panel and is unavailable to focus when the panel is closed.
- [x] The outer panel, not Body, owns the hook bodyRef/id/hidden attributes, so the optional Footer shares the same collapsed boundary.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useAccordionBody is colocated with AccordionBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase presents isolated Lorem ipsum content and an image with Lorem ipsum; the required trigger remains hidden and supplies the retained panel name.

- [x] V2 **AccordionBody contextual region**: Render AccordionBody through public Accordion and AccordionItem with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full Accordion composition.
- [x] The AccordionBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAccordionBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Accordion fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

- [x] V2 uses public Surface around the family and padded public Surface content with DS Inline icon/text spacing. Disclosure owners remain structural/behavioral; direct public parts and a single native trigger are preserved, without nested buttons. Where present, action footers retain aligned secondary/primary buttons; minimal copyable code matches the visible composition.

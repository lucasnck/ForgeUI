---
title: "Disclosure"
scope: "Convenience composition of Collapse with a plain label and content. No second disclosure state machine."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Disclosure

## Files

```text
design-system/components/molecules/Disclosure/Disclosure.tsx (C)
design-system/components/molecules/Disclosure/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/Disclosure.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/static-components.contracts.test.ts (M)
../scripts/check-static-components.cjs (M)
features/showcase-v2/components/Disclosure/definition.ts (C)
features/showcase-v2/components/Disclosure/Disclosure.example.tsx (C)
features/showcase-v2/components/Disclosure/useDisclosureExample.ts (C)
features/showcase-v2/components/Disclosure/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Collapse.sc.md](Collapse.sc.md)
- [tech-disclosure-hooks.sc.md](../../hooks/tech-disclosure-hooks.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [CollapseHeader](../atoms/CollapseHeader.sc.md)
- [CollapseBody](../atoms/CollapseBody.sc.md)

## Contract

```tsx
import { Disclosure } from "@forge-ui/web";
<Disclosure label="Details"><p>Details</p></Disclosure>;
```

## Content

```tsx
"use client";

import { Collapse } from "../Collapse";
import type { CollapseProps } from "../Collapse";
import { CollapseHeader } from "../../atoms/CollapseHeader";
import { CollapseBody } from "../../atoms/CollapseBody";

export interface DisclosureProps extends CollapseProps {
  label: string;
}

export function Disclosure({ children, label, ...props }: DisclosureProps) {
  if (!label.trim()) throw new Error("Disclosure requires a nonempty visible label.");
  return (
    <Collapse {...props}>
      <CollapseHeader>{label}</CollapseHeader>
      <CollapseBody>{children}</CollapseBody>
    </Collapse>
  );
}
```

## Tests

- V2 Visible disclosure: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server-render one native inherited Collapse trigger, retained body values, controlled/open defaults, disabled state and animated=false.
- Type-check inherited CollapseProps and required label; reject an empty visible label.
- Verify browser controlled rejection, one callback per toggle, focus repair, reversals and preference changes through the existing Collapse owner.

## Criteria

- [x] Given Disclosure, toggling requests one useCollapse transition and creates no independent state store.
- [x] Given rich regions, consumers use the explicit Collapse public parts.
- [x] The label contract uses Required visible trigger text.
- [x] The children contract uses Body content, not another set of Collapse parts.
- [x] The open state / disabled contract uses Inherited CollapseProps; same defaults.
- [x] Callers needing footer or richer trigger anatomy use Collapse directly.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Visible disclosure**: Use the actual trigger/body contract with Children/Label text; keyboard/pointer opens and closes, supported controlled rejection stays authoritative, and animation opt-out preserves focus behavior.
- [x] The Disclosure V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDisclosureExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

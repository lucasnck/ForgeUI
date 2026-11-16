---
title: "ComboboxBody"
scope: "Combobox compound part: ComboboxBody. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# ComboboxBody

## Files

```text
features/showcase/examples/QueryInputPartExamples.tsx (C)
design-system/components/molecules/ComboboxBody/ComboboxBody.module.css (C)
design-system/components/molecules/ComboboxBody/ComboboxBody.tsx (C)
design-system/components/molecules/ComboboxBody/index.ts (C)
design-system/components/molecules/ComboboxBody/useComboboxBody.ts (C)
design-system/internal/combobox/ComboboxContext.ts (C)
design-system/internal/query-input/QueryInputContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/ComboboxBody.example.tsx (C)
features/showcase/examples/QueryInputExample.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-query-inputs.cjs (C)
features/showcase-v2/components/ComboboxBody/definition.ts (C)
features/showcase-v2/components/ComboboxBody/ComboboxBody.example.tsx (C)
features/showcase-v2/components/ComboboxBody/useComboboxBodyExample.ts (C)
features/showcase-v2/components/ComboboxBody/usage-code.ts (C)
features/showcase-v2/components/Combobox/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Input](../atoms/Input.sc.md)
- [PopupListbox](PopupListbox.sc.md)

## Contract

```tsx
import { Combobox, ComboboxBody } from "@forge-ui/web";
<Combobox options={options} query={query} onQueryChange={setQuery} aria-label="Search" selectedValue={selected} onSelectionChange={setSelected}><ComboboxBody /></Combobox>;
```

## Styles

```css
.root {
  composes: anchor from "../../../styles/popup-components.module.css";
  composes: fullWidth from "../../../styles/full-width-components.module.css";
  inline-size: fit-content;
  min-inline-size: var(--zero);
}

.root[hidden] {
  display: none;
}
```

## Hooks

```tsx
"use client";

import type { ChoiceOption } from "../../../types/selection-navigation";
import { useComboboxContext } from "../../../internal/combobox/ComboboxContext";
import type { ComboboxBodyProps } from "./ComboboxBody";

export function useComboboxBody({ children, className, ...props }: ComboboxBodyProps) {
  const field = useComboboxContext();
  function getOptionLabel(option: ChoiceOption) { return option.label; }
  return { field, children, className, props, getOptionLabel };
}
```

## Content

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { Input } from "../../atoms/Input";
import { PopupListbox } from "../PopupListbox";
import { useComboboxBody } from "./useComboboxBody";
import styles from "./ComboboxBody.module.css";

export interface ComboboxBodyProps extends HTMLAttributes<HTMLDivElement> {}

export function ComboboxBody(input: ComboboxBodyProps) {
  const { field, children, className, props, getOptionLabel } = useComboboxBody(input);
  return <div {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-full-width={(field.inputProps.fullWidth ?? true) || undefined}><Input {...field.inputProps} /><PopupListbox popup={field.popup} items={field.enabledOptions} getOptionLabel={getOptionLabel} listboxLabel={field.listboxLabel} />{children}</div>;
}
```

## Tests

- V2 ComboboxBody contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Scoped parts require their matching owner and preserve native label/body/footer attributes.
- Header label references the actual input id and only a present Footer contributes its owned description id, including server markup.
- Missing optional regions add no empty wrapper; two instances preserve distinct associations.

## Criteria

- [x] Given ComboboxBody, Body composes existing Input and PopupListbox, which renders PopupListboxItem atoms.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Body composes existing Input and PopupListbox, which renders PopupListboxItem atoms.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useComboboxBody is colocated with ComboboxBody and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **ComboboxBody contextual region**: Render ComboboxBody through public Combobox with the minimum valid siblings. Show Text children="Children" or the actual owner-generated options/records, preserving required siblings and owner semantics. Hide/omit optional siblings only where allowed by the owner; link to the full Combobox composition.
- [x] The ComboboxBody V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useComboboxBodyExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the Combobox fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

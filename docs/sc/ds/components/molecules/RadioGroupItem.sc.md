---
title: "RadioGroupItem"
scope: "RadioGroup compound part: RadioGroupItem. No independent family state machine."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# RadioGroupItem

## Files

```text
design-system/components/molecules/RadioGroupItem/index.ts (C)
design-system/components/molecules/RadioGroupItem/RadioGroupItem.module.css (C)
design-system/components/molecules/RadioGroupItem/RadioGroupItem.tsx (C)
design-system/components/molecules/RadioGroupItem/useRadioGroupItem.ts (C)
design-system/internal/radiogroup/RadioGroupContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/RadioGroupItem.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-choice-groups.cjs (C)
features/showcase/examples/ChoiceSelectionExample.tsx (C)
features/showcase-v2/components/RadioGroupItem/definition.ts (C)
features/showcase-v2/components/RadioGroupItem/RadioGroupItem.example.tsx (C)
features/showcase-v2/components/RadioGroupItem/useRadioGroupItemExample.ts (C)
features/showcase-v2/components/RadioGroupItem/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/ChoiceGroup/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [Radio](../atoms/Radio.sc.md)

## Contract

```tsx
import { RadioGroup, ChoiceGroupBody, RadioGroupItem } from "@forge-ui/web";
<RadioGroup name="contact" legend="Contact"><ChoiceGroupBody><RadioGroupItem value="email" label="Email"/></ChoiceGroupBody></RadioGroup>;
```

## Styles

```css
.root {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-inline-size: var(--zero);
  padding: var(--space-2);
  color: var(--color-text-default);
}
```

## Hooks

```tsx
"use client";

import { useId } from "react";
import { useChoiceGroupContext } from "../../../internal/choicegroup/ChoiceGroupContext";
import { useRadioGroupContext } from "../../../internal/radiogroup/RadioGroupContext";
import type { RadioGroupItemProps } from "./RadioGroupItem";

export function useRadioGroupItem({ label, value, disabled, className, ...props }: RadioGroupItemProps) {
  const group = useRadioGroupContext();
  const choice = useChoiceGroupContext();
  const inputId = useId();
  const describedBy = [...new Set([...(choice.describedBy?.split(/\s+/).filter(Boolean) ?? []), ...(props["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? [])])].join(" ") || undefined;
  // The fieldset handles selection after native caller events have bubbled.
  function onChange() {}
  return { group, choice, props, label, value, disabled, inputId, describedBy, className, onChange };
}
```

## Content

```tsx
"use client";

import type { LabelHTMLAttributes } from "react";
import { Radio } from "../../atoms/Radio";
import { useRadioGroupItem } from "./useRadioGroupItem";
import styles from "./RadioGroupItem.module.css";

export interface RadioGroupItemProps extends LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  label: string;
  disabled?: boolean;
}

export function RadioGroupItem(input: RadioGroupItemProps) {
  const { group, choice, props, label, value, disabled, inputId, describedBy, className, onChange } = useRadioGroupItem(input);
  return (
    <label
      {...props}
      htmlFor={inputId}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      <Radio
        id={inputId}
        name={group.name}
        value={value}
        checked={group.isChecked(value)}
        disabled={group.disabled || disabled}
        invalid={group.invalid ?? choice.invalid}
        aria-describedby={describedBy}
        data-choice-group={group.id}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
```

## Tests

- V2 Indexed choice composition: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- The declared native or controlled value channel forwards one user change while prop updates emit no corrective callback.
- Caller-prevented and composing input does not trigger an owned selection/completion action.
- Two mounted instances preserve independent ids, descriptions and native submission values.

## Criteria

- [x] Given RadioGroupItem, Item composes the existing Radio atom with a visible native label; root owns selection and shared name.
- [x] The children contract uses Native React content; only allowed semantic descendants.
- [x] The value contract uses Required stable item identity, unique within its root.
- [x] The Native attrs contract uses Forward to semantic owner; relationship/role attributes supplied by context take precedence.
- [x] The Missing region contract uses Owner omits it; no generated empty wrapper.
- [x] Native radio arrows and single-selection behavior stays in the browser.
- [x] Preserve raw value in FormData.
- [x] Header/Body/Footer naming describes composition responsibility, not an automatic HTML landmark.
- [x] A semantic heading is explicit; do not introduce section landmarks for every item.
- [x] Use existing atom recipes when composing Button, Input, Checkbox, Radio, Heading or Tag.
- [x] No new tokens, size axis or timing constants.
- [x] Native Option and pure layout/text primitives do not receive an invented animation axis.
- [x] useRadioGroupItem is colocated with RadioGroupItem and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] V2 **Indexed choice composition**: Use the real group with required Header/Body, optional Footer and three corresponding items labeled Label 1..3 with stable values; compare supported controlled selection, disabled items and native form values without private context.
- [x] The RadioGroupItem V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useRadioGroupItemExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the ChoiceGroup fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

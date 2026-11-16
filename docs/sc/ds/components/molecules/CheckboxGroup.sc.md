---
title: "CheckboxGroup"
scope: "Aggregate scoped CheckboxGroup parts and consume DS-owned behavior; no duplicate item markup or hook state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# CheckboxGroup


## Files

```text
design-system/components/molecules/CheckboxGroup/CheckboxGroup.module.css (C)
design-system/components/molecules/CheckboxGroup/CheckboxGroup.tsx (C)
design-system/components/molecules/CheckboxGroup/index.ts (C)
design-system/components/molecules/CheckboxGroup/useCheckboxGroup.ts (C)
design-system/internal/checkboxgroup/CheckboxGroupContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/CheckboxGroup.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-choice-groups.cjs (C)
features/showcase/examples/ChoiceSelectionExample.tsx (C)
features/showcase-v2/components/CheckboxGroup/definition.ts (C)
features/showcase-v2/components/CheckboxGroup/CheckboxGroup.example.tsx (C)
features/showcase-v2/components/CheckboxGroup/useCheckboxGroupExample.ts (C)
features/showcase-v2/components/CheckboxGroup/usage-code.ts (C)
features/showcase-v2/model/collection-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/components/ChoiceGroup/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [CheckboxGroupItem.sc.md](CheckboxGroupItem.sc.md)
- [ChoiceGroup.sc.md](ChoiceGroup.sc.md)

## Contract

```tsx
import { CheckboxGroup, ChoiceGroupHeader, ChoiceGroupBody, CheckboxGroupItem, ChoiceGroupFooter } from "@forge-ui/web";
<CheckboxGroup name="contact"><ChoiceGroupHeader>Contact</ChoiceGroupHeader><ChoiceGroupBody><CheckboxGroupItem value="email" label="Email"/><CheckboxGroupItem value="sms" label="SMS"/></ChoiceGroupBody><ChoiceGroupFooter>Choose a channel</ChoiceGroupFooter></CheckboxGroup>;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
}
```

## Hooks

```tsx
"use client";

import { useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { CheckboxGroupProps } from "./CheckboxGroup";

export function useCheckboxGroup({ name, value, defaultValue = [], onValueChange, disabled = false, invalid, children, ref, onChange: callerOnChange, className, ...props }: CheckboxGroupProps) {
  const [localValue, setLocalValue] = useState<readonly string[]>(defaultValue);
  const selected = value ?? localValue;
  const id = useId();
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);
  useImperativeHandle(ref, () => fieldsetRef.current!, []);
  const resetConfig = useRef({ value, defaultValue });
  useLayoutEffect(() => { resetConfig.current = { value, defaultValue }; }, [value, defaultValue]);
  const isChecked = (key: string) => selected.includes(key);
  function change(key: string, checked: boolean) {
    if (disabled || isChecked(key) === checked) return;
    const next = checked ? [...selected, key] : selected.filter(item => item !== key);
    if (value === undefined) setLocalValue(next);
    onValueChange?.(next);
  }
  function onChange(event: ChangeEvent<HTMLFieldSetElement>) {
    callerOnChange?.(event);
    const target = event.target;
    const Input = event.currentTarget.ownerDocument.defaultView?.HTMLInputElement;
    if (event.defaultPrevented || !Input || !(target instanceof Input) || target.dataset.choiceGroup !== id || target.disabled) return;
    change(target.value, target.checked);
  }
  useEffect(() => {
    const fieldset = fieldsetRef.current;
    const form = fieldset?.form;
    if (!fieldset || !form) return;
    let active = true;
    const pending = new Set<ReturnType<typeof setTimeout>>();
    // Native dispatch may checkpoint microtasks before delegated React cancellation.
    const reset = (event: Event) => {
      const timer = setTimeout(() => {
        pending.delete(timer);
        if (!active || event.defaultPrevented) return;
        const current = resetConfig.current;
        const accepted = current.value === undefined ? current.defaultValue : current.value;
        if (current.value === undefined) setLocalValue(current.defaultValue);
        for (const input of fieldset.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) {
          if (input.dataset.choiceGroup === id) input.checked = accepted.includes(input.value);
        }
      }, 0);
      pending.add(timer);
    };
    form.addEventListener("reset", reset);
    return () => {
      active = false;
      for (const timer of pending) clearTimeout(timer);
      pending.clear();
      form.removeEventListener("reset", reset);
    };
  }, [id, props.form]);
  return { context: { id, name, selected, isChecked, disabled, invalid }, children, props, rootRef: fieldsetRef, onChange, className, change };
}
```

## Content

```tsx
"use client";

import type { ComponentSelectionProps } from "../../../types/compound-composition";
import { CheckboxGroupContext } from "../../../internal/checkboxgroup/CheckboxGroupContext";
import { ChoiceGroup } from "../ChoiceGroup";
import type { ChoiceGroupProps } from "../ChoiceGroup";
import { useCheckboxGroup } from "./useCheckboxGroup";
import styles from "./CheckboxGroup.module.css";

export interface CheckboxGroupProps extends ChoiceGroupProps, ComponentSelectionProps<readonly string[]> {
  name: string;
}

export function CheckboxGroup(input: CheckboxGroupProps) {
  const { context, children, props, rootRef, onChange, className } = useCheckboxGroup(input);
  return (
    <CheckboxGroupContext value={context}>
      <ChoiceGroup
        {...props}
        ref={rootRef}
        onChange={onChange}
        disabled={context.disabled}
        invalid={context.invalid}
        className={[styles.root, className].filter(Boolean).join(" ")}
      >
        {children}
      </ChoiceGroup>
    </CheckboxGroupContext>
  );
}
```

```tsx
"use client";

import { createContext, useContext } from "react";

export interface CheckboxGroupContextValue {
  id: string;
  name: string;
  selected: readonly string[];
  isChecked(key: string): boolean;
  disabled: boolean;
  invalid?: boolean;
}
export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);
export function useCheckboxGroupContext() {
  const context = useContext(CheckboxGroupContext);
  if (!context) throw new Error("CheckboxGroupItem requires CheckboxGroup");
  return context;
}
```

## Tests

- V2 Indexed choice composition: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Controlled rejection preserves checked values; uncontrolled changes toggle one key once.
- Disabled items and groups do not request changes.
- Native reset restores uncontrolled defaults without rewriting a controlled value.
- Footer and external descriptions reach each native checkbox through the nearest contexts.

## Criteria

- [x] The children contract uses Explicit public parts; keyed fragments allowed; no arbitrary descendant cloning.
- [x] The Region absence contract uses Omit absent footer/header; no empty wrapper.
- [x] The name contract uses Required shared native form name.
- [x] The value / defaultValue contract uses undefined / [].
- [x] Root exposes CheckboxGroupItem as its canonical choice composition and reuses ChoiceGroupHeader/Body/Footer.
- [x] A checked item appends its unique value; unchecking removes only that value.
- [x] Root owns local-or-controlled value and does not use a menu/tab focus hook.
- [x] Native form reset restores defaultValue only for uncontrolled state without change callbacks.
- [x] Disabled item/root cannot activate.
- [x] Do not infer desired selection from registration effects or emit corrective callbacks on prop changes.
- [x] Public native attributes go to their semantic owner.
- [x] Normalize permitted direct parts/keyed fragments with private collectCompoundParts; it receives actual imported component identities, never displayName strings.
- [x] Forward caller events before owned handlers and respect defaultPrevented.
- [x] No new token family or motion is added.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Indexed choice composition**: Use the real group/Header/Body/Footer and three corresponding items labeled Label 1..3 with stable values; compare supported controlled selection, disabled items and native form values without private context.
- [x] The CheckboxGroup V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useCheckboxGroupExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

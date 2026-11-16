---
title: "Combobox"
scope: "Aggregate scoped Combobox parts and consume DS-owned behavior; no duplicate item markup or hook state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Combobox

## Files

```text
design-system/components/molecules/Combobox/Combobox.module.css (C)
design-system/components/molecules/Combobox/Combobox.tsx (C)
design-system/components/molecules/Combobox/index.ts (C)
design-system/components/molecules/Combobox/useCombobox.ts (C)
design-system/internal/combobox/ComboboxContext.ts (C)
design-system/internal/query-input/QueryInputContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/Combobox.example.tsx (C)
features/showcase/examples/QueryInputExample.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-query-inputs.cjs (C)
features/showcase-v2/components/Combobox/definition.ts (C)
features/showcase-v2/components/Combobox/Combobox.example.tsx (C)
features/showcase-v2/components/Combobox/useComboboxExample.ts (C)
features/showcase-v2/components/Combobox/usage-code.ts (C)
features/showcase-v2/components/Combobox/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-popup-contracts.sc.md](../../hooks/tech-popup-contracts.sc.md)
- [tech-input-specializations.sc.md](../../types/tech-input-specializations.sc.md)
- [PopupListbox.sc.md](PopupListbox.sc.md)
- [ComboboxHeader.sc.md](../atoms/ComboboxHeader.sc.md)
- [ComboboxBody.sc.md](ComboboxBody.sc.md)
- [ComboboxFooter.sc.md](../atoms/ComboboxFooter.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)
- [Popup contracts](../../types/tech-popup-types.sc.md)
- [Selection, panel and open-state contracts](../../types/tech-selection-navigation.sc.md)

## Contract

```tsx
import { Combobox, ComboboxHeader, ComboboxBody, ComboboxFooter } from "@forge-ui/web";
<Combobox options={filteredOptions} query={query} onQueryChange={setQuery} selectedValue={selected} onSelectionChange={setSelected}><ComboboxHeader>City</ComboboxHeader><ComboboxBody /><ComboboxFooter>Choose a city</ComboboxFooter></Combobox>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  min-inline-size: var(--zero);
}
```

## Hooks

```tsx
"use client";

import { useId, useState } from "react";
import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import type { InputProps } from "../../atoms/Input";
import { usePopupListbox } from "../../../hooks/popup/usePopupListbox";
import type { ComboboxProps } from "./Combobox";

export function useCombobox({ options, query, onQueryChange, selectedValue, onSelectionChange, children, id, disabled, readOnly, onFocus, onBlur, onKeyDown, listboxLabel, ...attributes }: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? "combobox-" + generatedId;
  const footerId = inputId + "-footer";
  const [acceptedQuery, setAcceptedQuery] = useState<string | null>(null);
  const [previousQuery, setPreviousQuery] = useState(query);
  if (previousQuery !== query) {
    setPreviousQuery(query);
    if (acceptedQuery !== query) setAcceptedQuery(null);
  }
  const enabledOptions = options.filter(option => !option.disabled);
  const queryKey = query === acceptedQuery ? null : JSON.stringify([query, Boolean(disabled), Boolean(readOnly), enabledOptions.map(option => [option.value, option.label])]);
  const popup = usePopupListbox({ id: inputId, count: disabled || readOnly ? 0 : enabledOptions.length, queryKey, onAcceptOption(index) {
    const option = enabledOptions[index];
    if (!option || disabled || readOnly) return;
    setAcceptedQuery(option.label);
    onQueryChange(option.label);
    onSelectionChange(option.value);
  } });
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (disabled || readOnly) return;
    const next = event.currentTarget.value;
    onQueryChange(next);
    if (!("isComposing" in event.nativeEvent && event.nativeEvent.isComposing) && selectedValue !== null && options.find(option => option.value === selectedValue)?.label !== next) onSelectionChange(null);
  }
  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    onFocus?.(event);
    if (!event.defaultPrevented) popup.onFocus(event);
  }
  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    onBlur?.(event);
    if (!event.defaultPrevented) popup.onBlur(event);
  }
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (!event.defaultPrevented) popup.onKeyDown(event);
  }
  const inputProps: InputProps = { ...attributes, id: inputId, disabled, readOnly, type: "text", value: query, ...popup.comboboxAttributes, "aria-autocomplete": "list", onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown };
  return { children, inputId, footerId, inputProps, enabledOptions, popup, listboxLabel };
}
```

## Content

```tsx
"use client";

import type { NativeQueryInputProps } from "../../../types/input-specializations";
import type { VisualProps, ComponentFullWidthProps, ComponentInvalidProps } from "../../../types/component-capabilities";
import type { ComponentPopupProps } from "../../../types/popup";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import type { ChoiceOption } from "../../../types/selection-navigation";
import type { QueryInputContextValue } from "../../../internal/query-input/QueryInputContext";
import { ComboboxContext } from "../../../internal/combobox/ComboboxContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { ComboboxHeader } from "../../atoms/ComboboxHeader";
import { ComboboxBody } from "../ComboboxBody";
import { ComboboxFooter } from "../../atoms/ComboboxFooter";
import { useCombobox } from "./useCombobox";
import styles from "./Combobox.module.css";

export interface ComboboxProps extends NativeQueryInputProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps, ComponentPopupProps, ComponentChildrenProps {
  options: readonly ChoiceOption[];
  query: string;
  onQueryChange(query: string): void;
  selectedValue: string | null;
  onSelectionChange(value: string | null): void;
}

export function Combobox(input: ComboboxProps) {
  const { children, ...view } = useCombobox(input);
  const parts = collectCompoundParts(children, { header: ComboboxHeader, body: ComboboxBody, footer: ComboboxFooter }, ["body"]);
  const describedBy = [...new Set([...(view.inputProps["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? []), ...(parts.footer ? [view.footerId] : [])])].join(" ") || undefined;
  const context: QueryInputContextValue = { ...view, inputProps: { ...view.inputProps, "aria-describedby": describedBy, "aria-label": parts.header ? undefined : view.inputProps["aria-label"] } };
  return <ComboboxContext value={context}><div className={styles.root} data-gap="2">{parts.header}{parts.body}{parts.footer}</div></ComboboxContext>;
}
```

```tsx
"use client";

import { createContext, useContext } from "react";
import type { QueryInputContextValue } from "../query-input/QueryInputContext";

export const ComboboxContext = createContext<QueryInputContextValue | null>(null);
export function useComboboxContext() {
  const context = useContext(ComboboxContext);
  if (!context) throw new Error("Combobox parts require Combobox");
  return context;
}
```

```tsx
import type { InputProps } from "../../components/atoms/Input";
import type { ChoiceOption } from "../../types/selection-navigation";
import type { ComponentPopupProps, PopupListboxContract } from "../../types/popup";

export interface QueryInputContextValue extends ComponentPopupProps {
  inputId: string;
  footerId: string;
  inputProps: InputProps;
  enabledOptions: readonly ChoiceOption[];
  popup: PopupListboxContract;
}
```

## Tests

- V2 Filtered indexed options: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- A disabled or read-only input offers no selectable options and cannot emit an acceptance callback.
- Accepted option text requests the controlled query once; a rejected parent update remains authoritative.
- Typing away from an accepted query clears local suppression; Combobox requests selection=null through the explicit callback when its current selected label no longer matches.
- Footer presence changes add/remove only its owned description id in the same render while caller ids remain deduplicated.
- Caller-prevented keys and composing keys do not run owned keyboard actions.

## Criteria

- [x] The children contract uses Explicit public parts; keyed fragments allowed; no arbitrary descendant cloning.
- [x] The Region absence contract uses Omit absent footer/header; no empty wrapper.
- [x] The options / query / onQueryChange contract uses Required controlled query; caller-filtered descriptors.
- [x] The selectedValue / onSelectionChange contract uses Required; null clears.
- [x] Root provides Input props to Body and merges only mounted Footer ids with caller descriptions.
- [x] Root owns one usePopupListbox instance; Body uses PopupListbox rendering public PopupListboxItem atoms and never recreates active state.
- [x] Escape preserves text; Enter without active suggestion keeps native submit.
- [x] Keep focus on input with aria-activedescendant and do not use useRovingFocus.
- [x] Composition is ignored during IME.
- [x] Public native attributes go to their semantic owner.
- [x] Normalize permitted direct parts/keyed fragments with private collectCompoundParts; it receives actual imported component identities, never displayName strings.
- [x] Forward caller events before owned handlers and respect defaultPrevented.
- [x] No new token family or motion is added.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useCombobox is colocated with Combobox and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] V2 **Filtered indexed options**: Compose public Header/Body/Footer with five stable Label 1..5 options; caller query filtering produces matching/empty results, and keyboard/pointer acceptance reports the actual query/selection callback.
- [x] The Combobox V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useComboboxExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

- [x] The query property editor reflects accepted native typing/suggestion text, and Clear updates both the live input and property value.

---
title: "ODataFilterGroup"
scope: "Named AND/OR group shell with caller-owned nested conditions and actions"
status: "DONE"
type: "component"
ds-level: "molecules"
---

# ODataFilterGroup

## Files

```text
features/showcase/examples/DataGridRecordsExamples.module.css (C)
../scripts/check-odata-filter.cjs (C)
features/showcase/examples/useODataFilterExample.ts (C)
features/showcase/examples/useDataGridRecordsCopy.ts (C)
design-system/components/molecules/ODataFilterGroup/ODataFilterGroup.tsx (C)
design-system/components/molecules/ODataFilterGroup/useODataFilterGroup.ts (C)
design-system/components/molecules/ODataFilterGroup/ODataFilterGroup.module.css (C)
design-system/components/molecules/ODataFilterGroup/index.ts (C)
features/showcase/examples/ODataFilterGroup.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/index.ts (M)
features/showcase-v2/components/ODataFilterGroup/definition.ts (C)
features/showcase-v2/components/ODataFilterGroup/ODataFilterGroup.example.tsx (C)
features/showcase-v2/components/ODataFilterGroup/useODataFilterGroupExample.ts (C)
features/showcase-v2/components/ODataFilterGroup/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Button](../atoms/Button.sc.md)

- [Select](../atoms/Select.sc.md)

- [Filter contracts](../../types/tech-odata-filter-contracts.sc.md)

## Contract

```tsx
import { ODataFilterGroup } from "@forge-ui/web";
<ODataFilterGroup label={groupLabel} value={operator} onValueChange={setOperator} labels={labels}>{conditions}</ODataFilterGroup>;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; --stack-gap: var(--space-2); min-inline-size: var(--zero); }
.controls { display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: start; min-inline-size: var(--zero); }
.field { display: flex; flex-direction: column; gap: var(--space-1); min-inline-size: var(--zero); flex: auto; flex-basis: var(--length-20); }
.root { margin: var(--zero); padding: var(--space-2); border: var(--border-width-thin) var(--border-style-default) var(--color-border-subtle); border-radius: var(--radius-sm); }
```

## Hooks

```tsx
"use client";
import { useId,type ChangeEvent } from "react";
import type { ODataFilterGroupProps } from "./ODataFilterGroup";
export function useODataFilterGroup({value,onValueChange,labels,label,onAddCondition,onAddGroup,onRemove,children,disabled,className,...props}:ODataFilterGroupProps) {
 const id=useId(); if(!label.trim())throw new Error("Filter groups require distinct accessible names.");
 function change(event:ChangeEvent<HTMLSelectElement>){const next=event.currentTarget.value;if(!disabled&&(next==="and"||next==="or"))onValueChange(next);}
 function addCondition(){if(!disabled)onAddCondition?.();}function addGroup(){if(!disabled)onAddGroup?.();}function remove(){if(!disabled)onRemove?.();}
 return {id,value,labels,label,onAddCondition,onAddGroup,onRemove,children,disabled,className,props,change,addCondition,addGroup,remove};
}
```

## Content

```tsx
"use client";
import type { FieldsetHTMLAttributes } from "react";
import type { ODataFilterConjunction,ODataFilterLabels } from "../../../types/odata-filter";
import { Select } from "../../atoms/Select";
import { Button } from "../../atoms/Button";
import { useODataFilterGroup } from "./useODataFilterGroup";
import styles from "./ODataFilterGroup.module.css";
export interface ODataFilterGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
 value:ODataFilterConjunction;onValueChange(value:ODataFilterConjunction):void;labels:ODataFilterLabels;label:string;onAddCondition?():void;onAddGroup?():void;onRemove?():void;
}
export function ODataFilterGroup(input:ODataFilterGroupProps) {
 const view=useODataFilterGroup(input);
 return <fieldset {...view.props} disabled={view.disabled} className={[styles.root,view.className].filter(Boolean).join(" ")}><legend>{view.label}</legend><div className={styles.field}><label htmlFor={view.id}>{view.labels.operator}</label><Select id={view.id} value={view.value} onChange={view.change} disabled={view.disabled}><option value="and">{view.labels.and}</option><option value="or">{view.labels.or}</option></Select></div>{view.children}<div className={styles.controls}>{view.onAddCondition&&<Button tone="neutral" appearance="ghost" onClick={view.addCondition} disabled={view.disabled}>{view.labels.addCondition}</Button>}{view.onAddGroup&&<Button tone="neutral" appearance="ghost" onClick={view.addGroup} disabled={view.disabled}>{view.labels.addGroup}</Button>}{view.onRemove&&<Button appearance="ghost" tone="neutral" onClick={view.remove} disabled={view.disabled} aria-label={`${view.labels.remove}: ${view.label}`}>{view.labels.remove}</Button>}</div></fieldset>;
}
```

## Tests

- V2 Typed filter editing: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] A labelled native group composes caller-owned conditions and nested groups with controlled AND/OR selection.
- [x] Adding/removing conditions and groups uses explicit callbacks; no product or permission logic belongs here.
- [x] Nested groups have distinct accessible names and controlled rejection preserves the displayed conjunction.
- [x] Showcase illustrates an AND group and a nested OR group with keyboard-operable localized actions.
- [x] The group does not serialize or fetch; tests verify one callback per action and independent nested ownership.

- [x] V2 **Typed filter editing**: Use a real local field schema and valid condition/group/value objects with existing public controls; field/operator/value changes report the accepted expression, and only free-text labels follow prop-name fixtures.
- [x] The ODataFilterGroup V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useODataFilterGroupExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

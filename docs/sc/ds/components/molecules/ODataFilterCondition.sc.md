---
title: "ODataFilterCondition"
scope: "Condition row with field/operator selection and an appropriate value editor"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# ODataFilterCondition

## Files

```text
features/showcase/examples/DataGridRecordsExamples.module.css (M)
../scripts/check-odata-filter.cjs (M)
features/showcase/examples/useODataFilterExample.ts (M)
features/showcase/examples/useDataGridRecordsCopy.ts (M)
design-system/components/molecules/ODataFilterCondition/ODataFilterCondition.tsx (M)
design-system/components/molecules/ODataFilterCondition/useODataFilterCondition.ts (M)
design-system/components/molecules/ODataFilterCondition/ODataFilterCondition.module.css (M)
design-system/components/molecules/ODataFilterCondition/index.ts (M)
features/showcase/examples/ODataFilterCondition.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/index.ts (M)
features/showcase-v2/components/ODataFilterCondition/definition.ts (M)
features/showcase-v2/components/ODataFilterCondition/ODataFilterCondition.example.tsx (M)
features/showcase-v2/components/ODataFilterCondition/useODataFilterConditionExample.ts (M)
features/showcase-v2/components/ODataFilterCondition/useODataFilterConditionExactExample.ts (C)
features/showcase-v2/components/ODataFilterCondition/usage-code.ts (M)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Filter serialization](../../helpers/tech-odata-filter.sc.md)

- [Button](../atoms/Button.sc.md)

- [Select](../atoms/Select.sc.md)

- [ODataFilterValue](../molecules/ODataFilterValue.sc.md)

- [Filter contracts](../../types/tech-odata-filter-contracts.sc.md)

## Contract

```tsx
import { ODataFilterCondition } from "@forge-ui/web";
<ODataFilterCondition fields={fields} value={condition} onValueChange={setCondition} labels={labels} />;
```

## Styles

```css
.root { composes: stack from "../../../styles/layout-components.module.css"; --stack-gap: var(--space-2); min-inline-size: var(--zero); }
.controls { display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: start; min-inline-size: var(--zero); }
.field { display: flex; flex-direction: column; gap: var(--space-1); min-inline-size: var(--zero); flex: auto; flex-basis: var(--length-20); }
```

## Hooks

```tsx
"use client";
import { useId,type ChangeEvent } from "react";
import { createODataFilterCondition,getODataFilterOperators,replaceODataFilterConditionValue } from "../../../helpers/odata-filter";
import type { ODataFilterOperator,ODataFilterValueData } from "../../../types/odata-filter";
import type { ODataFilterConditionProps } from "./ODataFilterCondition";
export function useODataFilterCondition(input:ODataFilterConditionProps) {
 const {fields,value,onValueChange,labels,simple=false,disabled=false,onRemove,className,...props}=input;
 const id=useId(); const field=fields.find(field=>field.id===value.fieldId);
 if(!field||field.kind!==value.fieldKind)throw new Error("OData condition requires a matching schema field.");
 const operators=getODataFilterOperators(field); if(!operators.includes(value.operator))throw new Error("Unsupported condition operator.");
 const blocked=disabled||field.disabled;
 function changeField(event:ChangeEvent<HTMLSelectElement>) { const next=fields.find(field=>field.id===event.currentTarget.value);if(!blocked&&next&&!next.disabled)onValueChange(createODataFilterCondition(next,value.id)); }
 function changeOperator(event:ChangeEvent<HTMLSelectElement>) { const operator=event.currentTarget.value as ODataFilterOperator;if(!blocked&&operators.includes(operator))onValueChange(createODataFilterCondition(field!,value.id,operator)); }
 function changeValue(next:ODataFilterValueData) {if(!blocked)onValueChange(replaceODataFilterConditionValue(value,next));}
 function remove(){if(!blocked)onRemove?.();}
 return {fields,value,labels,simple,disabled:blocked,onRemove,className,props,id,field,operators,changeField,changeOperator,changeValue,remove};
}
```

## Content

```tsx
"use client";
import type { HTMLAttributes } from "react";
import type { ODataFilterConditionData,ODataFilterField,ODataFilterLabels } from "../../../types/odata-filter";
import { Select } from "../../atoms/Select";
import { Button } from "../../atoms/Button";
import { ODataFilterValue } from "../ODataFilterValue";
import { useODataFilterCondition } from "./useODataFilterCondition";
import styles from "./ODataFilterCondition.module.css";
export interface ODataFilterConditionProps extends HTMLAttributes<HTMLDivElement> {
 fields:readonly ODataFilterField[]; value:ODataFilterConditionData; onValueChange(value:ODataFilterConditionData):void; labels:ODataFilterLabels; simple?:boolean; disabled?:boolean; onRemove?():void;
}
export function ODataFilterCondition(input:ODataFilterConditionProps) {
 const view=useODataFilterCondition(input);
 return <div {...view.props} className={[styles.root,view.className].filter(Boolean).join(" ")}>{!view.simple&&<div className={styles.controls}><div className={styles.field}><label htmlFor={view.id+"-field"}>{view.labels.field}</label><Select id={view.id+"-field"} value={view.field.id} onChange={view.changeField} disabled={view.disabled} fullWidth>{view.fields.map(field=><option key={field.id} value={field.id} disabled={field.disabled}>{field.label}</option>)}</Select></div><div className={styles.field}><label htmlFor={view.id+"-operator"}>{view.labels.operator}</label><Select id={view.id+"-operator"} value={view.value.operator} onChange={view.changeOperator} disabled={view.disabled} fullWidth>{view.operators.map(operator=><option key={operator} value={operator}>{view.labels.operatorLabels[operator]}</option>)}</Select></div></div>}<ODataFilterValue field={view.field} value={view.value.value} operator={view.value.operator} onValueChange={view.changeValue} labels={view.labels} label={view.field.label} disabled={view.disabled}/>{!view.simple&&view.onRemove&&<Button appearance="ghost" tone="neutral" onClick={view.remove} disabled={view.disabled} aria-label={`${view.labels.remove}: ${view.field.label}`}>{view.labels.remove}</Button>}</div>;
}
```

## Tests

- V2 Typed filter editing: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Render the delivered guid field using the existing native text Input and eq/ne operator selector, with spellcheck/autocapitalization disabled. Keep user input unchanged while editing; canonical GUID case and validity belong to Apply/serialization. No mandatory relation lookup/provider dependency is introduced into the DS condition.
- [ ] Render the proposed decimal field with existing text Input plus inputMode=decimal, including two controls for between. Preserve exact string values, sign and fractional zeros; never use valueAsNumber, Number, parseFloat or the existing number-kind conversion handler. Locale grouping/decimal punctuation is not accepted as an invariant OData literal; supply translated hint/error text through the caller labels/field metadata.
- [x] Coordinate changes in the existing colocated useODataFilterCondition hook; maintain controlled updates, field/operator reset policy, stable IDs, connected labels and independent invalid-range feedback. Changing field kind cannot reuse an incompatible previous boolean/number value as a valid GUID/decimal.
- [ ] Preserve the implemented condition API and accepted criteria below. Keep PENDING for this new typed renderer increment; extend owning examples/consumer fixtures, targeted keyboard/value/error tests and scoped Prettier/ESLint/type checks without adding packages or a duplicate specialized numeric input.

- [x] A condition composes field selection, compatible operator selection and ODataFilterValue; simple presentation hides page-fixed selectors.
- [x] Changing a field/operator requests one coherent replacement, clearing incompatible values.
- [x] Ranges show both endpoints; incomplete conditions remain distinguishable and do not silently apply.
- [x] Caller-owned values remain authoritative after rejected updates; removal is an explicit callback.
- [x] Showcase illustrates text contains, boolean equality, range and choice rows without repeating the complete filter.
- [x] Field, operator, value and remove controls receive accessible localized names; callbacks and controlled rejection are tested.

- [x] V2 **Typed filter editing**: Use a real local field schema and valid condition/group/value objects with existing public controls; field/operator/value changes report the accepted expression, and only free-text labels follow prop-name fixtures.
- [x] The ODataFilterCondition V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useODataFilterConditionExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

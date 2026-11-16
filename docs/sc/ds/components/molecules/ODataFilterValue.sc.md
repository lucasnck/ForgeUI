---
title: "ODataFilterValue"
scope: "Field-configured text, numeric, date, boolean, single-choice and multiple-choice editors"
status: "PENDING"
type: "component"
ds-level: "molecules"
---

# ODataFilterValue

## Files

```text
features/showcase/examples/DataGridRecordsExamples.module.css (M)
../scripts/check-odata-filter.cjs (M)
features/showcase/examples/useODataFilterExample.ts (M)
features/showcase/examples/useDataGridRecordsCopy.ts (M)
design-system/components/molecules/ODataFilterValue/ODataFilterValue.tsx (M)
design-system/components/molecules/ODataFilterValue/useODataFilterValue.ts (M)
design-system/components/molecules/ODataFilterValue/ODataFilterValue.module.css (M)
design-system/components/molecules/ODataFilterValue/index.ts (M)
features/showcase/examples/ODataFilterValue.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
design-system/index.ts (M)
features/showcase-v2/components/ODataFilterValue/definition.ts (M)
features/showcase-v2/components/ODataFilterValue/ODataFilterValue.example.tsx (M)
features/showcase-v2/components/ODataFilterValue/useODataFilterValueExample.ts (M)
features/showcase-v2/components/ODataFilterValue/useExactFilterValuePreview.ts (C)
features/showcase-v2/components/ODataFilterValue/usage-code.ts (M)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Mask helpers](../../helpers/tech-mask-helpers.sc.md)

- [ComboboxBody](../molecules/ComboboxBody.sc.md)

- [Combobox](../molecules/Combobox.sc.md)

- [ChoiceGroupBody](../atoms/ChoiceGroupBody.sc.md)

- [CheckboxGroupItem](../molecules/CheckboxGroupItem.sc.md)

- [CheckboxGroup](../molecules/CheckboxGroup.sc.md)

- [RadioGroupItem](../molecules/RadioGroupItem.sc.md)

- [RadioGroup](../molecules/RadioGroup.sc.md)

- [SearchInput](../molecules/SearchInput.sc.md)

- [DateTimeInput](../molecules/DateTimeInput.sc.md)

- [TimeInput](../molecules/TimeInput.sc.md)

- [DateInput](../molecules/DateInput.sc.md)

- [NumberInput](../molecules/NumberInput.sc.md)

- [Select](../atoms/Select.sc.md)

- [Input](../atoms/Input.sc.md)

- [Filter contracts](../../types/tech-odata-filter-contracts.sc.md)

## Contract

```tsx
import { ODataFilterValue } from "@forge-ui/web";
<ODataFilterValue field={field} value={value} onValueChange={setValue} label={label} labels={labels} />;
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
import { useId, useState, type ChangeEvent } from "react";
import type { ODataFilterValueProps } from "./ODataFilterValue";
import type { ODataFilterValueData } from "../../../types/odata-filter";
export function useODataFilterValue(props: ODataFilterValueProps) {
 const id = useId(); const [query, setQuery] = useState<string | null>(null);
 const change = (value: ODataFilterValueData) => { if (!props.disabled && !props.field.disabled) props.onValueChange(value); };
 const parse = (raw: string) => raw === "" ? null : props.field.kind === "number" ? Number(raw) : raw;
 const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => change(parse(event.target.value));
 const onMinimumChange = (event: ChangeEvent<HTMLInputElement>) => change([parse(event.target.value), Array.isArray(props.value) ? props.value[1] as string | number | null : null]);
 const onMaximumChange = (event: ChangeEvent<HTMLInputElement>) => change([Array.isArray(props.value) ? props.value[0] as string | number | null : null, parse(event.target.value)]);
 const onBooleanChange = (value: string) => change(value === "all" ? null : value === "true");
 const onChoiceChange = (value: string) => change(value === "" ? null : value);
 const onSelectionChange = (value: string | null) => { change(value); if(value !== null) setQuery(null); };
 function dateValue(raw:string) { return raw === "" ? null : raw.slice(0,4)+(raw.length>4?"-"+raw.slice(4,6):"")+(raw.length>6?"-"+raw.slice(6,8):""); }
 function onDateChange(raw:string){change(dateValue(raw));}
 function onDateMinimumChange(raw:string){change([dateValue(raw),Array.isArray(props.value)?props.value[1] as string|null:null]);}
 function onDateMaximumChange(raw:string){change([Array.isArray(props.value)?props.value[0] as string|null:null,dateValue(raw)]);}
 return { onDateChange,onDateMinimumChange,onDateMaximumChange,id, query, setQuery, onChange, onMinimumChange, onMaximumChange, onBooleanChange, onChoiceChange, onSelectionChange, onMultipleChange: change, disabled: props.disabled || props.field.disabled };
}
```

## Content

### Exact string editor increment

```tsx
const exactString = field.kind === "guid" || field.kind === "decimal";
const exactProps = exactString
  ? { inputMode: field.kind === "decimal" ? "decimal" as const : "text" as const, autoCapitalize: "none", spellCheck: false }
  : {};

<Input {...control} {...exactProps} id={view.id} value={typeof value === "string" ? value : ""} onChange={view.onChange} />;
```

```tsx
"use client";
import type { ODataFilterField, ODataFilterValueData, ODataFilterLabels, ODataFilterOperator } from "../../../types/odata-filter";
import { MASK_DATE_YMD } from "../../../helpers/mask";
import { Input } from "../../atoms/Input";
import { Select } from "../../atoms/Select";
import { NumberInput } from "../NumberInput";
import { DateInput } from "../DateInput";
import { TimeInput } from "../TimeInput";
import { DateTimeInput } from "../DateTimeInput";
import { SearchInput } from "../SearchInput";
import { RadioGroup } from "../RadioGroup";
import { RadioGroupItem } from "../RadioGroupItem";
import { CheckboxGroup } from "../CheckboxGroup";
import { CheckboxGroupItem } from "../CheckboxGroupItem";
import { ChoiceGroupBody } from "../../atoms/ChoiceGroupBody";
import { Combobox } from "../Combobox";
import { ComboboxBody } from "../ComboboxBody";
import { useODataFilterValue } from "./useODataFilterValue";
import styles from "./ODataFilterValue.module.css";
import type { ComponentInvalidProps } from "../../../types/component-capabilities";
export interface ODataFilterValueProps extends ComponentInvalidProps { field: ODataFilterField; value: ODataFilterValueData; onValueChange(value: ODataFilterValueData): void; label: string; labels: ODataFilterLabels; operator?: ODataFilterOperator; disabled?: boolean }
export function ODataFilterValue(props: ODataFilterValueProps) {
 const view = useODataFilterValue(props); const {field,value,label,labels,operator,invalid} = props;
 const control = {disabled:view.disabled,invalid,placeholder:field.placeholder,fullWidth:true};
 if (field.kind === "boolean") return <RadioGroup name={view.id} legend={label} value={value === null ? "all" : String(value)} onValueChange={view.onBooleanChange} disabled={view.disabled}><ChoiceGroupBody>{[["all",labels.all],["true",labels.yes],["false",labels.no]].map(([key,text]) => <RadioGroupItem key={key} value={key} label={text}/>)}</ChoiceGroupBody></RadioGroup>;
 if (field.kind === "multiChoice") return <CheckboxGroup name={view.id} legend={label} value={Array.isArray(value) ? value as readonly string[] : []} onValueChange={view.onMultipleChange} disabled={view.disabled}><ChoiceGroupBody>{field.options.map(option => <CheckboxGroupItem key={option.value} {...option}/>)}</ChoiceGroupBody></CheckboxGroup>;
 if (field.kind === "choice" && field.editor === "radio") return <RadioGroup name={view.id} legend={label} value={typeof value === "string" ? value : ""} onValueChange={view.onChoiceChange} disabled={view.disabled}><ChoiceGroupBody><RadioGroupItem value="" label={labels.all}/>{field.options.map(option => <RadioGroupItem key={option.value} {...option}/>)}</ChoiceGroupBody></RadioGroup>;
 if (field.kind === "choice" && field.editor === "combobox") return <div className={styles.field}><label htmlFor={view.id}>{label}</label><Combobox {...control} id={view.id} aria-label={label} listboxLabel={label} options={field.options.filter(option=>!view.query || option.label.toLocaleLowerCase().includes(view.query.toLocaleLowerCase()))} query={view.query ?? (typeof value === "string" ? field.options.find(option => option.value === value)?.label ?? "" : "")} onQueryChange={view.setQuery} selectedValue={typeof value === "string" ? value : null} onSelectionChange={view.onSelectionChange}><ComboboxBody/></Combobox></div>;
 if (field.kind === "choice") return <div className={styles.field}><label htmlFor={view.id}>{label}</label><Select {...control} id={view.id} value={typeof value === "string" ? value : ""} onChange={view.onChange}><option value="">{labels.all}</option>{field.options.map(option => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}</Select></div>;
 if(field.kind === "date") {
  if(operator === "between")return <div className={styles.controls}><div className={styles.field}><label htmlFor={view.id+"-min"}>{label} — {labels.minimum}</label><DateInput {...control} id={view.id+"-min"} mask={MASK_DATE_YMD} placeholder="YYYY-MM-DD" value={Array.isArray(value)?String(value[0]??"").replaceAll("-",""):""} onValueChange={view.onDateMinimumChange}/></div><div className={styles.field}><label htmlFor={view.id+"-max"}>{label} — {labels.maximum}</label><DateInput {...control} id={view.id+"-max"} mask={MASK_DATE_YMD} placeholder="YYYY-MM-DD" value={Array.isArray(value)?String(value[1]??"").replaceAll("-",""):""} onValueChange={view.onDateMaximumChange}/></div></div>;
  return <div className={styles.field}><label htmlFor={view.id}>{label}</label><DateInput {...control} id={view.id} mask={MASK_DATE_YMD} placeholder="YYYY-MM-DD" value={typeof value==="string"?value.replaceAll("-",""):""} onValueChange={view.onDateChange}/></div>;
 }
 const Control = field.kind === "number" ? NumberInput : field.kind === "time" ? TimeInput : field.kind === "datetime" ? DateTimeInput : field.kind === "text" && field.editor === "search" ? SearchInput : Input;
 if (operator === "between") return <div className={styles.controls}><div className={styles.field}><label htmlFor={view.id + "-min"}>{label} — {labels.minimum}</label><Control {...control} id={view.id + "-min"} value={Array.isArray(value) ? value[0] ?? "" : ""} onChange={view.onMinimumChange}/></div><div className={styles.field}><label htmlFor={view.id + "-max"}>{label} — {labels.maximum}</label><Control {...control} id={view.id + "-max"} value={Array.isArray(value) ? value[1] ?? "" : ""} onChange={view.onMaximumChange}/></div></div>;
 return <div className={styles.field}><label htmlFor={view.id}>{label}</label><Control {...control} id={view.id} value={typeof value === "string" || typeof value === "number" ? value : ""} onChange={view.onChange}/></div>;
}
```

## Tests

- GUID incomplete input and decimal strings beyond Number precision remain exactly controlled through scalar/range edits, rejected callbacks, clear and disabled state. Apply validation belongs to the serializer, not numeric input coercion.

- V2 Typed filter editing: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] This is the existing value-renderer owner for the proposed GUID/decimal increment. Use public Input with text value and inputMode as shown; preserve the original Props and controlled parse branch that converts only kind=number. Do not move Number conversion to all numeric-looking fields or add a relation/network dependency.
- [x] Guid uses one text control; decimal uses one text control or separately labelled minimum/maximum Input controls for between. Keep signs, fractional zeros, overprecision/incomplete input and null absence distinct until Apply validates it. No locale reformatting, exponent coercion or browser numeric stepping changes an exact value.
- [ ] Retain generated control IDs, labels, disabled/invalid state and rejected controlled updates. Field/operator changes reset incompatible values only through the condition owner. Add GUID/high-precision decimal fixtures to existing owner examples and verify exact value callbacks, accessible range labels, clear/reset and serializer rejection.
- [ ] Preserve all checked existing controls/examples below and keep the new increment PENDING. Format/lint only touched source, pass DS contract/value/serializer tests and typecheck, and update example metadata only for implemented kinds. No new library or catalog availability is authorized by this documentation change.

- [x] Both modes reuse the same schema-driven editor and existing public DS controls.
- [x] Text uses Input/SearchInput; numbers use NumberInput; dates use DateInput/DateTimeInput; intervals expose two separately labelled endpoints.
- [x] Boolean radios distinguish all/unfiltered, true and false with caller-provided labels.
- [x] Single choice supports configured RadioGroup, Select or Combobox; multiple choice uses CheckboxGroup with caller-owned options.
- [x] Searchable choices receive options from the caller and perform no remote request.
- [x] Values remain controlled, including rejected updates, false and zero; incompatible hidden values are cleared through explicit change requests.
- [x] Showcase illustrates every editor independently in empty, populated and disabled states, with labels and keyboard interaction verified.

- [x] V2 **Typed filter editing**: Use a real local field schema and valid condition/group/value objects with existing public controls; field/operator/value changes report the accepted expression, and only free-text labels follow prop-name fixtures.
- [x] The ODataFilterValue V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useODataFilterValueExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Collection strings use original one-based prop-name text (Label 1, Title 1, Children 1), stable keys and deterministic depth-first indices for nesting. Sorting/filtering/paging preserve identity; caller-owned fixture logic stays outside DS source.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

- [x] Single value editors keep intrinsic block height inside vertical condition stacks; the token-backed flex basis applies only to direct children of the wrapping interval controls row, preserving responsive side-by-side range fields without vertical blank space in sidebar/Popover consumers.

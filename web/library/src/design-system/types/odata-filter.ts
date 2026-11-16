export type ODataFilterConjunction = "and" | "or";
export type ODataFilterMode = "simple" | "advanced";
export type ODataFilterActionsLayout = "inline" | "stack";
export type ODataFilterOperator =
  | "eq"
  | "ne"
  | "contains"
  | "startswith"
  | "endswith"
  | "gt"
  | "ge"
  | "lt"
  | "le"
  | "between"
  | "in";
export type ODataFilterScalar = string | number | boolean;
export type ODataFilterValueData =
  | ODataFilterScalar
  | null
  | readonly string[]
  | readonly [string | number | null, string | number | null];
export interface ODataFilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}
interface FieldBase {
  id: string;
  path: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}
interface FieldOperators<T extends ODataFilterOperator> {
  operators?: readonly T[];
  defaultOperator?: T;
}
export interface ODataFilterTextField
  extends FieldBase, FieldOperators<"eq" | "ne" | "contains" | "startswith" | "endswith"> {
  kind: "text";
  editor?: "input" | "search";
}
export interface ODataFilterNumberField
  extends FieldBase, FieldOperators<"eq" | "ne" | "gt" | "ge" | "lt" | "le" | "between"> {
  kind: "number";
}
export type ODataFilterGuidValue = string;
export type ODataFilterDecimalValue = string;
export interface ODataFilterGuidField extends FieldBase, FieldOperators<"eq" | "ne"> {
  kind: "guid";
}
export interface ODataFilterDecimalField
  extends FieldBase, FieldOperators<"eq" | "ne" | "gt" | "ge" | "lt" | "le" | "between"> {
  kind: "decimal";
  precision: number;
  scale: number;
}
export interface ODataFilterTemporalField
  extends FieldBase, FieldOperators<"eq" | "ne" | "gt" | "ge" | "lt" | "le" | "between"> {
  kind: "date" | "time";
}
export interface ODataFilterDateTimeField
  extends FieldBase, FieldOperators<"eq" | "ne" | "gt" | "ge" | "lt" | "le" | "between"> {
  kind: "datetime";
  offset: string;
}
export interface ODataFilterBooleanField extends FieldBase, FieldOperators<"eq" | "ne"> {
  kind: "boolean";
}
export interface ODataFilterChoiceField extends FieldBase, FieldOperators<"eq" | "ne"> {
  kind: "choice";
  editor?: "radio" | "select" | "combobox";
  options: readonly ODataFilterOption[];
}
export interface ODataFilterMultiChoiceField extends FieldBase, FieldOperators<"in"> {
  kind: "multiChoice";
  options: readonly ODataFilterOption[];
}
export type ODataFilterField =
  | ODataFilterTextField
  | ODataFilterNumberField
  | ODataFilterGuidField
  | ODataFilterDecimalField
  | ODataFilterTemporalField
  | ODataFilterDateTimeField
  | ODataFilterBooleanField
  | ODataFilterChoiceField
  | ODataFilterMultiChoiceField;
interface ConditionBase {
  kind: "condition";
  id: string;
  fieldId: string;
}
type TextCondition = ConditionBase & {
  fieldKind: "text";
  operator: "eq" | "ne" | "contains" | "startswith" | "endswith";
  value: string | null;
};
type BooleanCondition = ConditionBase & {
  fieldKind: "boolean";
  operator: "eq" | "ne";
  value: boolean | null;
};
type GuidCondition = ConditionBase & {
  fieldKind: "guid";
  operator: "eq" | "ne";
  value: ODataFilterGuidValue | null;
};
type ChoiceCondition = ConditionBase & {
  fieldKind: "choice";
  operator: "eq" | "ne";
  value: string | null;
};
type MultiChoiceCondition = ConditionBase & {
  fieldKind: "multiChoice";
  operator: "in";
  value: readonly string[] | null;
};
type ComparableCondition<
  K extends "number" | "decimal" | "date" | "time" | "datetime",
  V,
> = ConditionBase & {
  fieldKind: K;
} & (
    | { operator: "eq" | "ne" | "gt" | "ge" | "lt" | "le"; value: V | null }
    | { operator: "between"; value: readonly [V | null, V | null] | null }
  );
export type ODataFilterConditionData =
  | TextCondition
  | GuidCondition
  | BooleanCondition
  | ChoiceCondition
  | MultiChoiceCondition
  | ComparableCondition<"number", number>
  | ComparableCondition<"decimal", ODataFilterDecimalValue>
  | ComparableCondition<"date" | "time" | "datetime", string>;
export interface ODataFilterGroupData {
  kind: "group";
  id: string;
  operator: ODataFilterConjunction;
  children: readonly ODataFilterExpression[];
}
export type ODataFilterExpression = ODataFilterConditionData | ODataFilterGroupData;
export interface ODataFilterLabels {
  field: string;
  operator: string;
  value: string;
  remove: string;
  addCondition: string;
  addGroup: string;
  group: string;
  and: string;
  or: string;
  apply: string;
  clear: string;
  cancel: string;
  all: string;
  yes: string;
  no: string;
  minimum: string;
  maximum: string;
  invalid: string;
  unsupported: string;
  operatorLabels: Readonly<Record<ODataFilterOperator, string>>;
}

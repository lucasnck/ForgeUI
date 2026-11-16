import type {
  ODataFilterConditionData,
  ODataFilterField,
  ODataFilterExpression,
} from "./odata-filter";
const field: ODataFilterField = {
  id: "active",
  path: "Active",
  label: "Active",
  kind: "boolean",
  operators: ["eq", "ne"],
};
const condition: ODataFilterConditionData = {
  kind: "condition",
  id: "x",
  fieldId: "active",
  fieldKind: "boolean",
  operator: "eq",
  value: false,
};
const group: ODataFilterExpression = {
  kind: "group",
  id: "root",
  operator: "and",
  children: [condition, { kind: "group", id: "or", operator: "or", children: [] }],
};
// @ts-expect-error Boolean operators do not accept contains.
const wrongField: ODataFilterField = {
  id: "active",
  path: "Active",
  label: "Active",
  kind: "boolean",
  operators: ["contains"],
};
// @ts-expect-error Boolean expressions require boolean values.
const wrongValue: ODataFilterConditionData = {
  kind: "condition",
  id: "x",
  fieldId: "active",
  fieldKind: "boolean",
  operator: "eq",
  value: "false",
};

const wrongRange: ODataFilterConditionData = {
  kind: "condition",
  id: "x",
  fieldId: "id",
  fieldKind: "number",
  operator: "between",
  // @ts-expect-error Numeric range endpoints do not accept date strings.
  value: ["2026-10-01", 5],
};
// @ts-expect-error Multiple choices use in.
const wrongChoice: ODataFilterConditionData = {
  kind: "condition",
  id: "x",
  fieldId: "choices",
  fieldKind: "multiChoice",
  operator: "eq",
  value: ["a"],
};
void [field, condition, group, wrongField, wrongValue, wrongRange, wrongChoice];

const guidField: ODataFilterField = {
  id: "owner",
  path: "ownerGuid",
  label: "Owner",
  kind: "guid",
  operators: ["eq", "ne"],
};
const decimalField: ODataFilterField = {
  id: "amount",
  path: "amount",
  label: "Amount",
  kind: "decimal",
  precision: 28,
  scale: 8,
};
const decimalRange: ODataFilterConditionData = {
  kind: "condition",
  id: "decimal-range",
  fieldId: "amount",
  fieldKind: "decimal",
  operator: "between",
  value: ["9007199254740993.00000001", "9007199254740993.00000002"],
};
// @ts-expect-error GUID filters cannot use string functions.
const wrongGuid: ODataFilterField = {
  id: "guid",
  path: "guid",
  label: "Guid",
  kind: "guid",
  operators: ["contains"],
};
// @ts-expect-error Decimal expressions preserve exact string values instead of numbers.
const wrongDecimal: ODataFilterConditionData = {
  kind: "condition",
  id: "decimal",
  fieldId: "amount",
  fieldKind: "decimal",
  operator: "eq",
  value: 0.1,
};
const wrongDecimalRange: ODataFilterConditionData = {
  kind: "condition",
  id: "decimal-range",
  fieldId: "amount",
  fieldKind: "decimal",
  operator: "between",
  // @ts-expect-error Both decimal range endpoints must preserve exact strings.
  value: ["0.1", 1],
};
// @ts-expect-error GUID expressions have no ordering/range operator.
const wrongGuidCondition: ODataFilterConditionData = {
  kind: "condition",
  id: "guid",
  fieldId: "guid",
  fieldKind: "guid",
  operator: "between",
  value: ["a", "b"],
};
void [
  guidField,
  decimalField,
  decimalRange,
  wrongGuid,
  wrongDecimal,
  wrongDecimalRange,
  wrongGuidCondition,
];

import { serializeODataFilter } from "@forge-ui/web";
import type {
  ODataFilterField,
  ODataFilterLabels,
  ODataFilterGroupData,
  ODataFilterConditionData,
  ODataFilterExpression,
} from "@forge-ui/web";
import { listItems } from "../List/fixtures";
export const fields: readonly ODataFilterField[] = [
  {
    id: "title",
    path: "title",
    kind: "text",
    label: "Label 1",
    placeholder: "Placeholder 1",
    defaultOperator: "contains",
  },
  {
    id: "amount",
    path: "amount",
    kind: "number",
    label: "Label 2",
    placeholder: "Placeholder 2",
  },
  { id: "active", path: "active", kind: "boolean", label: "Label 3" },
];
export const labels: ODataFilterLabels = {
  field: "Field",
  operator: "Operator",
  value: "Value",
  remove: "Remove",
  addCondition: "Add condition",
  addGroup: "Add group",
  group: "Group",
  and: "AND",
  or: "OR",
  apply: "Apply",
  clear: "Clear",
  cancel: "Cancel",
  all: "All",
  yes: "Yes",
  no: "No",
  minimum: "Minimum",
  maximum: "Maximum",
  invalid: "Invalid",
  unsupported: "Unsupported",
  operatorLabels: {
    eq: "eq",
    ne: "ne",
    contains: "contains",
    startswith: "startswith",
    endswith: "endswith",
    gt: "gt",
    ge: "ge",
    lt: "lt",
    le: "le",
    between: "between",
    in: "in",
  },
};
export const initialCondition: ODataFilterConditionData = {
  kind: "condition",
  id: "condition-1",
  fieldId: "title",
  fieldKind: "text",
  operator: "contains",
  value: "Title",
};
export const simpleExpression: ODataFilterGroupData = {
  kind: "group",
  id: "group-1",
  operator: "and",
  children: [],
};
export const advancedExpression: ODataFilterGroupData = {
  kind: "group",
  id: "group-1",
  operator: "and",
  children: [
    initialCondition,
    {
      kind: "group",
      id: "group-2",
      operator: "or",
      children: [
        {
          kind: "condition",
          id: "condition-2",
          fieldId: "amount",
          fieldKind: "number",
          operator: "ge",
          value: 2,
        },
        {
          kind: "condition",
          id: "condition-3",
          fieldId: "active",
          fieldKind: "boolean",
          operator: "eq",
          value: false,
        },
      ],
    },
  ],
};
export const filterRecords = listItems.map((row) => ({
  id: row.id,
  title: "Title " + row.index,
  amount: row.index,
  active: row.index % 2 === 0,
}));

export function matchesFilter(
  expression: ODataFilterExpression,
  row: (typeof filterRecords)[number],
): boolean {
  if (expression.kind === "group")
    return expression.operator === "and"
      ? expression.children.every((child) => matchesFilter(child, row))
      : expression.children.some((child) => matchesFilter(child, row));
  const value = expression.value;
  if (value === null) return true;
  const actual = row[expression.fieldId as keyof typeof row];

  switch (expression.operator) {
    case "eq":
      return actual === value;
    case "ne":
      return actual !== value;
    case "contains":
      return String(actual).includes(String(value));
    case "startswith":
      return String(actual).startsWith(String(value));
    case "endswith":
      return String(actual).endsWith(String(value));
    case "gt":
      return Number(actual) > Number(value);
    case "ge":
      return Number(actual) >= Number(value);
    case "lt":
      return Number(actual) < Number(value);
    case "le":
      return Number(actual) <= Number(value);
    case "between":
      return (
        Array.isArray(value) &&
        Number(actual) >= Number(value[0]) &&
        Number(actual) <= Number(value[1])
      );
    case "in":
      return Array.isArray(value) && value.includes(String(actual));
  }
}

function rejection(expression: ODataFilterExpression) {
  try {
    return serializeODataFilter(expression, fields);
  } catch {
    return "Rejected";
  }
}

export const serializationProof = {
  simple: serializeODataFilter(simpleExpression, fields),
  nested: serializeODataFilter(advancedExpression, fields),
  escaped: serializeODataFilter({ ...initialCondition, value: "O'Brien" }, fields),
  invalidField: rejection({ ...initialCondition, fieldId: "unknown" }),
  invalidValue: rejection({ ...initialCondition, fieldId: "amount" }),
};

export const exactFields: readonly ODataFilterField[] = [
  { id: "guid", path: "guid", kind: "guid", label: "Label 1", placeholder: "Placeholder 1" },
  {
    id: "decimal",
    path: "amount",
    kind: "decimal",
    label: "Label 2",
    placeholder: "Placeholder 2",
    precision: 30,
    scale: 10,
    defaultOperator: "between",
  },
];

export const exactExpression: ODataFilterGroupData = {
  kind: "group",
  id: "exact-root",
  operator: "and",
  children: [
    {
      kind: "condition",
      id: "exact-guid",
      fieldId: "guid",
      fieldKind: "guid",
      operator: "eq",
      value: "12345678-1234-5678-9abc-123456789abc",
    },
    {
      kind: "condition",
      id: "exact-decimal",
      fieldId: "decimal",
      fieldKind: "decimal",
      operator: "between",
      value: ["9007199254740993.0000000001", "9007199254740993.0000000002"],
    },
  ],
};

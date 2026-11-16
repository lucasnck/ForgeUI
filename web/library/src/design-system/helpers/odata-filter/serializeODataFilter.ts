import type {
  ODataFilterConditionData,
  ODataFilterExpression,
  ODataFilterField,
  ODataFilterOperator,
  ODataFilterValueData,
  ODataFilterDecimalField,
} from "../../types/odata-filter";
const comparisons = ["eq", "ne", "gt", "ge", "lt", "le", "between"] as const;

export function getODataFilterOperators(field: ODataFilterField): readonly ODataFilterOperator[] {
  const supported: readonly ODataFilterOperator[] =
    field.kind === "text"
      ? ["eq", "ne", "contains", "startswith", "endswith"]
      : field.kind === "boolean" || field.kind === "choice" || field.kind === "guid"
        ? ["eq", "ne"]
        : field.kind === "multiChoice"
          ? ["in"]
          : comparisons;
  const operators = field.operators ?? supported;
  if (!operators.length || operators.some((item) => !supported.includes(item)))
    throw new Error("Invalid operators for field: " + field.id);
  if (field.defaultOperator && !operators.includes(field.defaultOperator))
    throw new Error("Invalid default operator: " + field.id);
  return operators;
}

export function createODataFilterCondition(
  field: ODataFilterField,
  id: string,
  operator = field.defaultOperator ?? getODataFilterOperators(field)[0],
): ODataFilterConditionData {
  if (!getODataFilterOperators(field).includes(operator)) throw new Error("Invalid operator");
  return {
    kind: "condition",
    id,
    fieldId: field.id,
    fieldKind: field.kind,
    operator,
    value: operator === "between" ? [null, null] : null,
  } as ODataFilterConditionData;
}

export function replaceODataFilterConditionValue(
  condition: ODataFilterConditionData,
  value: ODataFilterValueData,
): ODataFilterConditionData {
  return { ...condition, value } as ODataFilterConditionData;
}

function quoted(value: string) {
  return "'" + value.replaceAll("'", "''") + "'";
}

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number(value.slice(0, 4)) < 1) return false;
  const parsed = new Date(value + "T00:00:00Z");

  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function guidLiteral(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.length !== 36 ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
  )
    throw new Error("Invalid GUID");
  return value.toLowerCase();
}

function decimalLiteral(value: unknown, field: ODataFilterDecimalField): string {
  if (
    typeof value !== "string" ||
    value.length > 1024 ||
    value !== value.trim() ||
    !/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value)
  )
    throw new Error("Invalid decimal");
  const [integer, fraction = ""] = value.replace(/^-/, "").split(".");
  const integerDigits = integer === "0" ? 0 : integer.length;
  if (fraction.length > field.scale || integerDigits > field.precision - field.scale)
    throw new Error("Decimal outside schema precision");
  return value;
}

function compareDecimalLiterals(left: string, right: string): number {
  const parts = (value: string) => {
    const [integer, fraction = ""] = value.replace(/^-/, "").split(".");
    const zero = /^0*$/.test(integer + fraction);

    return { negative: value.startsWith("-") && !zero, integer, fraction };
  };

  const a = parts(left);
  const b = parts(right);
  if (a.negative !== b.negative) return a.negative ? -1 : 1;
  const scale = Math.max(a.fraction.length, b.fraction.length);
  const aDigits = a.integer + a.fraction.padEnd(scale, "0");
  const bDigits = b.integer + b.fraction.padEnd(scale, "0");
  const result =
    a.integer.length === b.integer.length
      ? aDigits === bDigits
        ? 0
        : aDigits < bDigits
          ? -1
          : 1
      : a.integer.length - b.integer.length;

  return a.negative ? -Math.sign(result) : Math.sign(result);
}

function literal(value: unknown, field: ODataFilterField): string {
  if (value === null || value === undefined) throw new Error("Incomplete value: " + field.id);
  if (field.kind === "guid") return guidLiteral(value);
  if (field.kind === "decimal") return decimalLiteral(value, field);

  if (field.kind === "number") {
    if (typeof value !== "number" || !Number.isFinite(value)) throw new Error("Invalid number");
    return String(value);
  }

  if (field.kind === "boolean") {
    if (typeof value !== "boolean") throw new Error("Invalid boolean");
    return String(value);
  }

  if (typeof value !== "string") throw new Error("Invalid string value");
  if (field.kind === "text") return quoted(value);

  if (field.kind === "choice" || field.kind === "multiChoice") {
    if (!field.options.some((option) => option.value === value && !option.disabled))
      throw new Error("Unknown choice");
    return quoted(value);
  }

  if (field.kind === "date") {
    if (!validDate(value)) throw new Error("Invalid date");
    return value;
  }

  if (field.kind === "time") {
    if (!/^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,7})?)?$/.test(value))
      throw new Error("Invalid time");
    return value.length === 5 ? value + ":00" : value;
  }

  if (field.kind !== "datetime") throw new Error("Invalid field kind");
  if (
    !/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$/.test(value) ||
    !validDate(value.slice(0, 10))
  )
    throw new Error("Invalid datetime");
  if (!/^(Z|[+-](0\d|1[0-3]):[0-5]\d|[+-]14:00)$/.test(field.offset))
    throw new Error("Invalid datetime offset");
  return value + (value.length === 16 ? ":00" : "") + field.offset;
}

function rangeComparable(value: string, field: ODataFilterField) {
  if (field.kind === "time") {
    const [time, fraction = ""] = value.split(".");

    return (time.length === 5 ? time + ":00" : time) + "." + fraction.padEnd(7, "0");
  }

  if (field.kind === "datetime") return Date.parse(value);
  return value;
}

export function serializeODataFilter(
  expression: ODataFilterExpression,
  fields: readonly ODataFilterField[],
): string {
  const schema = new Map<string, ODataFilterField>();

  for (const field of fields) {
    if (
      !field.id.trim() ||
      !field.label.trim() ||
      schema.has(field.id) ||
      !/^[A-Za-z_][A-Za-z0-9_]*(?:\/[A-Za-z_][A-Za-z0-9_]*)*$/.test(field.path)
    )
      throw new Error("Invalid field schema");
    if (
      ![
        "text",
        "number",
        "guid",
        "decimal",
        "date",
        "time",
        "datetime",
        "boolean",
        "choice",
        "multiChoice",
      ].includes(field.kind)
    )
      throw new Error("Invalid field kind");
    if (
      (field.kind === "choice" || field.kind === "multiChoice") &&
      (new Set(field.options.map((option) => option.value)).size !== field.options.length ||
        field.options.some((option) => !option.value || !option.label.trim()))
    )
      throw new Error("Invalid choices");
    if (
      field.kind === "decimal" &&
      (!Number.isSafeInteger(field.precision) ||
        field.precision < 1 ||
        field.precision > 1024 ||
        !Number.isSafeInteger(field.scale) ||
        field.scale < 0 ||
        field.scale > field.precision)
    )
      throw new Error("Invalid decimal schema");
    getODataFilterOperators(field);
    schema.set(field.id, field);
  }

  const visited = new Set<object>();
  const ids = new Set<string>();

  function visit(node: ODataFilterExpression, depth: number): string {
    if (depth > 32 || !node || typeof node !== "object" || visited.has(node))
      throw new Error("Invalid expression tree");
    if (typeof node.id !== "string" || !node.id.trim() || ids.has(node.id))
      throw new Error("Invalid expression identity");
    ids.add(node.id);
    visited.add(node);

    if (node.kind === "group") {
      if ((node.operator !== "and" && node.operator !== "or") || !Array.isArray(node.children))
        throw new Error("Invalid group");
      const parts = node.children.map((child) => visit(child, depth + 1)).filter(Boolean);
      visited.delete(node);
      return parts.length ? "(" + parts.join(" " + node.operator + " ") + ")" : "";
    }

    if (node.kind !== "condition") throw new Error("Invalid expression node");
    const field = schema.get(node.fieldId);
    if (
      !field ||
      field.kind !== node.fieldKind ||
      !getODataFilterOperators(field).includes(node.operator)
    )
      throw new Error("Invalid condition");
    const path = field.path;

    if (node.operator === "between") {
      if (!Array.isArray(node.value) || node.value.length !== 2)
        throw new Error("Incomplete range");
      const [low, high] = node.value.map((value) => literal(value, field));
      if (
        field.kind === "decimal"
          ? compareDecimalLiterals(low, high) > 0
          : field.kind === "number"
            ? Number(node.value[0]) > Number(node.value[1])
            : rangeComparable(low, field) > rangeComparable(high, field)
      )
        throw new Error("Reversed range");
      return "(" + path + " ge " + low + " and " + path + " le " + high + ")";
    }

    if (node.operator === "in") {
      if (!Array.isArray(node.value) || !node.value.length) throw new Error("Incomplete choices");
      return (
        "(" +
        [...new Set(node.value)]
          .map((value) => path + " eq " + literal(value, field))
          .join(" or ") +
        ")"
      );
    }

    const value = literal(node.value, field);

    return ["contains", "startswith", "endswith"].includes(node.operator)
      ? node.operator + "(" + path + "," + value + ")"
      : path + " " + node.operator + " " + value;
  }

  return visit(expression, 0);
}

export function isODataFilterSimpleExpression(
  expression: ODataFilterExpression,
  fields: readonly ODataFilterField[],
): boolean {
  if (expression.kind !== "group" || expression.operator !== "and") return false;
  const seen = new Set<string>();

  return expression.children.every((node) => {
    if (node.kind !== "condition" || seen.has(node.fieldId)) return false;
    const field = fields.find((item) => item.id === node.fieldId);
    if (
      !field ||
      node.fieldKind !== field.kind ||
      node.operator !== (field.defaultOperator ?? getODataFilterOperators(field)[0])
    )
      return false;
    seen.add(node.fieldId);
    return true;
  });
}

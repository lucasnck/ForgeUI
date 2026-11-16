import type {
  CurrencyCode,
  MoneyFormatOptions,
  MoneyInputResult,
  MonetaryValue,
} from "../types/money";
import type { Locale } from "../../support/contracts/preferences";

export interface MoneyParseOptions extends MoneyFormatOptions {
  allowNegative?: boolean;
}
const canonical = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;
const negativeZero = /^-0(?:\.0+)?$/;

export function getCurrencyFractionDigits(currency: CurrencyCode, locale: Locale): number {
  if (!/^[A-Z]{3}$/.test(currency)) throw new RangeError("Invalid currency code");
  const digits = new Intl.NumberFormat(locale, { style: "currency", currency }).resolvedOptions()
    .maximumFractionDigits;
  if (digits === undefined) throw new RangeError("Currency precision is unavailable");
  return digits;
}

function exactFormat(formatter: Intl.NumberFormat, value: string): string {
  const format = formatter.format as unknown as (amount: string) => string;
  // ECMA-402 exact decimal string support is mandatory: never fall back to Number.
  const probe = new Intl.NumberFormat("en", { useGrouping: false, maximumFractionDigits: 2 })
    .format as unknown as (amount: string) => string;
  if (probe("9007199254740993.01") !== "9007199254740993.01")
    throw new RangeError("Exact decimal Intl formatting is unavailable");
  return format(value);
}

export function formatMoney(value: MonetaryValue, options: MoneyFormatOptions): string {
  const digits = getCurrencyFractionDigits(options.currency, options.locale);
  if (value === null) return "";
  if (typeof value !== "string" || !canonical.test(value))
    throw new RangeError("Invalid monetary value");
  if ((value.split(".")[1]?.length ?? 0) > digits)
    throw new RangeError("Invalid currency precision");
  const normalized = negativeZero.test(value) ? value.slice(1) : value;

  return exactFormat(
    new Intl.NumberFormat(options.locale, {
      style: "currency",
      currency: options.currency,
      currencyDisplay: options.currencyDisplay ?? "code",
      useGrouping: options.useGrouping ?? true,
    }),
    normalized,
  );
}

export function isValidMoney(value: unknown, options: MoneyFormatOptions): boolean {
  if (typeof value !== "string" || !value) return false;

  try {
    formatMoney(value, options);
    return true;
  } catch {
    return false;
  }
}

/** Internal editor representation: no currency affix or forced scale. */
export function moneyEditText(value: MonetaryValue, options: MoneyFormatOptions): string {
  getCurrencyFractionDigits(options.currency, options.locale);
  if (value === null) return "";
  if (!canonical.test(value)) throw new RangeError("Invalid monetary value");
  const decimal =
    new Intl.NumberFormat(options.locale).formatToParts(1.1).find((part) => part.type === "decimal")
      ?.value ?? ".";

  return (negativeZero.test(value) ? value.slice(1) : value).replace(".", decimal);
}

/** Internal blur representation. Precision is checked before formatting. */
export function moneyDisplayText(value: MonetaryValue, options: MoneyFormatOptions): string {
  formatMoney(value, options);
  if (value === null) return "";
  return exactFormat(
    new Intl.NumberFormat(options.locale, {
      minimumFractionDigits: getCurrencyFractionDigits(options.currency, options.locale),
      maximumFractionDigits: getCurrencyFractionDigits(options.currency, options.locale),
      useGrouping: options.useGrouping ?? true,
    }),
    negativeZero.test(value) ? value.slice(1) : value,
  );
}

function stripMatchingAffix(text: string, options: MoneyFormatOptions): string | null {
  // Intl nonbreaking affix spaces and ordinary paste spaces are equivalent only here.
  const affixSpace = (value: string) => value.replace(/[\u00a0\u202f]/g, " ");
  const pasted = affixSpace(text);

  // Derive the whole prefix/suffix rather than stripping arbitrary symbols or letters.
  for (const currencyDisplay of ["code", "symbol", "narrowSymbol", "name"] as const) {
    for (const number of [1, 2, -1, -2]) {
      const parts = new Intl.NumberFormat(options.locale, {
        style: "currency",
        currency: options.currency,
        currencyDisplay,
      }).formatToParts(number);
      const first = parts.findIndex((part) => part.type === "integer");
      let last = parts.length - 1;
      while (
        last > first &&
        !["integer", "group", "decimal", "fraction"].includes(parts[last].type)
      )
        last--;
      const prefix = affixSpace(
        parts
          .slice(0, first)
          .map((part) => part.value)
          .join(""),
      );
      const suffix = affixSpace(
        parts
          .slice(last + 1)
          .map((part) => part.value)
          .join(""),
      );

      if (
        pasted.startsWith(prefix) &&
        pasted.endsWith(suffix) &&
        pasted.length > prefix.length + suffix.length
      ) {
        const body = pasted.slice(prefix.length, suffix ? -suffix.length : undefined);

        // Number affixes may include a sign; preserve it in the numeric body.
        return `${parts.some((part) => part.type === "minusSign") ? "-" : ""}${body}`;
      }
    }
  }

  return null;
}

export function parseMoneyInput(text: string, options: MoneyParseOptions): MoneyInputResult {
  const digits = getCurrencyFractionDigits(options.currency, options.locale);
  if (text === "") return { kind: "empty", value: null };
  const parts = new Intl.NumberFormat(options.locale).formatToParts(-1234567.89);
  const decimal = parts.find((part) => part.type === "decimal")?.value ?? ".";
  const group = parts.find((part) => part.type === "group")?.value ?? ",";
  const minus = parts.find((part) => part.type === "minusSign")?.value ?? "-";
  let raw = text;
  // Plain editor text is accepted independently of currency placement.
  const allowed = (value: string) =>
    [...value].every((char) => /[0-9]/.test(char) || [decimal, group, minus].includes(char));

  if (!allowed(raw)) {
    const stripped = stripMatchingAffix(raw, options);
    if (stripped === null || !allowed(stripped)) return { kind: "invalid", text, reason: "syntax" };
    raw = stripped;
  }

  const negative = raw.startsWith(minus);
  if (negative && options.allowNegative === false)
    return { kind: "invalid", text, reason: "negative" };
  if (negative) raw = raw.slice(minus.length);
  if (raw.includes(minus)) return { kind: "invalid", text, reason: "syntax" };
  if (raw === "" || raw === decimal) return { kind: "incomplete", text };
  const sections = raw.split(decimal);
  if (sections.length > 2) return { kind: "invalid", text, reason: "syntax" };
  let integer = sections[0];
  const fraction = sections[1];
  if (fraction !== undefined && !/^[0-9]*$/.test(fraction))
    return { kind: "invalid", text, reason: "syntax" };

  if (integer.includes(group)) {
    const groups = integer.split(group);
    const expected = new Intl.NumberFormat(options.locale)
      .formatToParts(1234567890123)
      .filter((part) => part.type === "integer")
      .map((part) => part.value.length);
    const primary = expected.at(-1) ?? 3;
    const secondary = expected.at(-2) ?? primary;

    if (
      !groups.every(
        (part, index) =>
          /^[0-9]+$/.test(part) &&
          (index === 0
            ? part.length >= 1 && part.length <= secondary
            : part.length === (index === groups.length - 1 ? primary : secondary)),
      )
    ) {
      return { kind: "invalid", text, reason: "syntax" };
    }

    integer = groups.join("");
  }

  if (!/^[0-9]*$/.test(integer) || (!integer && fraction === undefined))
    return { kind: "invalid", text, reason: "syntax" };
  if (fraction !== undefined && fraction.length > digits)
    return { kind: "invalid", text, reason: "precision" };
  if (fraction === "") return { kind: "incomplete", text };
  integer = integer.replace(/^0+(?=[0-9])/, "") || "0";
  const unsigned = integer + (fraction === undefined ? "" : `.${fraction}`);
  const value = negative && !/^0(?:\.0+)?$/.test(unsigned) ? `-${unsigned}` : unsigned;

  return { kind: "valid", value };
}

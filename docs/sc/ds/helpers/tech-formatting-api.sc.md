---
title: "Formatting and validation API"
scope: "Public formatters and validators namespaces over canonical helper owners, without a public parsing namespace"
status: "DONE"
type: "helper"
ds-level: "none"
---

# Formatting and validation API

## Files

```text
lib/formatting/intl.ts (C)
infrastructure/i18n/formatters.ts (M)
design-system/helpers/formatters.ts (C)
design-system/helpers/validators.ts (C)
design-system/index.ts (M)
../scripts/check-formatting-api.cjs (C)
../scripts/check-i18n.cjs (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
../scripts/check-showcase-v2.cjs (M)
```

## Dependencies

- [Money helpers](tech-money.sc.md)
- [Brazilian documents](tech-brazilian-document-formatters.sc.md)
- [Phone helpers](tech-phone-formatters.sc.md)
- [CEP helpers](tech-postal-code-formatters.sc.md)
- [Date-only helpers](tech-date-only-formatters.sc.md)
- [Duration helpers](tech-duration-formatters.sc.md)
- [File size helpers](tech-file-size-formatters.sc.md)
- [Relative time helpers](tech-relative-time-formatters.sc.md)

## Contract

```ts
import {formatters, validators} from "@forge-ui/web";
formatters.number(1234.56, "pt-BR");
formatters.percent(0.15, "pt-BR");
formatters.date(timestamp, "pt-BR", {timeZone: "America/Sao_Paulo", dateStyle: "short"});
formatters.money("1234.56", {currency: "BRL", locale: "pt-BR"});
formatters.cpf("01234567890");
formatters.cnpj("12ABC34501DE35");
formatters.phone("+5511912345678");
formatters.cep("01234567");
formatters.dateOnly("2026-10-18", "pt-BR");
formatters.duration(5400, "pt-BR");
formatters.durationClock(5400);
formatters.fileSize(1536, "pt-BR", {binary: true});
formatters.relativeTime(updatedAt, referenceNow, "pt-BR");
validators.number(quantity);
validators.percent(ratio);
validators.date(timestamp);
validators.money(amount, {currency: "BRL", locale: "pt-BR"});
validators.cpf(cpf);
validators.cnpj(cnpj);
validators.phone(phone, "BR");
validators.cep(cep);
validators.dateOnly(date);
validators.duration(seconds);
validators.fileSize(bytes);
validators.relativeTime(updatedAt, referenceNow);
```

## Content

```ts
export {formatNumber as number, formatPercent as percent, formatDate as date} from "@/lib/formatting/intl";
export {formatMoney as money} from "./money";
export {formatCpf as cpf, formatCnpj as cnpj} from "./brazilian-documents";
export {formatPhone as phone} from "./phone";
export {formatCep as cep} from "./postal-code";
export {formatDateOnly as dateOnly} from "./date-only";
export {formatDuration as duration, formatDurationClock as durationClock} from "./duration";
export {formatFileSize as fileSize} from "./file-size";
export {formatRelativeTime as relativeTime} from "./relative-time";
```

```ts
export {isFiniteNumber as number, isFiniteNumber as percent, isValidInstant as date} from "@/lib/formatting/intl";
export {isValidMoney as money} from "./money";
export {isValidCpf as cpf, isValidCnpj as cnpj} from "./brazilian-documents";
export {isValidPhone as phone} from "./phone";
export {isValidCep as cep} from "./postal-code";
export {isValidDateOnly as dateOnly} from "./date-only";
export {isValidDuration as duration} from "./duration";
export {isValidFileSize as fileSize} from "./file-size";
export {isValidRelativeTime as relativeTime} from "./relative-time";
```

```ts
export * as formatters from "./helpers/formatters";
export * as validators from "./helpers/validators";
```

```ts
import type { Locale } from "../contracts/preferences";

export function formatDate(
  value: Date | number,
  locale: Locale,
  options: Intl.DateTimeFormatOptions & { timeZone: string },
): string {
  return new Intl.DateTimeFormat(locale, options).format(value);
}

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatPercent(
  value: number,
  locale: Locale,
  options?: Omit<Intl.NumberFormatOptions, "style">,
): string {
  return new Intl.NumberFormat(locale, { ...options, style: "percent" }).format(
    value,
  );
}

export function formatCurrency(
  value: number,
  locale: Locale,
  currency: string,
  options?: Omit<Intl.NumberFormatOptions, "style" | "currency">,
): string {
  return new Intl.NumberFormat(locale, {
    ...options,
    style: "currency",
    currency,
  }).format(value);
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
export function isValidInstant(value: unknown): boolean {
  const time = value instanceof Date ? value.getTime() : value;
  return typeof time === "number" && Number.isFinite(new Date(time).getTime());
}

```

```ts
export {formatDate, formatNumber, formatPercent, formatCurrency} from "@/lib/formatting/intl";
```

## Tests

- V2 Formatter namespace contracts: verify valid/boundary input/output and minimal consumer code against the actual helper signature.

- Compile every namespace key and argument contract; reject unknown keys, wrong monetary number values, missing locales/currency/reference times and calls to nonexistent public parsers/normalizers.
- Check aliases reference the exact owning functions, with no wrapped duplicate algorithms, mutable registrations or global configuration.
- Validators return boolean and do not throw for malformed user values; empty optional-field policy remains caller-owned.
- Build a production consumer using only formatters.cpf/validators.cpf and inspect whether phone metadata is retained. Compare against a targeted helper import; document actual results rather than assuming tree shaking.
- Ensure no DS module imports infrastructure and no existing infrastructure formatter API is removed.

## Criteria

- [x] Public grouped names are `formatters` and `validators`. They are static ESM namespace objects with known typed keys and readonly bindings, not a mutable registry, class instance or global service.
- [x] Namespace modules only re-export owning functions. Formatting, normalization, parsing and validation algorithms remain in their resource owners; aggregators introduce no business logic, translated strings, timers or provider state.
- [x] No public `parsers` or `normalizers` object is introduced. parseMoneyInput, parsePhone, normalizeCpf/normalizeCnpj/normalizeCep/normalizeDateOnly and phone-country metadata helpers remain internal source-module exports for DS use, omitted from the root public barrel and catalogs.
- [x] Grouped namespaces are the documented preferred consumption API. Existing delivered named exports remain compatible; new formatter/validator named aliases may remain available for targeted imports without exposing internal parsers.
- [x] Validators accept unknown user values where appropriate and return false for absent, incomplete or malformed values. They never coerce an empty value to zero, throw translated form errors, sanitize into another value or mutate the argument. Valid numeric zero remains valid for money/duration/file size.
- [x] CPF/CNPJ validators check structure and check digits, including alphanumeric CNPJ. CEP checks shape only. Phone checks numbering metadata validity. None proves registry existence, address coverage, phone assignment/reachability or ownership.
- [x] Monetary validation checks exact canonical major-unit syntax and currency scale. Civil-date validation checks real Gregorian dates; duration/file-size check nonnegative safe integers in their explicit units; relative-time checks both supported instant arguments.
- [x] Required/optional policy, min/max, price calculations, tenant/country permissions and backend business validation remain caller-owned. Components may expose richer internal edit states while the public validator result remains boolean.
- [x] Existing pure Intl implementations move explicitly to lib/formatting/intl.ts, consuming only neutral Locale. Infrastructure re-exports their exact existing names/signatures, including legacy numeric formatCurrency. DS namespace imports lib directly, never infrastructure; no duplicated algorithm or consumer-wide rewrite occurs. New exact monetary usage remains formatters.money, not a second currency key.
- [x] Static property access can be optimized by the bundler, but namespace enumeration/dynamic keys may retain the whole module graph. Measure CPF-only imports before claiming phone metadata is eliminated; preserve a targeted import route if needed without promising free bundle size.
- [x] Specs and catalogs describe delivered availability and distinguish public namespace keys from internal parsing/normalization helpers.

- [x] formatters.number/percent/date expose the delivered numeric/ratio/instant semantics. validators.number/percent check finite numbers without imposing business ranges; validators.date checks a valid Date/epoch-millisecond instant. formatters.date still requires an explicit timezone; dateOnly remains a separate civil-date contract.

- [x] V2 **Formatter namespace contracts** is covered through the public Text consumer examples and typed caller fixtures: Exercise each public formatter/validator namespace entry in typed caller fixtures using its own valid numeric/date/money/document/phone data; show representative outputs through existing Text and specialized-control examples. Do not invent parser APIs or a helper page kind.
- [x] V2 imports only the actual helper export or documented public helper subpath, keeps typed data valid and documents output ownership. No standalone helper route/kind, private dependency or duplicated implementation is introduced; this pending item is consumer acceptance, not loss of existing API availability.

- [x] Verify the supporting example in a real browser with standard/narrow layout and displayed-output/copyable-snippet agreement. Runtime helper assertions, typed fixtures and SSR do not replace visual verification.

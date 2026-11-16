---
title: "International phone helpers"
scope: "Metadata-backed national and international parsing and presentation without reachability claims"
status: "DONE"
type: "helper"
ds-level: "none"
---

# International phone helpers

## Files

```text
features/showcase-v2/components/InternationalTelephoneInput/fixtures.ts (C)
design-system/helpers/phone.ts (C)
design-system/helpers/phone-country-labels.ts (C)
design-system/index.ts (M)
../package.json (M)
../package-lock.json (M)
../scripts/check-phone.cjs (C)
../scripts/fixtures/showcase-v2-contracts.ts (M)
../scripts/check-showcase-v2.cjs (M)
```

## Dependencies

- [Phone contracts](../types/tech-phone-contracts.sc.md)

## Contract

```ts
import {formatters, validators} from "@forge-ui/web";
formatters.phone("+5511912345678", {international: true});
validators.phone(phone, "BR");
```

## Content

```ts
import parsePhoneNumber, {
  getCountries,
  getCountryCallingCode,
  validatePhoneNumberLength,
  AsYouType,
} from "libphonenumber-js/max";
import type { CountryCode } from "libphonenumber-js";
import type { Locale } from "@/lib/contracts/preferences";
import type { PhoneCountry, PhoneCountryOption, PhoneParseResult } from "../types/phone";
import { phoneCountryLabels } from "./phone-country-labels";

export function formatPhoneDraft(text: string, country: PhoneCountry | null): string {
  if (!/^\+?[0-9() .-]*$/.test(text) || !/[0-9+]/.test(text)) return text;
  const context = country && isSupportedPhoneCountry(country) ? country : undefined;

  return new AsYouType(context).input(text);
}

export function isSupportedPhoneCountry(country: PhoneCountry): country is CountryCode {
  return getCountries().some((candidate) => candidate === country);
}

export function parsePhone(text: string, country: PhoneCountry | null = null): PhoneParseResult {
  if (country !== null && !isSupportedPhoneCountry(country))
    throw new RangeError("Unsupported phone country");
  const draft = text.trim();
  if (!draft) return { kind: "empty" };
  if (!/^\+?[0-9() .-]*$/.test(draft) || !/[0-9+]/.test(draft)) return { kind: "invalid", text };
  if (!draft.startsWith("+") && country === null) return { kind: "incomplete", text };
  if (/^\+0/.test(draft)) return { kind: "invalid", text };
  if (/^\+\d{0,2}$/.test(draft)) return { kind: "incomplete", text };
  const context = country && isSupportedPhoneCountry(country) ? country : undefined;
  const parsed = parsePhoneNumber(draft, { defaultCountry: context, extract: false });

  if (
    !parsed ||
    parsed.ext ||
    !parsed.isPossible() ||
    !/^\+[1-9][0-9]{1,14}$/.test(parsed.number)
  ) {
    const reason = validatePhoneNumberLength(draft, context);

    return { kind: reason === "TOO_SHORT" ? "incomplete" : "invalid", text };
  }

  const compatible =
    context &&
    getCountryCallingCode(context) === parsed.countryCallingCode &&
    (!parsed.country || parsed.country === context);

  return {
    kind: "possible",
    number: parsed.number,
    country: compatible ? context : (parsed.country ?? null),
  };
}

export function formatPhone(
  number: string | null,
  options: { international?: boolean } = {},
): string {
  if (number === null) return "";
  if (!/^\+[1-9][0-9]{1,14}$/.test(number)) throw new RangeError("Invalid canonical phone");
  const parsed = parsePhoneNumber(number, { extract: false });
  if (!parsed || parsed.ext || !parsed.isPossible())
    throw new RangeError("Invalid canonical phone");
  return options.international === false ? parsed.formatNational() : parsed.formatInternational();
}

export function getPhoneCountries(locale: Locale): PhoneCountryOption[] {
  return Object.entries(phoneCountryLabels[locale]).map(([country, label]) => ({
    country,
    callingCode: getCountryCallingCode(country as CountryCode),
    label,
  }));
}

export function isValidPhone(value: unknown, country: PhoneCountry | null = null): boolean {
  if (typeof value !== "string" || (country !== null && !isSupportedPhoneCountry(country)))
    return false;

  try {
    const result = parsePhone(value, country);

    return (
      result.kind === "possible" &&
      Boolean(parsePhoneNumber(result.number, { extract: false })?.isValid())
    );
  } catch {
    return false;
  }
}
```

## Tests

- V2 Phone normalization and validation: verify valid/boundary input/output and minimal consumer code against the actual helper signature.

- Parse national/international fixtures for BR, US, CA, PT, GB and a non-geographic calling code; format and round-trip canonical numbers.
- Preserve national significant zeros where the numbering plan requires them; handle national trunk prefixes using metadata rather than string slicing.
- Distinguish +, partial DDI, too-short, too-long, unsupported calling code and syntactically invalid input.
- Reject arbitrary prose extraction, multiple plus signs, vanity letters and extensions; do not sanitize them into a different number.
- Localized country labels remain stable by ISO key, allow shared DDIs and do not depend on application providers.

## Criteria

- [x] Provide an internal formatPhoneDraft helper using the installed libphonenumber-js/max AsYouType metadata for progressive national/international text. Preserve unsupported characters verbatim so validation can reject them; do not expose a new public formatter/normalizer namespace API or fetch metadata at runtime.
- [x] Cover Brazilian mobile/landline, US, Spanish and explicit international examples, incomplete input and invalid characters; pass touched-file formatting/lint checks, typechecking and targeted phone checks.
- [x] `libphonenumber-js` with max metadata is the isolated numbering engine, installed for the authorized implementation; no CDN or runtime metadata fetch is introduced. [Library contract](https://github.com/catamphetamine/libphonenumber-js).
- [x] parsePhone(text, country) returns PhoneParseResult. National input requires a supported explicit country; input beginning with + supplies its international calling code and takes precedence over national context.
- [x] Canonical output uses metadata-backed parsing with extract=false, no extension, valid E.164 shape and isPossible length checks. Incomplete text is preserved for editing. No blanket twelve/fifteen digit input mask or digits-only sanitizer is used.
- [x] `possible` describes numbering-plan possibility and length, not current assignment, availability, ownership, mobile capability or successful SMS delivery. No remote lookup, authentication or OTP flow belongs to these helpers.
- [x] Country derivation preserves a compatible selected territory when a calling code is shared. Unresolved/non-geographic results keep country null rather than choosing a territory by display order.
- [x] Formatting uses complete canonical values; editable partial text remains the component's draft and is never passed to a complete-only formatter on every keystroke.
- [x] Country labels use explicit Locale and bundled localized metadata. Locale changes labels/order only, without changing country or number. Allowed-country filtering belongs to the consuming component.
- [x] Package and lockfile updates, selected metadata coverage and bundled size are reviewed together when implemented. A small hardcoded BR/US mask table does not satisfy international coverage.

- [x] Preferred public consumption uses the typed formatters/validators namespaces. Parsing and normalization functions in this source owner are internal DS exports, omitted from the root public barrel. The namespace modules alias the same owning functions rather than copying algorithms.

- [x] isValidPhone is the public validators.phone alias and applies metadata isValid checks after strict parsing; parsePhone's possible editing result remains distinct. Validation failure never asserts assignment/reachability or changes the draft. False is returned for unsupported country or malformed user input.

- [x] Country labels and option ordering use the bundled locale snapshot and remain identical across server and browser ICU versions.

- [x] V2 **Phone normalization and validation** is covered through the public InternationalTelephoneInput consumer examples and typed caller fixtures: Compare actual phone formatter/validator results with explicit region/international options, including valid canonical and invalid fixtures; display values separately from country selection and do not claim number ownership.
- [x] V2 imports only the actual helper export or documented public helper subpath, keeps typed data valid and documents output ownership. No standalone helper route/kind, private dependency or duplicated implementation is introduced; this pending item is consumer acceptance, not loss of existing API availability.

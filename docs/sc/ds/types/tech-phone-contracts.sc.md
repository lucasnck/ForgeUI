---
title: "International phone contracts"
scope: "Canonical international phone values, explicit country context and parse outcomes"
status: "DONE"
type: "type"
ds-level: "none"
---

# International phone contracts

## Files

```text
design-system/types/phone.ts (C)
design-system/types/index.ts (M)
design-system/index.ts (M)
../scripts/fixtures/showcase-v2-contracts.ts (M)
```

## Dependencies

- [Native control contracts](tech-native-control-contracts.sc.md)

## Contract

```ts
import type {PhoneInputValue, PhoneParseResult} from "@forge-ui/web";
const phone: PhoneInputValue = {number: "+5511912345678", country: "BR"};
const emptyPhone: PhoneInputValue = {number: null, country: "BR"};
```

## Content

```ts
import type { NativeInputProps } from "./native-control-contracts";
export type PhoneCountry = string;
export interface PhoneInputValue { number: string | null; country: PhoneCountry | null; }
export interface PhoneCountryOption { country: PhoneCountry; callingCode: string; label: string; }
export type PhoneParseResult = { kind: "empty" } | { kind: "incomplete"; text: string } | { kind: "invalid"; text: string } | { kind: "possible"; number: string; country: PhoneCountry | null };
export interface NativeInternationalTelephoneInputProps extends Omit<NativeInputProps, "type" | "children" | "inputMode" | "autoComplete" | "value" | "defaultValue" | "onChange" | "pattern" | "maxLength" | "list"> {}
```

## Tests

- V2 Consumer snippets for InternationalTelephoneInput retain actual signature/shape and reject unsupported values without advertising an unimplemented standalone page.

- Compile empty values with retained country and canonical numbers with known or unresolved country.
- Reject numeric phone values and competing native control channels.
- Require explicit narrowing of empty/incomplete/invalid/possible parse outcomes.

## Criteria

- [x] Canonical number is null or `+` followed by an E.164 international number with at most fifteen digits; a regex alone never certifies numbering-plan validity. [ITU reference](https://www.itu.int/rec/dologin_pub.asp?id=T-REC-E.164-202602-I%21%21PDF-E&lang=e&type=items).
- [x] Country is an uppercase two-letter territory code supported by the metadata, or null for international/undetermined context. Calling code is a separate string; country and calling code are never interchangeable.
- [x] Shared calling codes do not force a unique country: US/CA may share +1; non-geographic calling codes may have no country.
- [x] Empty value preserves the chosen country. Native adaptation has one canonical owner and retains ref/id/name/form/required/disabled/readOnly and accessible attributes.
- [x] Extensions are outside E.164 and outside this increment's value channel; pasted extension text produces an explicit invalid draft rather than silently dropping the extension or appending its digits.
- [x] No locale-to-country inference, geolocation, account country default or business mobile-only restriction is introduced.

- [x] V2 typed usage fixtures cover InternationalTelephoneInput: Country/region and canonical international phone value contracts. Include an accepted public consumption and a rejected unsupported value/shape for each relevant union/interface boundary, using the actual source types rather than a second local declaration.
- [x] V2 typed fixtures identify this canonical source; any existing consuming Properties/Contract references the same owner; native inherited members remain delegated and repeated fixture labels keep stable one-based identity where applicable. Types have no invented runtime methods, independent visual page or new resource kind. Pending status covers these consumer checks only; existing exports remain available.

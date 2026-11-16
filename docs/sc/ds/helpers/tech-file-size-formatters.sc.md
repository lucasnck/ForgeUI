---
title: "File size formatting"
scope: "Localized nonnegative byte counts with explicit decimal or binary scale and matching unit labels"
status: "DONE"
type: "helper"
ds-level: "none"
---

# File size formatting

## Files

```text
design-system/helpers/file-size.ts (C)
design-system/index.ts (M)
../scripts/check-formatting.cjs (C)
../scripts/fixtures/showcase-v2-contracts.ts (M)
../scripts/check-showcase-v2.cjs (M)
```

## Contract

```ts
import {formatters, validators} from "@forge-ui/web";
formatters.fileSize(1536, "pt-BR", {binary: true});
validators.fileSize(bytes);
```

## Content

```ts
import type {Locale} from "@/lib/contracts/preferences";
export function formatFileSize(bytes: number | null, locale: Locale, options: {binary?: boolean} = {}): string {
  if (bytes === null) return "";
  if (!Number.isSafeInteger(bytes) || bytes < 0) throw new RangeError("Invalid byte count");
  const base = options.binary ? 1024 : 1000;
  const units = options.binary ? ["B","KiB","MiB","GiB","TiB","PiB"] : ["B","kB","MB","GB","TB","PB"];
  let index = 0;
  while (index < units.length-1 && bytes >= base**(index+1)) index++;
  let amount = bytes / base**index;
  if (index < units.length-1 && Math.round(amount*100)/100 >= base) {
    index++; amount = bytes / base**index;
  }
  return `${new Intl.NumberFormat(locale, {maximumFractionDigits: index === 0 ? 0 : 2}).format(amount)} ${units[index]}`;
}

export function isValidFileSize(value: unknown): boolean {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}
```

## Tests

- V2 File size display: verify valid/boundary input/output and minimal consumer code against the actual helper signature.

- Cover zero, null, 999/1000/1023/1024/1536 bytes, unit boundaries and Number.MAX_SAFE_INTEGER.
- Check decimal 1000 B becomes 1 kB while binary 1024 B becomes 1 KiB; 1536 binary is 1.5 KiB in English.
- Test rounding promotion near a unit boundary, locale decimals and invalid negative/fractional/unsafe/NaN/Infinity input.

## Criteria

- [x] Input is an exact nonnegative safe-integer byte count; null is absent, zero displays 0 B. Oversized counts are rejected rather than silently losing integer precision.
- [x] Default scale is decimal 1000 with B/kB/MB/GB/TB/PB. binary=true uses 1024 with B/KiB/MiB/GiB/TiB/PiB; binary values must not be mislabeled KB/MB.
- [x] At most two fractional digits are shown above bytes, using the explicit locale. Unit selection accounts for rounding so a value is not displayed as 1000 kB or 1024 KiB at the next-unit boundary.
- [x] This helper formats byte quantities only; it does not infer bits, transfer rate, storage quota or upload limits, and introduces no provider or remote lookup.

- [x] Preferred public consumption uses the typed formatters/validators namespaces. Parsing and normalization functions in this source owner are internal DS exports, omitted from the root public barrel. The namespace modules alias the same owning functions rather than copying algorithms.

- [x] V2 **File size display** is covered through the public FileInput consumer examples and typed caller fixtures: Display actual fileSize formatter/validator outputs for zero and 1536 bytes, binary versus decimal units and explicit locales, without uploading files or confusing bytes with formatted text.
- [x] V2 imports only the actual helper export or documented public helper subpath, keeps typed data valid and documents output ownership. No standalone helper route/kind, private dependency or duplicated implementation is introduced; this pending item is consumer acceptance, not loss of existing API availability.

- [x] Verify the supporting example in a real browser with standard/narrow layout and displayed-output/copyable-snippet agreement. Runtime helper assertions, typed fixtures and SSR do not replace visual verification.

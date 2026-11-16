import { formatters, validators } from "@forge-ui/web";

const values = [0, 5400] as const;
const locales = ["pt-BR", "en"] as const;

export const durationRows = locales.flatMap((locale) =>
  values.map((seconds) => ({
    id: `${locale}-${seconds}`,
    locale,
    seconds,
    clock: formatters.durationClock(seconds),
    localized: formatters.duration(seconds, locale),
    valid: validators.duration(seconds),
  })),
);

export const durationBoundaries = [
  { value: 0, valid: validators.duration(0) },
  { value: 59, valid: validators.duration(59) },
  { value: 90000, valid: validators.duration(90000) },
  { value: -1, valid: validators.duration(-1) },
  { value: 1.5, valid: validators.duration(1.5) },
  { value: Number.MAX_SAFE_INTEGER + 1, valid: validators.duration(Number.MAX_SAFE_INTEGER + 1) },
  { value: Number.NaN, valid: validators.duration(Number.NaN) },
  { value: Number.POSITIVE_INFINITY, valid: validators.duration(Number.POSITIVE_INFINITY) },
] as const;

import type { Locale } from "../../support/contracts/preferences";

function durationParts(seconds: number) {
  if (!Number.isSafeInteger(seconds) || seconds < 0)
    throw new RangeError("Invalid elapsed seconds");
  return {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export function formatDurationClock(value: number | null): string {
  if (value === null) return "";
  const { hours, minutes, seconds } = durationParts(value);

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");
}

export function formatDuration(value: number | null, locale: Locale): string {
  if (value === null) return "";
  const parts = durationParts(value);
  const units = [
    [parts.hours, "hour"],
    [parts.minutes, "minute"],
    [parts.seconds, "second"],
  ] as const;
  const labels = units
    .filter(([amount, unit]) => amount !== 0 || (value === 0 && unit === "second"))
    .map(([amount, unit]) =>
      new Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay: "long" }).format(amount),
    );

  return new Intl.ListFormat(locale, { style: "long", type: "unit" }).format(labels);
}

export function isValidDuration(value: unknown): boolean {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

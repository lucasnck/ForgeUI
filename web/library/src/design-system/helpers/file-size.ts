import type { Locale } from "../../support/contracts/preferences";

export function formatFileSize(
  bytes: number | null,
  locale: Locale,
  options: { binary?: boolean } = {},
): string {
  if (bytes === null) return "";
  if (!Number.isSafeInteger(bytes) || bytes < 0) throw new RangeError("Invalid byte count");
  const base = options.binary ? 1024 : 1000;
  const units = options.binary
    ? ["B", "KiB", "MiB", "GiB", "TiB", "PiB"]
    : ["B", "kB", "MB", "GB", "TB", "PB"];
  let index = 0;
  while (index < units.length - 1 && bytes >= base ** (index + 1)) index++;
  let amount = bytes / base ** index;

  if (index < units.length - 1 && Math.round(amount * 100) / 100 >= base) {
    index++;
    amount = bytes / base ** index;
  }

  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: index === 0 ? 0 : 2 }).format(amount)} ${units[index]}`;
}

export function isValidFileSize(value: unknown): boolean {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

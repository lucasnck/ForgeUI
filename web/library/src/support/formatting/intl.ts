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
  return new Intl.NumberFormat(locale, { ...options, style: "percent" }).format(value);
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

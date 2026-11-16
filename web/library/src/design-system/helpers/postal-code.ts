export function normalizeCep(value: string): string {
  const text = value.trim();
  if (text === "") return "";
  if (/^[0-9]{8}$/.test(text)) return text;
  if (/^[0-9]{5}-[0-9]{3}$/.test(text)) return text.replace("-", "");
  throw new RangeError("Invalid CEP format");
}

export function formatCep(value: string | null): string {
  if (value === null) return "";
  const raw = normalizeCep(value);

  return raw === "" ? "" : `${raw.slice(0, 5)}-${raw.slice(5)}`;
}

export function isValidCep(value: unknown): boolean {
  if (typeof value !== "string") return false;

  try {
    return normalizeCep(value).length === 8;
  } catch {
    return false;
  }
}

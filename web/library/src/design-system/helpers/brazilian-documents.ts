const CPF_RAW = /^[0-9]{11}$/;
const CPF_DISPLAY = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
const CNPJ_RAW = /^[A-Z0-9]{12}[0-9]{2}$/;
const CNPJ_DISPLAY = /^[A-Z0-9]{2}\.[A-Z0-9]{3}\.[A-Z0-9]{3}\/[A-Z0-9]{4}-[0-9]{2}$/;

export function normalizeCpf(value: string): string {
  const text = value.trim();
  if (text === "") return "";
  if (CPF_RAW.test(text)) return text;
  if (CPF_DISPLAY.test(text)) return text.replace(/[.-]/g, "");
  throw new RangeError("Invalid CPF format");
}

export function formatCpf(value: string | null): string {
  if (value === null) return "";
  const raw = normalizeCpf(value);
  if (raw === "") return "";
  return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
}

export function normalizeCnpj(value: string): string {
  const text = value.trim().replace(/[a-z]/g, (letter) => letter.toUpperCase());
  if (text === "") return "";
  if (CNPJ_RAW.test(text)) return text;
  if (CNPJ_DISPLAY.test(text)) return text.replace(/[.\/-]/g, "");
  throw new RangeError("Invalid CNPJ format");
}

export function formatCnpj(value: string | null): string {
  if (value === null) return "";
  const raw = normalizeCnpj(value);
  if (raw === "") return "";
  return `${raw.slice(0, 2)}.${raw.slice(2, 5)}.${raw.slice(5, 8)}/${raw.slice(8, 12)}-${raw.slice(12)}`;
}

export function isValidCpf(value: unknown): boolean {
  if (typeof value !== "string") return false;
  let raw: string;

  try {
    raw = normalizeCpf(value);
  } catch {
    return false;
  }

  if (raw.length !== 11 || /^([0-9])\1{10}$/.test(raw)) return false;

  for (let length = 9; length <= 10; length++) {
    let sum = 0;
    for (let index = 0; index < length; index++) sum += Number(raw[index]) * (length + 1 - index);
    const remainder = sum % 11;
    const digit = remainder < 2 ? 0 : 11 - remainder;
    if (digit !== Number(raw[length])) return false;
  }

  return true;
}

export function isValidCnpj(value: unknown): boolean {
  if (typeof value !== "string") return false;
  let raw: string;

  try {
    raw = normalizeCnpj(value);
  } catch {
    return false;
  }

  if (raw.length !== 14 || /^([0-9])\1{13}$/.test(raw)) return false;
  const weights = [
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  ];

  return weights.every((row, offset) => {
    const sum = row.reduce(
      (total, weight, index) => total + (raw.charCodeAt(index) - 48) * weight,
      0,
    );
    const remainder = sum % 11;

    return Number(raw[12 + offset]) === (remainder < 2 ? 0 : 11 - remainder);
  });
}

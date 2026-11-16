import { formatters, validators } from "@forge-ui/web";
export const referenceNow = Date.UTC(2026, 9, 18);
export const relativeRows = [-3600000, 0, 60000].map((offset) => ({
  id: String(offset),
  offset,
  formatted: formatters.relativeTime(referenceNow + offset, referenceNow, "en"),
  valid: validators.relativeTime(referenceNow + offset, referenceNow),
}));
export const namespaceRows = [
  { id: "number", formatted: formatters.number(1234.5, "en"), valid: validators.number(1234.5) },
  { id: "percent", formatted: formatters.percent(0.25, "en"), valid: validators.percent(0.25) },
  {
    id: "date",
    formatted: formatters.date(referenceNow, "en", { timeZone: "UTC" }),
    valid: validators.date(referenceNow),
  },
  {
    id: "money",
    formatted: formatters.money("1234.56", { locale: "en", currency: "BRL" }),
    valid: validators.money("1234.56", { locale: "en", currency: "BRL" }),
  },
  { id: "cpf", formatted: formatters.cpf("52998224725"), valid: validators.cpf("52998224725") },
  {
    id: "cnpj",
    formatted: formatters.cnpj("04252011000110"),
    valid: validators.cnpj("04252011000110"),
  },
  {
    id: "phone",
    formatted: formatters.phone("+5511912345678"),
    valid: validators.phone("+5511912345678"),
  },
  { id: "cep", formatted: formatters.cep("01234567"), valid: validators.cep("01234567") },
  {
    id: "dateOnly",
    formatted: formatters.dateOnly("2024-02-29", "en"),
    valid: validators.dateOnly("2024-02-29"),
  },
  { id: "duration", formatted: formatters.duration(5400, "en"), valid: validators.duration(5400) },
  {
    id: "durationClock",
    formatted: formatters.durationClock(5400),
    valid: validators.duration(5400),
  },
  {
    id: "fileSize",
    formatted: formatters.fileSize(1536, "en", { binary: true }),
    valid: validators.fileSize(1536),
  },
  {
    id: "relativeTime",
    formatted: formatters.relativeTime(referenceNow + 60000, referenceNow, "en"),
    valid: validators.relativeTime(referenceNow + 60000, referenceNow),
  },
];

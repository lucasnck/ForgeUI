export {
  formatNumber as number,
  formatPercent as percent,
  formatDate as date,
} from "../../support/formatting/intl";
export { formatMoney as money } from "./money";
export { formatCpf as cpf, formatCnpj as cnpj } from "./brazilian-documents";
export { formatPhone as phone } from "./phone";
export { formatCep as cep } from "./postal-code";
export { formatDateOnly as dateOnly } from "./date-only";
export { formatDuration as duration, formatDurationClock as durationClock } from "./duration";
export { formatFileSize as fileSize } from "./file-size";
export { formatRelativeTime as relativeTime } from "./relative-time";

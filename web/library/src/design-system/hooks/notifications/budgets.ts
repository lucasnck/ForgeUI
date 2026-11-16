import type { ToastRecord } from "../../types/notifications";

export const NOTIFICATION_BUDGETS = { short: 5000, long: 10000 } as const;

export function notificationBudget(record: ToastRecord): number | null {
  if (record.action !== null && record.action !== undefined && record.action !== false) return null;
  return record.duration === undefined || record.duration === "persistent"
    ? null
    : NOTIFICATION_BUDGETS[record.duration];
}

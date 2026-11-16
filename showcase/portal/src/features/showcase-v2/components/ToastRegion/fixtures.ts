import type { ToastRecord } from "@forge-ui/web";
import { listItems } from "../List/fixtures";

export function makeToast(index: number, dismissLabel: string, timed = false): ToastRecord {
  return {
    id: "item-" + index,
    title: "Title " + index,
    message: "Message " + index,
    dismissLabel,
    duration: timed ? (index === 1 ? "short" : index === 2 ? "long" : "persistent") : "persistent",
    urgency: index === 2 ? "urgent" : "normal",
  };
}

export const toastIndices = listItems.slice(0, 3).map((row) => row.index);

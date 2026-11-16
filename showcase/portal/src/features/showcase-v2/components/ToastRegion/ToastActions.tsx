"use client";
import type { ToastRecord } from "@forge-ui/web";
import { Inline, Button } from "@forge-ui/web";
import { useToastActions } from "./useToastActions";

export function ToastActions({
  record,
  nextRecord,
  onAction,
  producer = false,
}: {
  record: ToastRecord;
  nextRecord: () => ToastRecord;
  onAction: () => void;
  producer?: boolean;
}) {
  const view = useToastActions(record.id, nextRecord, onAction);

  return (
    <Inline gap="2" align="center" justify="end">
      {producer && (
        <Button type="button" appearance="outlined" onClick={view.add}>
          {view.copy.add}
        </Button>
      )}
      <Button type="button" appearance="outlined" onClick={view.action}>
        {view.copy.action}
      </Button>
      <Button type="button" onClick={view.dismiss}>
        {record.dismissLabel}
      </Button>
    </Inline>
  );
}

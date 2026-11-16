"use client";
import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import type { AlertDialogProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "../Dialog/useDialogPreview";
import { initialRecord } from "../Dialog/fixtures";

export function useAlertDialogExample(acknowledgement = false) {
  const binding =
    useExampleProperties<
      Pick<AlertDialogProps, "description" | "open" | "animated" | "animationEffect">
    >("AlertDialog");
  const base = useDialogPreview(
    binding.properties.open,
    binding.bindChange("open", () => undefined),
  );
  const id = useId();
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [confirmations, setConfirmations] = useState(0);

  function show() {
    setChecked(false);
    base.show();
  }

  function request(next: boolean) {
    if (!next) setChecked(false);
    base.request(next);
  }

  function acknowledge(event: ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  function confirm() {
    if (acknowledgement && !checked) return;
    setConfirmed(initialRecord.id);
    setConfirmations((n) => n + 1);
    base.close();
  }

  useExamplePropertySnapshot("AlertDialog", {
    description: "Description",
    open: base.open,
    animated: true,
    animationEffect: "fade",
  });
  return {
    ...base,
    id,
    properties: binding.properties,
    show,
    request,
    checked,
    acknowledge,
    confirm,
    state: {
      ...base.state,
      recordId: initialRecord.id,
      confirmed,
      confirmations,
      ...(acknowledgement ? { checked } : {}),
    },
  };
}

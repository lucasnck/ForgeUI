"use client";
import { useId, useState } from "react";
import { useCollapse } from "@forge-ui/web";
import { useResourceExampleCopy } from "../../ResourceExamples/useResourceExampleCopy";

export function useCollapseResourceExample() {
  const [open, setOpen] = useState(false);
  const [controlled, setControlled] = useState(true);
  const [acceptChanges, setAcceptChanges] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [lastRequest, setLastRequest] = useState<boolean | null>(null);

  function request(next: boolean) {
    setLastRequest(next);
    if (acceptChanges) setOpen(next);
  }

  const collapse = useCollapse({
    id: useId(),
    open: controlled ? open : undefined,
    onOpenChange: request,
    disabled,
  });
  const copy = useResourceExampleCopy();

  return {
    collapse,
    controlled,
    setControlled,
    acceptChanges,
    setAcceptChanges,
    disabled,
    setDisabled,
    lastRequest,
    copy,
  };
}

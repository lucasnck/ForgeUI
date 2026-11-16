"use client";
import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import type { DialogProps, FormProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useDialogPreview } from "./useDialogPreview";
import { initialRecord } from "./fixtures";

export function useDialogExample() {
  const binding =
    useExampleProperties<
      Pick<DialogProps, "open" | "animated" | "animationEffect" | "closeOnOutsideClick" | "title">
    >("Dialog");
  const base = useDialogPreview(
    binding.properties.open,
    binding.bindChange("open", () => undefined),
  );
  const id = useId();
  const [record, setRecord] = useState(initialRecord);
  const [draft, setDraft] = useState(initialRecord.title);
  const [saves, setSaves] = useState(0);

  function show() {
    setDraft(record.title);
    base.show();
  }

  function request(next: boolean) {
    if (!next) setDraft(record.title);
    base.request(next);
  }

  function changeDraft(event: ChangeEvent<HTMLInputElement>) {
    setDraft(event.target.value);
  }

  const save: FormProps["onValidSubmit"] = (data) => {
    const title = String(data.get("Name 1") ?? "");
    setRecord({ ...record, title });
    setSaves((n) => n + 1);
    base.close();
  };

  useExamplePropertySnapshot("Dialog", {
    open: base.open,
    animated: true,
    animationEffect: "fade",
    closeOnOutsideClick: false,
    title: "Title",
  });
  return {
    ...base,
    id,
    properties: binding.properties,
    show,
    request,
    record,
    draft,
    changeDraft,
    save,
    state: { ...base.state, record, draft, saves },
  };
}

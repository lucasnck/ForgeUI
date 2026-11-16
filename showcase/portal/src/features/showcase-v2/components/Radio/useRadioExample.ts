"use client";
import { useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useRadioExample() {
  const id = useId();
  const [value, setValue] = useState("item-1");
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState<FormDataEntryValue | null>(null);
  const [changes, setChanges] = useState(0);

  function change(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
    setChanges((v) => v + 1);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(new FormData(event.currentTarget).get("option"));
  }

  return {
    id,
    value,
    disabled,
    setDisabled,
    submitted,
    changes,
    change,
    submit,
    copy: useResourceExampleCopy(),
  };
}

"use client";
import { useId, useState } from "react";
import type { FormProps } from "@forge-ui/web";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useNativeFormExample() {
  const id = useId();
  const copy = useResourceExampleCopy();
  const [submissions, setSubmissions] = useState(0);
  const [invalid, setInvalid] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [data, setData] = useState<Record<string, FormDataEntryValue>>({});
  const [loading, setLoading] = useState(false);

  const submit: FormProps["onValidSubmit"] = (values) => {
    setData(Object.fromEntries(values));
    setSubmissions((n) => n + 1);
  };

  const onInvalid: NonNullable<FormProps["onInvalidCapture"]> = () => setInvalid((n) => n + 1);

  function cancel() {
    setCancelled((n) => n + 1);
  }

  function reset() {
    setData({});
    setSubmissions(0);
    setInvalid(0);
    setCancelled(0);
  }

  return {
    id,
    copy,
    submit,
    onInvalid,
    cancel,
    reset,
    loading,
    setLoading,
    state: { submissions, invalid, cancelled, formData: data },
  };
}

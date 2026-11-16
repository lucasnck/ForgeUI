"use client";

import type { SubmitEvent } from "react";
import type { FormProps } from "./Form";

export function useForm({
  onValidSubmit,
  onSubmit,
  loading = false,
  loadingLabel,
  children,
  className,
  ...props
}: FormProps) {
  function submit(event: SubmitEvent<HTMLFormElement>) {
    onSubmit?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    if (loading) return;
    const form = event.currentTarget;
    const environment = form.ownerDocument.defaultView;
    if (!environment) return;
    const nativeEvent = event.nativeEvent;
    const submitter =
      nativeEvent instanceof environment.SubmitEvent ? nativeEvent.submitter : undefined;
    onValidSubmit(new environment.FormData(form, submitter ?? undefined), event);
  }

  return { context: { loading, loadingLabel }, children, className, props, submit };
}

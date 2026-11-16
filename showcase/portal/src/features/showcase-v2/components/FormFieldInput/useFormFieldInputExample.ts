"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { FormFieldInputProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";
import { registeredDefaults } from "./fixtures";
import type { RegisteredValues } from "./fixtures";

export function useFormFieldInputExample() {
  const copy = useResourceExampleCopy();
  const { properties } =
    useExampleProperties<
      Pick<
        FormFieldInputProps<RegisteredValues>,
        | "label"
        | "hint"
        | "placeholder"
        | "required"
        | "disabled"
        | "readOnly"
        | "fullWidth"
        | "size"
        | "tone"
        | "appearance"
        | "shape"
      >
    >("FormFieldInput");
  const [visible, setVisible] = useState(true);
  const [saved, setSaved] = useState<RegisteredValues | null>(null);
  const methods = useForm<RegisteredValues>({
    defaultValues: registeredDefaults,
    resolver: zodResolver(
      z.object({
        profile: z.object({
          name: properties.required === false ? z.string() : z.string().trim().min(1, "Required"),
        }),
        conditional: z.string(),
        readOnly: z.string(),
      }),
    ),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
    shouldFocusError: true,
  });
  const submit = methods.handleSubmit((value) => setSaved(value));

  function reset() {
    methods.reset();
    setSaved(null);
    setVisible(true);
  }

  function toggle() {
    setVisible((value) => !value);
  }

  function showError() {
    methods.setError("profile.name", { type: "manual", message: "Error" }, { shouldFocus: true });
  }

  function clearErrors() {
    methods.clearErrors("profile.name");
  }

  useExamplePropertySnapshot("FormFieldInput", {
    label: "Label",
    hint: "Hint",
    placeholder: "Placeholder",
    required: true,
    disabled: false,
    readOnly: false,
    fullWidth: true,
    size: "md",
    tone: "neutral",
    appearance: "outlined",
    shape: "rounded",
  });
  return {
    copy,
    properties,
    methods,
    submit,
    reset,
    toggle,
    visible,
    showError,
    clearErrors,
    state: {
      saved,
      visible,
      shouldUnregister: false,
      dirty: methods.formState.isDirty,
      submitted: methods.formState.isSubmitted,
      error: methods.formState.errors.profile?.name?.message ?? null,
    },
  };
}

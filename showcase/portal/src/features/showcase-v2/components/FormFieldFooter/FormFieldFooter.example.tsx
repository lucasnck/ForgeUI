"use client";
import { useExamplePropertySnapshot as useFormFieldFooterExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseFormFieldFooterProps } from "react";
import { useExampleProperties as useFormFieldFooterExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Stack,
  Input,
  FormField,
  FormFieldHeader,
  FormFieldBody,
  FormFieldFooter,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useFormFieldFooterExample } from "./useFormFieldFooterExample";

export function FormFieldFooterExample() {
  const { properties: formFieldFooterProperties } = useFormFieldFooterPropertyBindings();

  const view = useFormFieldFooterExample();
  const {
    invalid: viewInvalid,
    setInvalid: viewSetInvalid,
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    id: viewId,
    value: viewValue,
    change: viewChange,
    changes: viewChanges,
  } = view;
  useFormFieldFooterPropertySnapshot({
    hint: "Hint",
    error: viewInvalid ? "Error" : undefined,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="error" checked={viewInvalid} onChange={viewSetInvalid} />
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <FormField controlId={viewId} label="Label">
        <FormFieldHeader />
        <FormFieldBody>
          <Input
            name="value"
            placeholder="Placeholder"
            value={viewValue}
            onChange={viewChange}
            disabled={viewDisabled}
            fullWidth
          />
        </FormFieldBody>
        <FormFieldFooter
          hint="Hint"
          error={viewInvalid ? "Error" : undefined}
          {...formFieldFooterProperties}
        />
      </FormField>
      <ResourceState value={{ value: viewValue, onChange: viewChanges }} />
    </Stack>
  );
}

function useFormFieldFooterPropertyBindings() {
  return useFormFieldFooterExampleProperties<
    Pick<ShowcaseFormFieldFooterProps<typeof FormFieldFooter>, "hint" | "error" | "title">
  >("FormFieldFooter");
}

function useFormFieldFooterPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useFormFieldFooterExamplePropertySnapshot("FormFieldFooter", values);
}

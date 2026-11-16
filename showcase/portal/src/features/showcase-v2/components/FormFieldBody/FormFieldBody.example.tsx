"use client";
import type { ComponentProps as ShowcaseFormFieldBodyProps } from "react";
import { useExampleProperties as useFormFieldBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Input, FormField, FormFieldBody } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useFormFieldBodyExample } from "./useFormFieldBodyExample";

export function FormFieldBodyExample() {
  const { properties: formFieldBodyProperties } = useFormFieldBodyPropertyBindings();

  const view = useFormFieldBodyExample();
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

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="error" checked={viewInvalid} onChange={viewSetInvalid} />
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <FormField controlId={viewId} label="Label">
        <FormFieldBody {...formFieldBodyProperties}>
          <Input
            name="value"
            placeholder="Placeholder"
            value={viewValue}
            onChange={viewChange}
            disabled={viewDisabled}
            fullWidth
          />
        </FormFieldBody>
      </FormField>
      <ResourceState value={{ value: viewValue, onChange: viewChanges }} />
    </Stack>
  );
}

function useFormFieldBodyPropertyBindings() {
  return useFormFieldBodyExampleProperties<
    Pick<ShowcaseFormFieldBodyProps<typeof FormFieldBody>, "title">
  >("FormFieldBody");
}

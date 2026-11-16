"use client";
import type { ComponentProps as ShowcaseFormFieldHeaderProps } from "react";
import { useExampleProperties as useFormFieldHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Input, FormField, FormFieldHeader, FormFieldBody } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useFormFieldHeaderExample } from "./useFormFieldHeaderExample";

export function FormFieldHeaderExample() {
  const { properties: formFieldHeaderProperties } = useFormFieldHeaderPropertyBindings();

  const view = useFormFieldHeaderExample();
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
        <FormFieldHeader {...formFieldHeaderProperties}>
          {formFieldHeaderProperties.children === undefined ? (
            <> Children </>
          ) : (
            <>{formFieldHeaderProperties.children}</>
          )}
        </FormFieldHeader>
        <FormFieldBody hidden>
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

function useFormFieldHeaderPropertyBindings() {
  return useFormFieldHeaderExampleProperties<
    Pick<ShowcaseFormFieldHeaderProps<typeof FormFieldHeader>, "children" | "title">
  >("FormFieldHeader");
}

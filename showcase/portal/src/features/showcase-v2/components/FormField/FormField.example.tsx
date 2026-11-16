"use client";
import { useExamplePropertySnapshot as useFormFieldExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseFormFieldProps } from "react";
import { useExampleProperties as useFormFieldExampleProperties } from "../ExampleScope/useExampleScope";
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
import { useFormFieldExample } from "./useFormFieldExample";

export function FormFieldExample() {
  const { properties: formFieldProperties } = useFormFieldPropertyBindings();

  const view = useFormFieldExample();
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
  useFormFieldPropertySnapshot({ controlId: viewId, label: "Label" });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="error" checked={viewInvalid} onChange={viewSetInvalid} />
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <FormField controlId={viewId} label="Label" {...formFieldProperties}>
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
        <FormFieldFooter hint="Hint" error={viewInvalid ? "Error" : undefined} />
      </FormField>
      <ResourceState value={{ value: viewValue, onChange: viewChanges }} />
    </Stack>
  );
}

function useFormFieldPropertyBindings() {
  return useFormFieldExampleProperties<
    Pick<ShowcaseFormFieldProps<typeof FormField>, "controlId" | "label" | "hint" | "error">
  >("FormField");
}

function useFormFieldPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useFormFieldExamplePropertySnapshot("FormField", values);
}

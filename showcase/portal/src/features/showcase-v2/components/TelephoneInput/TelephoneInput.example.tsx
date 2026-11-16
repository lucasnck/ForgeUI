"use client";
import { useExamplePropertySnapshot as useTelephoneInputExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseTelephoneInputProps } from "react";
import { useExampleProperties as useTelephoneInputExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, FormField, TelephoneInput } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useTelephoneInputExample } from "./useTelephoneInputExample";

export function TelephoneInputExample() {
  const { properties: telephoneInputProperties, bindChange: bindTelephoneInputPropertyChange } =
    useTelephoneInputPropertyBindings();

  const view = useTelephoneInputExample();
  const {
    size: viewSize,
    changeSize: viewChangeSize,
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    readOnly: viewReadOnly,
    setReadOnly: viewSetReadOnly,
    invalid: viewInvalid,
    setInvalid: viewSetInvalid,
    fullWidth: viewFullWidth,
    setFullWidth: viewSetFullWidth,
    id: viewId,
    value: viewValue,
    change: viewChange,
    clear: viewClear,
    copy: viewCopy,
    changes: viewChanges,
    lastEvent: viewLastEvent,
  } = view;
  useTelephoneInputPropertySnapshot({
    placeholder: "Placeholder",
    value: viewValue,
    disabled: viewDisabled,
    readOnly: viewReadOnly,
    invalid: viewInvalid,
    size: viewSize,
    fullWidth: viewFullWidth,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="size"
          value={viewSize}
          options={["sm", "md", "lg"]}
          onChange={viewChangeSize}
        />
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
        <ToggleControl label="readOnly" checked={viewReadOnly} onChange={viewSetReadOnly} />
        <ToggleControl label="invalid" checked={viewInvalid} onChange={viewSetInvalid} />
        <ToggleControl label="fullWidth" checked={viewFullWidth} onChange={viewSetFullWidth} />
      </ExampleControls>
      <FormField controlId={viewId} label="Label" hint="Hint">
        <TelephoneInput
          name="value"
          placeholder="Placeholder"
          value={viewValue}
          onChange={bindTelephoneInputPropertyChange("value", viewChange)}
          disabled={viewDisabled}
          readOnly={viewReadOnly}
          invalid={viewInvalid}
          size={viewSize}
          fullWidth={viewFullWidth}
          {...telephoneInputProperties}
        />
      </FormField>
      <Inline justify="end" gap="2">
        <Button variant="outline" onClick={viewClear}>
          {viewCopy.clear}
        </Button>
      </Inline>
      <ResourceState
        value={{
          value: viewValue,
          onChange: viewChanges,
          lastEvent: viewLastEvent,
        }}
      />
    </Stack>
  );
}

function useTelephoneInputPropertyBindings() {
  return useTelephoneInputExampleProperties<
    Pick<
      ShowcaseTelephoneInputProps<typeof TelephoneInput>,
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "fullWidth"
      | "invalid"
      | "title"
      | "placeholder"
      | "value"
      | "checked"
      | "disabled"
      | "readOnly"
    >
  >("TelephoneInput");
}

function useTelephoneInputPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useTelephoneInputExamplePropertySnapshot("TelephoneInput", values);
}

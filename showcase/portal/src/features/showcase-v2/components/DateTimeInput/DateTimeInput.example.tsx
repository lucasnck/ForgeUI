"use client";
import { useExamplePropertySnapshot as useDateTimeInputExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseDateTimeInputProps } from "react";
import { useExampleProperties as useDateTimeInputExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, FormField, DateTimeInput } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useDateTimeInputExample } from "./useDateTimeInputExample";

export function DateTimeInputExample() {
  const { properties: dateTimeInputProperties, bindChange: bindDateTimeInputPropertyChange } =
    useDateTimeInputPropertyBindings();

  const view = useDateTimeInputExample();
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
  useDateTimeInputPropertySnapshot({
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
        <DateTimeInput
          name="value"
          placeholder="Placeholder"
          value={viewValue}
          onChange={bindDateTimeInputPropertyChange("value", viewChange)}
          disabled={viewDisabled}
          readOnly={viewReadOnly}
          invalid={viewInvalid}
          size={viewSize}
          fullWidth={viewFullWidth}
          {...dateTimeInputProperties}
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

function useDateTimeInputPropertyBindings() {
  return useDateTimeInputExampleProperties<
    Pick<
      ShowcaseDateTimeInputProps<typeof DateTimeInput>,
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
  >("DateTimeInput");
}

function useDateTimeInputPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useDateTimeInputExamplePropertySnapshot("DateTimeInput", values);
}

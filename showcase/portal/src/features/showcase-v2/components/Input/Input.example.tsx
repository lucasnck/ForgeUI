"use client";
import { useExamplePropertySnapshot as useInputExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseInputProps } from "react";
import { useExampleProperties as useInputExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, Label, FieldHint, Input } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useInputExample } from "./useInputExample";

export function InputExample() {
  const { properties: inputProperties, bindChange: bindInputPropertyChange } =
    useInputPropertyBindings();

  const view = useInputExample();
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
  useInputPropertySnapshot({
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
      <Stack gap="1">
        <Label htmlFor={viewId}>Label</Label>
        <Input
          id={viewId}
          aria-describedby={`${viewId}-hint`}
          name="value"
          placeholder="Placeholder"
          value={viewValue}
          onChange={bindInputPropertyChange("value", viewChange)}
          disabled={viewDisabled}
          readOnly={viewReadOnly}
          invalid={viewInvalid}
          size={viewSize}
          fullWidth={viewFullWidth}
          {...inputProperties}
        />
      <FieldHint id={`${viewId}-hint`}>Hint</FieldHint>
      </Stack>
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

function useInputPropertyBindings() {
  return useInputExampleProperties<
    Pick<
      ShowcaseInputProps<typeof Input>,
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "fullWidth"
      | "animated"
      | "invalid"
      | "title"
      | "placeholder"
      | "value"
      | "checked"
      | "disabled"
      | "readOnly"
    >
  >("Input");
}

function useInputPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useInputExamplePropertySnapshot("Input", values);
}

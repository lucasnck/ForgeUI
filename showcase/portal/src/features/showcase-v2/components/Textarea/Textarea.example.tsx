"use client";
import { useExamplePropertySnapshot as useTextareaExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseTextareaProps } from "react";
import { useExampleProperties as useTextareaExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, Label, FieldHint, Textarea } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useTextareaExample } from "./useTextareaExample";

export function TextareaExample() {
  const { properties: textareaProperties, bindChange: bindTextareaPropertyChange } =
    useTextareaPropertyBindings();

  const view = useTextareaExample();
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
  useTextareaPropertySnapshot({
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
        <Textarea
          id={viewId}
          aria-describedby={`${viewId}-hint`}
          name="value"
          placeholder="Placeholder"
          value={viewValue}
          onChange={bindTextareaPropertyChange("value", viewChange)}
          disabled={viewDisabled}
          readOnly={viewReadOnly}
          invalid={viewInvalid}
          size={viewSize}
          fullWidth={viewFullWidth}
          {...textareaProperties}
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

function useTextareaPropertyBindings() {
  return useTextareaExampleProperties<
    Pick<
      ShowcaseTextareaProps<typeof Textarea>,
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "fullWidth"
      | "invalid"
      | "animated"
      | "title"
      | "placeholder"
      | "value"
      | "disabled"
      | "readOnly"
    >
  >("Textarea");
}

function useTextareaPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useTextareaExamplePropertySnapshot("Textarea", values);
}

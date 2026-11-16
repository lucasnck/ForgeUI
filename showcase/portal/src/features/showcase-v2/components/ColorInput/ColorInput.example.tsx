"use client";
import { useExamplePropertySnapshot as useColorInputExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseColorInputProps } from "react";
import { useExampleProperties as useColorInputExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, FormField, ColorInput } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useColorInputExample } from "./useColorInputExample";

export function ColorInputExample() {
  const { properties: colorInputProperties, bindChange: bindColorInputPropertyChange } =
    useColorInputPropertyBindings();

  const view = useColorInputExample();
  const {
    size: viewSize,
    changeSize: viewChangeSize,
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
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
  useColorInputPropertySnapshot({
    placeholder: "Placeholder",
    value: viewValue,
    disabled: viewDisabled,
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
        <ToggleControl label="invalid" checked={viewInvalid} onChange={viewSetInvalid} />
        <ToggleControl label="fullWidth" checked={viewFullWidth} onChange={viewSetFullWidth} />
      </ExampleControls>
      <FormField controlId={viewId} label="Label" hint="Hint">
        <ColorInput
          name="value"
          placeholder="Placeholder"
          value={viewValue}
          onChange={bindColorInputPropertyChange("value", viewChange)}
          disabled={viewDisabled}
          invalid={viewInvalid}
          size={viewSize}
          fullWidth={viewFullWidth}
          {...colorInputProperties}
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

function useColorInputPropertyBindings() {
  return useColorInputExampleProperties<
    Pick<
      ShowcaseColorInputProps<typeof ColorInput>,
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
  >("ColorInput");
}

function useColorInputPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useColorInputExamplePropertySnapshot("ColorInput", values);
}

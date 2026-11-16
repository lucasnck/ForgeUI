"use client";
import { useExamplePropertySnapshot as useInputBaseExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseInputBaseProps } from "react";
import { useExampleProperties as useInputBaseExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, FormField, InputBase } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useInputBaseExample } from "./useInputBaseExample";

export function InputBaseExample() {
  const { properties: inputBaseProperties, bindChange: bindInputBasePropertyChange } =
    useInputBasePropertyBindings();

  const view = useInputBaseExample();
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
  useInputBasePropertySnapshot({
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
        <InputBase
          name="value"
          placeholder="Placeholder"
          value={viewValue}
          onChange={bindInputBasePropertyChange("value", viewChange)}
          disabled={viewDisabled}
          readOnly={viewReadOnly}
          invalid={viewInvalid}
          size={viewSize}
          fullWidth={viewFullWidth}
          {...inputBaseProperties}
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

function useInputBasePropertyBindings() {
  return useInputBaseExampleProperties<
    Pick<
      ShowcaseInputBaseProps<typeof InputBase>,
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
  >("InputBase");
}

function useInputBasePropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useInputBaseExamplePropertySnapshot("InputBase", values);
}

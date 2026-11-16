"use client";
import { useExamplePropertySnapshot as usePasswordInputExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcasePasswordInputProps } from "react";
import { useExampleProperties as usePasswordInputExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Button, FormField, PasswordInput } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { usePasswordInputExample } from "./usePasswordInputExample";

export function PasswordInputExample() {
  const { properties: passwordInputProperties, bindChange: bindPasswordInputPropertyChange } =
    usePasswordInputPropertyBindings();

  const view = usePasswordInputExample();
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
  usePasswordInputPropertySnapshot({
    placeholder: "Placeholder",
    value: viewValue,
    disabled: viewDisabled,
    readOnly: viewReadOnly,
    invalid: viewInvalid,
    size: viewSize,
    fullWidth: viewFullWidth,
    revealLabel: "RevealLabel",
    concealLabel: "ConcealLabel",
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
        <PasswordInput
          name="value"
          placeholder="Placeholder"
          value={viewValue}
          onChange={bindPasswordInputPropertyChange("value", viewChange)}
          disabled={viewDisabled}
          readOnly={viewReadOnly}
          invalid={viewInvalid}
          size={viewSize}
          fullWidth={viewFullWidth}
          revealLabel="RevealLabel"
          concealLabel="ConcealLabel"
          {...passwordInputProperties}
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

function usePasswordInputPropertyBindings() {
  return usePasswordInputExampleProperties<
    Pick<
      ShowcasePasswordInputProps<typeof PasswordInput>,
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "fullWidth"
      | "invalid"
      | "revealLabel"
      | "concealLabel"
      | "revealable"
      | "title"
      | "placeholder"
      | "value"
      | "checked"
      | "disabled"
      | "readOnly"
    >
  >("PasswordInput");
}

function usePasswordInputPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  usePasswordInputExamplePropertySnapshot("PasswordInput", values);
}

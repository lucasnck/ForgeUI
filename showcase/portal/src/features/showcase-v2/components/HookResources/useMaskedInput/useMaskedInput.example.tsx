"use client";
import { Input, Label, Stack } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import { useMaskedInputResourceExample } from "./useMaskedInputResourceExample";

export function UseMaskedInputExample() {
  const { id, value, disabled, setDisabled, readOnly, setReadOnly, masked } =
    useMaskedInputResourceExample();
  const {
    inputRef: maskedInputRef,
    displayValue: maskedDisplayValue,
    onChange: maskedOnChange,
    onKeyDown: maskedOnKeyDown,
    inputMode: maskedInputMode,
    maxLength: maskedMaxLength,
    complete: maskedComplete,
  } = masked;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={disabled} onChange={setDisabled} />
        <ToggleControl label="readOnly" checked={readOnly} onChange={setReadOnly} />
      </ExampleControls>
      <Stack gap="1">
        <Label htmlFor={id}>Label</Label>
        <Input
          id={id}
          ref={maskedInputRef}
          value={maskedDisplayValue}
          onChange={maskedOnChange}
          onKeyDown={maskedOnKeyDown}
          inputMode={maskedInputMode}
          maxLength={maskedMaxLength}
          placeholder="Placeholder"
          disabled={disabled}
          readOnly={readOnly}
        />
      </Stack>
      <ResourceState
        value={{
          value,
          displayValue: maskedDisplayValue,
          complete: maskedComplete,
        }}
      />
    </Stack>
  );
}

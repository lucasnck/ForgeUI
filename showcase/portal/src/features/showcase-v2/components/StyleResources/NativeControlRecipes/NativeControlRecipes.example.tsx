"use client";
import { Stack, Input, Select, Textarea, Checkbox, Radio, Label, Inline } from "@forge-ui/web";
import { ExampleControls, ToggleControl, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";

import { useNativeControlRecipesExample } from "./useNativeControlRecipesExample";

export function NativeControlRecipesExample() {
  const view = useNativeControlRecipesExample();
  const {
    size: viewSize,
    changeSize: viewChangeSize,
    tone: viewTone,
    changeTone: viewChangeTone,
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    invalid: viewInvalid,
    setInvalid: viewSetInvalid,
    fullWidth: viewFullWidth,
    setFullWidth: viewSetFullWidth,
    id: viewId,
    value: viewValue,
    change: viewChange,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <SelectControl
          label="size"
          value={viewSize}
          options={["sm", "md", "lg"]}
          onChange={viewChangeSize}
        />
        <SelectControl
          label="tone"
          value={viewTone}
          options={["brand", "success", "danger"]}
          onChange={viewChangeTone}
        />
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
        <ToggleControl label="aria-invalid" checked={viewInvalid} onChange={viewSetInvalid} />
        <ToggleControl label="fullWidth" checked={viewFullWidth} onChange={viewSetFullWidth} />
      </ExampleControls>
      <Label htmlFor={`${viewId}-1`}>Label 1</Label>
      <Input
        size={viewSize}
        tone={viewTone}
        id={`${viewId}-1`}
        placeholder="Placeholder 1"
        value={viewValue}
        onChange={viewChange}
        disabled={viewDisabled}
        aria-invalid={viewInvalid}
        fullWidth={viewFullWidth}
      />
      <Label htmlFor={`${viewId}-2`}>Label 2</Label>
      <Select
        size={viewSize}
        tone={viewTone}
        id={`${viewId}-2`}
        value={viewValue}
        onChange={viewChange}
        disabled={viewDisabled}
        aria-invalid={viewInvalid}
        fullWidth={viewFullWidth}
      >
        <option value="">Children</option>
        <option value="Value 1">Label 1</option>
        <option value="Value 2">Label 2</option>
      </Select>
      <Label htmlFor={`${viewId}-3`}>Label 3</Label>
      <Textarea
        size={viewSize}
        tone={viewTone}
        id={`${viewId}-3`}
        placeholder="Placeholder 3"
        value={viewValue}
        onChange={viewChange}
        disabled={viewDisabled}
        aria-invalid={viewInvalid}
        fullWidth={viewFullWidth}
      />
      <Inline gap="2">
        <Checkbox id={`${viewId}-4`} disabled={viewDisabled} />
        <Label htmlFor={`${viewId}-4`}>Label 4</Label>
        <Radio id={`${viewId}-5`} name={viewId} disabled={viewDisabled} />
        <Label htmlFor={`${viewId}-5`}>Label 5</Label>
      </Inline>
      <ResourceState
        value={{
          size: viewSize,
          tone: viewTone,
          value: viewValue,
          disabled: viewDisabled,
          invalid: viewInvalid,
        }}
      />
    </Stack>
  );
}

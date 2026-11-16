"use client";
import { Checkbox, Radio, Switch, Label, Inline, Stack } from "@forge-ui/web";
import { ExampleControls, ToggleControl, SelectControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";

import { useInteractiveRecipesExample } from "./useInteractiveRecipesExample";

export function InteractiveRecipesExample() {
  const view = useInteractiveRecipesExample();
  const {
    size: viewSize,
    changeSize: viewChangeSize,
    tone: viewTone,
    changeTone: viewChangeTone,
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    id: viewId,
    checked: viewChecked,
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
      </ExampleControls>
      <Inline gap="3">
        <Inline gap="2">
          <Checkbox
            size={viewSize}
            tone={viewTone}
            id={`${viewId}-1`}
            checked={viewChecked}
            onChange={viewChange}
            disabled={viewDisabled}
          />
          <Label htmlFor={`${viewId}-1`}>Label 1</Label>
        </Inline>
        <Inline gap="2">
          <Radio
            size={viewSize}
            tone={viewTone}
            id={`${viewId}-2`}
            name={viewId}
            checked={viewChecked}
            onChange={viewChange}
            disabled={viewDisabled}
          />
          <Label htmlFor={`${viewId}-2`}>Label 2</Label>
        </Inline>
        <Inline gap="2">
          <Switch
            size={viewSize}
            tone={viewTone}
            id={`${viewId}-3`}
            checked={viewChecked}
            onChange={viewChange}
            disabled={viewDisabled}
          />
          <Label htmlFor={`${viewId}-3`}>Label 3</Label>
        </Inline>
      </Inline>
      <ResourceState
        value={{
          size: viewSize,
          tone: viewTone,
          checked: viewChecked,
          disabled: viewDisabled,
        }}
      />
    </Stack>
  );
}

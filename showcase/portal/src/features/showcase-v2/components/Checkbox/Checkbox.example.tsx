"use client";
import { useExamplePropertySnapshot as useCheckboxExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseCheckboxProps } from "react";
import { useExampleProperties as useCheckboxExampleProperties } from "../ExampleScope/useExampleScope";
import { Checkbox, Label, Inline, Stack } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useCheckboxExample } from "./useCheckboxExample";

export function CheckboxExample() {
  const { properties: checkboxProperties, bindChange: bindCheckboxPropertyChange } =
    useCheckboxPropertyBindings();

  const view = useCheckboxExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    size: viewSize,
    changeSize: viewChangeSize,
    tone: viewTone,
    changeTone: viewChangeTone,
    id: viewId,
    checked: viewChecked,
    change: viewChange,
    changes: viewChanges,
  } = view;
  useCheckboxPropertySnapshot({
    checked: viewChecked,
    disabled: viewDisabled,
    size: viewSize,
    tone: viewTone,
  });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
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
      </ExampleControls>
      <Inline gap="2">
        <Checkbox
          id={viewId}
          name="option"
          value="item-1"
          checked={viewChecked}
          onChange={bindCheckboxPropertyChange("checked", viewChange)}
          disabled={viewDisabled}
          size={viewSize}
          tone={viewTone}
          {...checkboxProperties}
        />
        <Label htmlFor={viewId}>Label</Label>
      </Inline>
      <ResourceState value={{ checked: viewChecked, onChange: viewChanges }} />
    </Stack>
  );
}

function useCheckboxPropertyBindings() {
  return useCheckboxExampleProperties<
    Pick<
      ShowcaseCheckboxProps<typeof Checkbox>,
      | "size"
      | "tone"
      | "shape"
      | "fullWidth"
      | "invalid"
      | "animated"
      | "title"
      | "placeholder"
      | "value"
      | "checked"
      | "disabled"
      | "readOnly"
    >
  >("Checkbox");
}

function useCheckboxPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useCheckboxExamplePropertySnapshot("Checkbox", values);
}

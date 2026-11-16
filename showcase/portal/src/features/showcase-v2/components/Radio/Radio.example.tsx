"use client";
import { useExamplePropertySnapshot as useRadioExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseRadioProps } from "react";
import { useExampleProperties as useRadioExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, Inline, Radio, Label, Button } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useRadioExample } from "./useRadioExample";

export function RadioExample() {
  const { properties: radioProperties, bindChange: bindRadioPropertyChange } =
    useRadioPropertyBindings();

  const view = useRadioExample();
  const {
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    submit: viewSubmit,
    id: viewId,
    value: viewValue,
    change: viewChange,
    copy: viewCopy,
    changes: viewChanges,
    submitted: viewSubmitted,
  } = view;
  useRadioPropertySnapshot({ disabled: viewDisabled });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
      </ExampleControls>
      <form onSubmit={viewSubmit}>
        <fieldset>
          <legend>Children</legend>
          <Stack gap="2">
            {[1, 2, 3].map((index) => (
              <Inline gap="2" key={index}>
                <Radio
                  id={`${viewId}-${index}`}
                  name="option"
                  value={`item-${index}`}
                  checked={viewValue === `item-${index}`}
                  onChange={bindRadioPropertyChange("checked", viewChange)}
                  disabled={viewDisabled}
                  {...radioProperties}
                />
                <Label htmlFor={`${viewId}-${index}`}>Label {index}</Label>
              </Inline>
            ))}
            <Inline justify="end">
              <Button type="submit">{viewCopy.save}</Button>
            </Inline>
          </Stack>
        </fieldset>
      </form>
      <ResourceState
        value={{
          value: viewValue,
          onChange: viewChanges,
          formData: viewSubmitted,
        }}
      />
    </Stack>
  );
}

function useRadioPropertyBindings() {
  return useRadioExampleProperties<
    Pick<
      ShowcaseRadioProps<typeof Radio>,
      | "size"
      | "tone"
      | "fullWidth"
      | "animated"
      | "invalid"
      | "title"
      | "placeholder"
      | "checked"
      | "disabled"
      | "readOnly"
    >
  >("Radio");
}

function useRadioPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useRadioExamplePropertySnapshot("Radio", values);
}

"use client";
import {
  RadioGroup,
  ChoiceGroupHeader,
  ChoiceGroupBody,
  RadioGroupItem,
  Stack,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";
import { items } from "../ChoiceGroup/fixtures";
import { useRadioGroupItemExample } from "./useRadioGroupItemExample";

export function RadioGroupItemExample() {
  const view = useRadioGroupItemExample();

  return (
    <Stack gap="4">
      <ToggleControl label="reject onValueChange" checked={view.reject} onChange={view.setReject} />
      <RadioGroup name="Name" value={view.selected} onValueChange={view.change} title="Title">
        <ChoiceGroupHeader>{"Children"}</ChoiceGroupHeader>
        <ChoiceGroupBody>
          <Stack gap="2">
            {items.map((item) => (
              <RadioGroupItem
                key={item.id}
                value={item.id}
                {...view.properties}
                label={`${view.properties.label ?? "Label"} ${item.index}`}
                title={`${view.properties.title ?? "Title"} ${item.index}`}
              />
            ))}
          </Stack>
        </ChoiceGroupBody>
      </RadioGroup>
      <ExampleState
        value={{
          value: view.selected,
          calls: view.calls,
          requested: view.requested,
        }}
      />
    </Stack>
  );
}

"use client";
import {
  RadioGroup,
  ChoiceGroupHeader,
  ChoiceGroupBody,
  ChoiceGroupFooter,
  RadioGroupItem,
  Stack,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { ToggleControl } from "../ExampleControls";
import { items } from "../ChoiceGroup/fixtures";
import { useRadioGroupExample } from "./useRadioGroupExample";

export function RadioGroupExample() {
  const view = useRadioGroupExample();

  return (
    <Stack gap="4">
      <ToggleControl label="reject onValueChange" checked={view.reject} onChange={view.setReject} />
      <RadioGroup
        name="Name"
        value={view.selected}
        onValueChange={view.change}
        title="Title"
        {...view.properties}
      >
        {view.properties.legend ? null : <ChoiceGroupHeader>{"Children"}</ChoiceGroupHeader>}
        <ChoiceGroupBody>
          <Stack gap="2">
            {items.map((item) => (
              <RadioGroupItem key={item.id} value={item.id} label={item.label} title={item.title} />
            ))}
          </Stack>
        </ChoiceGroupBody>
        <ChoiceGroupFooter>{"Children"}</ChoiceGroupFooter>
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

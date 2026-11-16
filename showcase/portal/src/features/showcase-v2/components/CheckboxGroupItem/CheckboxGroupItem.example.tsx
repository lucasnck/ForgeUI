"use client";
import {
  CheckboxGroup,
  ChoiceGroupHeader,
  ChoiceGroupBody,
  CheckboxGroupItem,
  Stack,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { items } from "../ChoiceGroup/fixtures";
import { useCheckboxGroupItemExample } from "./useCheckboxGroupItemExample";

export function CheckboxGroupItemExample() {
  const view = useCheckboxGroupItemExample();

  return (
    <Stack gap="4">
      <CheckboxGroup name="Name" value={view.selected} onValueChange={view.change} title="Title">
        <ChoiceGroupHeader>{"Children"}</ChoiceGroupHeader>
        <ChoiceGroupBody>
          <Stack gap="2">
            {items.map((item) => (
              <CheckboxGroupItem
                key={item.id}
                value={item.id}
                {...view.properties}
                label={`${view.properties.label ?? "Label"} ${item.index}`}
                title={`${view.properties.title ?? "Title"} ${item.index}`}
              />
            ))}
          </Stack>
        </ChoiceGroupBody>
      </CheckboxGroup>
      <ExampleState value={{ value: view.selected, calls: view.calls }} />
    </Stack>
  );
}

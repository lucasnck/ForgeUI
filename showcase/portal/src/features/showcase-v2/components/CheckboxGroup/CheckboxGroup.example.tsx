"use client";
import {
  CheckboxGroup,
  ChoiceGroupHeader,
  ChoiceGroupBody,
  ChoiceGroupFooter,
  CheckboxGroupItem,
  Stack,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { items } from "../ChoiceGroup/fixtures";
import { useCheckboxGroupExample } from "./useCheckboxGroupExample";

export function CheckboxGroupExample() {
  const view = useCheckboxGroupExample();

  return (
    <Stack gap="4">
      <CheckboxGroup
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
              <CheckboxGroupItem
                key={item.id}
                value={item.id}
                label={item.label}
                title={item.title}
              />
            ))}
          </Stack>
        </ChoiceGroupBody>
        <ChoiceGroupFooter>{"Children"}</ChoiceGroupFooter>
      </CheckboxGroup>
      <ExampleState value={{ value: view.selected, calls: view.calls }} />
    </Stack>
  );
}

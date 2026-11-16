"use client";
import {
  ChoiceGroup,
  ChoiceGroupHeader,
  ChoiceGroupBody,
  Checkbox,
  Label,
  Inline,
  Stack,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { items } from "../ChoiceGroup/fixtures";
import { useChoiceGroupBodyExample } from "./useChoiceGroupBodyExample";

export function ChoiceGroupBodyExample() {
  const view = useChoiceGroupBodyExample();

  return (
    <Stack gap="4">
      <ChoiceGroup title="Title">
        <ChoiceGroupHeader>{"Children"}</ChoiceGroupHeader>
        <ChoiceGroupBody {...view.properties}>
          <Stack gap="2">
            {items.map((item) => (
              <Inline key={item.id} gap="2" align="center">
                <Checkbox
                  id={view.id + item.id}
                  name={view.id + "-Name"}
                  value={item.id}
                  checked={view.selected.includes(item.id)}
                  onChange={view.change}
                />
                <Label htmlFor={view.id + item.id}>{item.label}</Label>
              </Inline>
            ))}
          </Stack>
        </ChoiceGroupBody>
      </ChoiceGroup>
      <ExampleState value={{ value: view.selected, calls: view.calls }} />
    </Stack>
  );
}

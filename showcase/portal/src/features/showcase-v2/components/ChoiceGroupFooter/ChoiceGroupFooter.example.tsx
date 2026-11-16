"use client";
import {
  ChoiceGroup,
  ChoiceGroupHeader,
  ChoiceGroupBody,
  ChoiceGroupFooter,
  Checkbox,
  Label,
  Inline,
  Stack,
  FieldHint,
  Button,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { items } from "../ChoiceGroup/fixtures";
import { useChoiceGroupFooterExample } from "./useChoiceGroupFooterExample";

export function ChoiceGroupFooterExample() {
  const view = useChoiceGroupFooterExample();

  return (
    <Stack gap="4">
      <ChoiceGroup title="Title">
        <ChoiceGroupHeader>{"Children"}</ChoiceGroupHeader>
        <ChoiceGroupBody>
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
        <ChoiceGroupFooter {...view.properties}>
          <Inline gap="2" align="center" justify="between">
            <FieldHint>
              {view.properties.children ?? "Children"} · {view.selected.length}
            </FieldHint>
            <Button size="sm" variant="outline" onClick={view.clear}>
              {view.copy.resetSelection}
            </Button>
          </Inline>
        </ChoiceGroupFooter>
      </ChoiceGroup>
      <ExampleState value={{ value: view.selected, calls: view.calls, resets: view.resets }} />
    </Stack>
  );
}

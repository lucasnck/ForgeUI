"use client";
import { LocaleSelector, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useLocaleSelectorExample } from "./useLocaleSelectorExample";

export function LocaleSelectorExample() {
  const view = useLocaleSelectorExample();

  return (
    <Stack gap="4">
      <LocaleSelector
        label="Label"
        options={view.options}
        value={view.value}
        onValueChange={view.change}
        {...view.properties}
      />
      <ExampleState value={view.state} />
    </Stack>
  );
}

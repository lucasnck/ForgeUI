"use client";
import { ThemeSelector, Stack } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useThemeSelectorExample } from "./useThemeSelectorExample";

export function ThemeSelectorExample() {
  const view = useThemeSelectorExample();

  return (
    <Stack gap="4">
      <ThemeSelector
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

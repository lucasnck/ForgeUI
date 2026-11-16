"use client";
import { Combobox, ComboboxBody, Stack, Text } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useComboboxBodyExample } from "./useComboboxBodyExample";

export function ComboboxBodyExample() {
  const view = useComboboxBodyExample();

  return (
    <Stack gap="4">
      <Combobox
        aria-label="Label"
        placeholder="Placeholder"
        options={view.options}
        query={view.query}
        onQueryChange={view.changeQuery}
        selectedValue={view.selectedValue}
        onSelectionChange={view.select}
      >
        <ComboboxBody title="Title" {...view.properties} />
      </Combobox>
      {!view.options.filter((option) => !option.disabled).length && (
        <Text role="status">{view.copy.empty}</Text>
      )}
      <ExampleState value={view.state} />
    </Stack>
  );
}

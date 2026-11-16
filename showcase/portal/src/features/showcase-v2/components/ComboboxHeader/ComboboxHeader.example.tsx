"use client";
import { Combobox, ComboboxHeader, ComboboxBody, Stack, Text } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useComboboxHeaderExample } from "./useComboboxHeaderExample";

export function ComboboxHeaderExample() {
  const view = useComboboxHeaderExample();

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
        <ComboboxHeader title="Title" {...view.properties}>
          {view.properties.children ?? "Children"}
        </ComboboxHeader>
        <ComboboxBody />
      </Combobox>
      {!view.options.filter((option) => !option.disabled).length && (
        <Text role="status">{view.copy.empty}</Text>
      )}
      <ExampleState value={view.state} />
    </Stack>
  );
}

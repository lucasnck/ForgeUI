"use client";
import { Autocomplete, AutocompleteHeader, AutocompleteBody, Stack, Text } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useAutocompleteHeaderExample } from "./useAutocompleteHeaderExample";

export function AutocompleteHeaderExample() {
  const view = useAutocompleteHeaderExample();

  return (
    <Stack gap="4">
      <Autocomplete
        aria-label="Label"
        placeholder="Placeholder"
        options={view.options}
        query={view.query}
        onQueryChange={view.changeQuery}
      >
        <AutocompleteHeader title="Title" {...view.properties}>
          {view.properties.children ?? "Children"}
        </AutocompleteHeader>
        <AutocompleteBody />
      </Autocomplete>
      {!view.options.filter((option) => !option.disabled).length && (
        <Text role="status">{view.copy.empty}</Text>
      )}
      <ExampleState value={view.state} />
    </Stack>
  );
}

"use client";
import { Autocomplete, AutocompleteBody, Stack, Text } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useAutocompleteBodyExample } from "./useAutocompleteBodyExample";

export function AutocompleteBodyExample() {
  const view = useAutocompleteBodyExample();

  return (
    <Stack gap="4">
      <Autocomplete
        aria-label="Label"
        placeholder="Placeholder"
        options={view.options}
        query={view.query}
        onQueryChange={view.changeQuery}
      >
        <AutocompleteBody title="Title" {...view.properties} />
      </Autocomplete>
      {!view.options.filter((option) => !option.disabled).length && (
        <Text role="status">{view.copy.empty}</Text>
      )}
      <ExampleState value={view.state} />
    </Stack>
  );
}

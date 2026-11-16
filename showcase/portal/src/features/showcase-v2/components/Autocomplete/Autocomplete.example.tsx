"use client";
import {
  Autocomplete,
  AutocompleteHeader,
  AutocompleteBody,
  AutocompleteFooter,
  Stack,
  Inline,
  Text,
  Button,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useAutocompleteExample } from "./useAutocompleteExample";

export function AutocompleteExample() {
  const view = useAutocompleteExample();

  return (
    <Stack gap="4">
      <Autocomplete
        aria-label="Label"
        placeholder="Placeholder"
        appearance="outlined"
        shape="rounded"
        {...view.properties}
        options={view.options}
        query={view.query}
        onQueryChange={view.changeQuery}
      >
        <AutocompleteHeader>{"Children"}</AutocompleteHeader>
        <AutocompleteBody />
        <AutocompleteFooter>
          <Inline gap="2" align="center" justify="between">
            <Text>
              {"Children"}: {view.query || "—"}
            </Text>
            <Button type="button" appearance="outlined" onClick={view.clear}>
              {view.copy.clear}
            </Button>
          </Inline>
        </AutocompleteFooter>
      </Autocomplete>
      {!view.options.filter((option) => !option.disabled).length && (
        <Text role="status">{view.copy.empty}</Text>
      )}
      <ExampleState value={view.state} />
    </Stack>
  );
}

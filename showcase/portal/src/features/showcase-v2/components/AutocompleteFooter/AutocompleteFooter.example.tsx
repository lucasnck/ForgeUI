"use client";
import {
  Autocomplete,
  AutocompleteBody,
  AutocompleteFooter,
  Stack,
  Inline,
  Text,
  Button,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useAutocompleteFooterExample } from "./useAutocompleteFooterExample";

export function AutocompleteFooterExample() {
  const view = useAutocompleteFooterExample();

  return (
    <Stack gap="4">
      <Autocomplete
        aria-label="Label"
        placeholder="Placeholder"
        options={view.options}
        query={view.query}
        onQueryChange={view.changeQuery}
      >
        <AutocompleteBody />
        <AutocompleteFooter title="Title" {...view.properties}>
          <Inline gap="2" align="center" justify="between">
            <Text>
              {view.properties.children ?? "Children"}: {view.query || "—"}
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

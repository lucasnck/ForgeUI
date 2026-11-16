"use client";
import { SearchInput, Stack, FormField } from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useSearchInputExample } from "./useSearchInputExample";

export function SearchInputExample() {
  const view = useSearchInputExample();

  return (
    <Stack gap="4">
      <FormField controlId={view.id} label="Label" hint="Hint">
        <SearchInput
          name="Name"
          placeholder="Placeholder"
          title="Title"
          value={view.value}
          onChange={view.change}
          clearLabel="ClearLabel"
          {...view.properties}
        />
      </FormField>
      <ExampleState value={view.state} />
    </Stack>
  );
}

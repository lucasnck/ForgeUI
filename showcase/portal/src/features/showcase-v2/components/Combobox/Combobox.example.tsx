"use client";
import {
  Combobox,
  ComboboxHeader,
  ComboboxBody,
  ComboboxFooter,
  Stack,
  Inline,
  Text,
  Button,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useComboboxExample } from "./useComboboxExample";

export function ComboboxExample() {
  const view = useComboboxExample();

  return (
    <Stack gap="4">
      <Combobox
        aria-label="Label"
        placeholder="Placeholder"
        appearance="outlined"
        shape="rounded"
        {...view.properties}
        options={view.options}
        query={view.query}
        onQueryChange={view.changeQuery}
        selectedValue={view.selectedValue}
        onSelectionChange={view.select}
      >
        <ComboboxHeader>{"Children"}</ComboboxHeader>
        <ComboboxBody />
        <ComboboxFooter>
          <Inline gap="2" align="center" justify="between">
            <Text>
              {"Children"}: {view.selectedValue ?? "—"}
            </Text>
            <Button type="button" appearance="outlined" onClick={view.clear}>
              {view.copy.clear}
            </Button>
          </Inline>
        </ComboboxFooter>
      </Combobox>
      {!view.options.filter((option) => !option.disabled).length && (
        <Text role="status">{view.copy.empty}</Text>
      )}
      <ExampleState value={view.state} />
    </Stack>
  );
}

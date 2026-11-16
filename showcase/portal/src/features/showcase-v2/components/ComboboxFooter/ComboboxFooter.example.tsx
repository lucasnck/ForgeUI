"use client";
import {
  Combobox,
  ComboboxBody,
  ComboboxFooter,
  Stack,
  Inline,
  Text,
  Button,
} from "@forge-ui/web";
import { ExampleState } from "../ExampleState/ExampleState";
import { useComboboxFooterExample } from "./useComboboxFooterExample";

export function ComboboxFooterExample() {
  const view = useComboboxFooterExample();

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
        <ComboboxBody />
        <ComboboxFooter title="Title" {...view.properties}>
          <Inline gap="2" align="center" justify="between">
            <Text>
              {view.properties.children ?? "Children"}: {view.selectedValue ?? "—"}
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

"use client";
import type { ComboboxProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useQueryPreview } from "../Autocomplete/useQueryPreview";

export function useComboboxExample() {
  const { properties, bindChange } =
    useExampleProperties<
      Pick<
        ComboboxProps,
        | "size"
        | "tone"
        | "appearance"
        | "shape"
        | "disabled"
        | "readOnly"
        | "required"
        | "invalid"
        | "fullWidth"
        | "placeholder"
        | "title"
        | "name"
        | "listboxLabel"
        | "query"
      >
    >("Combobox");
  const view = useQueryPreview();
  const query = properties.query ?? view.query;
  const changeQuery = bindChange("query", view.changeQuery);
  useExamplePropertySnapshot("Combobox", {
    size: "md",
    tone: "neutral",
    appearance: "outlined",
    shape: "rounded",
    disabled: false,
    readOnly: false,
    required: false,
    invalid: false,
    fullWidth: true,
    placeholder: "Placeholder",
    title: "Title",
    name: "Name",
    listboxLabel: "ListboxLabel",
    query,
  });
  return {
    ...view,
    clear: () => {
      changeQuery("");
      view.select(null);
    },
    query,
    changeQuery,
    properties,
    options: view.filterQueryOptions(query),
    state: {
      query,
      selectedValue: view.selectedValue,
      selections: view.selections,
      queries: view.queries,
    },
  };
}

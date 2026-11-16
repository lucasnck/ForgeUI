"use client";
import type { ComboboxFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useQueryPreview } from "../Autocomplete/useQueryPreview";

export function useComboboxFooterExample() {
  const { properties, bindChange } =
    useExampleProperties<Pick<ComboboxFooterProps, "children" | "title">>("ComboboxFooter");
  const view = useQueryPreview();
  const query = view.query;
  const changeQuery = bindChange("query", view.changeQuery);
  useExamplePropertySnapshot("ComboboxFooter", {
    children: "Children",
    title: "Title",
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

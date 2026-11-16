"use client";
import type { ComboboxHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useQueryPreview } from "../Autocomplete/useQueryPreview";

export function useComboboxHeaderExample() {
  const { properties, bindChange } =
    useExampleProperties<Pick<ComboboxHeaderProps, "children" | "title">>("ComboboxHeader");
  const view = useQueryPreview();
  const query = view.query;
  const changeQuery = bindChange("query", view.changeQuery);
  useExamplePropertySnapshot("ComboboxHeader", {
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

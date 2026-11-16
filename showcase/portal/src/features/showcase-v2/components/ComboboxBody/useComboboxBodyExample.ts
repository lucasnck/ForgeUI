"use client";
import type { ComboboxBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useQueryPreview } from "../Autocomplete/useQueryPreview";

export function useComboboxBodyExample() {
  const { properties, bindChange } =
    useExampleProperties<Pick<ComboboxBodyProps, "title">>("ComboboxBody");
  const view = useQueryPreview();
  const query = view.query;
  const changeQuery = bindChange("query", view.changeQuery);
  useExamplePropertySnapshot("ComboboxBody", { title: "Title" });
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

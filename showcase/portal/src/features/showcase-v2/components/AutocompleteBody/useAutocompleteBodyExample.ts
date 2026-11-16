"use client";
import type { AutocompleteBodyProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useQueryPreview } from "../Autocomplete/useQueryPreview";

export function useAutocompleteBodyExample() {
  const { properties, bindChange } =
    useExampleProperties<Pick<AutocompleteBodyProps, "title">>("AutocompleteBody");
  const view = useQueryPreview();
  const query = view.query;
  const changeQuery = bindChange("query", view.changeQuery);
  useExamplePropertySnapshot("AutocompleteBody", { title: "Title" });
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
    state: { query, queries: view.queries },
  };
}

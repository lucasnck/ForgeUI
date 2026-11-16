"use client";
import type { AutocompleteHeaderProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useQueryPreview } from "../Autocomplete/useQueryPreview";

export function useAutocompleteHeaderExample() {
  const { properties, bindChange } =
    useExampleProperties<Pick<AutocompleteHeaderProps, "children" | "title">>("AutocompleteHeader");
  const view = useQueryPreview();
  const query = view.query;
  const changeQuery = bindChange("query", view.changeQuery);
  useExamplePropertySnapshot("AutocompleteHeader", {
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
    state: { query, queries: view.queries },
  };
}

"use client";
import type { AutocompleteFooterProps } from "@forge-ui/web";
import { useExampleProperties, useExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import { useQueryPreview } from "../Autocomplete/useQueryPreview";

export function useAutocompleteFooterExample() {
  const { properties, bindChange } =
    useExampleProperties<Pick<AutocompleteFooterProps, "children" | "title">>("AutocompleteFooter");
  const view = useQueryPreview();
  const query = view.query;
  const changeQuery = bindChange("query", view.changeQuery);
  useExamplePropertySnapshot("AutocompleteFooter", {
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

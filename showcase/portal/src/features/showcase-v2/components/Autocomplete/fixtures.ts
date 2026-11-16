import type { ChoiceOption } from "@forge-ui/web";
import { listItems } from "../List/fixtures";
export const queryOptions: readonly ChoiceOption[] = listItems.slice(0, 5).map((row) => ({
  value: row.id,
  label: "Label " + row.index,
  disabled: row.index === 3,
}));

export function filterQueryOptions(query: string) {
  return queryOptions.filter((option) =>
    option.label.toLowerCase().includes(query.trim().toLowerCase()),
  );
}

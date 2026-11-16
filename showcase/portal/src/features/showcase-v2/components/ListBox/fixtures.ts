import type { ListBoxOption } from "@forge-ui/web";
import { listItems } from "../List/fixtures";

export function listBoxOptions(
  label = "Label",
  firstDisabled = false,
  visual: import("@forge-ui/web").VisualProps = {},
): readonly ListBoxOption[] {
  return listItems.slice(0, 5).map((item) => ({
    ...visual,
    value: item.id,
    label: label + " " + item.index,
    disabled: item.index === 2 || (item.index === 1 && firstDisabled),
  }));
}

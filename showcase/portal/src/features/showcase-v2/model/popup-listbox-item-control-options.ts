import type { PopupListboxItemProps } from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const popupItemControlOptions = {
  PopupListboxItem: {
    label: { kind: "text" },
    animated: { kind: "boolean" },
    title: { kind: "text" },
  },
} satisfies { PopupListboxItem: PropertyEditors<PopupListboxItemProps> };

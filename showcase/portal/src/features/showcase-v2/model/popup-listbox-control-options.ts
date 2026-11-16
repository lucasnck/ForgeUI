import type { PopupListboxProps, ChoiceOption } from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const popupListControlOptions = {
  PopupListbox: {
    listboxLabel: { kind: "text" },
    animated: { kind: "boolean" },
    animationEffect: { kind: "select", options: ["none", "fade", "scale"] },
  },
} satisfies { PopupListbox: PropertyEditors<PopupListboxProps<ChoiceOption>> };

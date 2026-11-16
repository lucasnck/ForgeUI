import type {
  NavigationMenuProps,
  NavigationMenuHeaderProps,
  NavigationMenuBodyProps,
  NavigationMenuFooterProps,
  NavigationMenuItemProps,
  NavigationMenuSublistProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const navigationControlOptions = {
  NavigationMenu: { label: { kind: "text" }, title: { kind: "text" } },
  NavigationMenuHeader: { children: { kind: "text" }, title: { kind: "text" } },
  NavigationMenuBody: { title: { kind: "text" } },
  NavigationMenuFooter: { children: { kind: "text" }, title: { kind: "text" } },
  NavigationMenuItem: {
    label: { kind: "text" },
    open: { kind: "boolean" },
    animated: { kind: "boolean" },
    title: { kind: "text" },
  },
  NavigationMenuSublist: { title: { kind: "text" } },
} satisfies {
  NavigationMenu: PropertyEditors<NavigationMenuProps>;
  NavigationMenuHeader: PropertyEditors<NavigationMenuHeaderProps>;
  NavigationMenuBody: PropertyEditors<NavigationMenuBodyProps>;
  NavigationMenuFooter: PropertyEditors<NavigationMenuFooterProps>;
  NavigationMenuItem: PropertyEditors<NavigationMenuItemProps>;
  NavigationMenuSublist: PropertyEditors<NavigationMenuSublistProps>;
};

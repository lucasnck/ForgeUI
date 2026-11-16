import type {
  MenuProps,
  MenuHeaderProps,
  MenuBodyProps,
  MenuFooterProps,
  MenuItemProps,
  DropdownMenuProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const menuControlOptions = {
  Menu: {
    label: { kind: "text" },
    animated: { kind: "boolean" },
    title: { kind: "text" },
  },
  MenuHeader: { children: { kind: "text" }, title: { kind: "text" } },
  MenuBody: { title: { kind: "text" } },
  MenuFooter: { children: { kind: "text" }, title: { kind: "text" } },
  MenuItem: {
    label: { kind: "text" },
    disabled: { kind: "boolean" },
    title: { kind: "text" },
  },
  DropdownMenu: {
    label: { kind: "text" },
    open: { kind: "boolean" },
    disabled: { kind: "boolean" },
    animated: { kind: "boolean" },
    animationEffect: { kind: "select", options: ["none", "fade", "scale"] },
    title: { kind: "text" },
  },
} satisfies {
  Menu: PropertyEditors<MenuProps>;
  MenuHeader: PropertyEditors<MenuHeaderProps>;
  MenuBody: PropertyEditors<MenuBodyProps>;
  MenuFooter: PropertyEditors<MenuFooterProps>;
  MenuItem: PropertyEditors<MenuItemProps>;
  DropdownMenu: PropertyEditors<DropdownMenuProps>;
};

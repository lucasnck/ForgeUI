import type {
  PopoverProps,
  PopoverHeaderProps,
  PopoverBodyProps,
  PopoverFooterProps,
  TooltipProps,
  OverlayPortalProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const popupControlOptions = {
  Popover: {
    triggerLabel: { kind: "text" },
    label: { kind: "text" },
    open: { kind: "boolean" },
    animated: { kind: "boolean" },
    animationEffect: { kind: "select", options: ["none", "fade", "scale"] },
    title: { kind: "text" },
  },
  PopoverHeader: {
    children: { kind: "text" },
    divider: { kind: "boolean" },
    title: { kind: "text" },
  },
  PopoverBody: { children: { kind: "text" }, title: { kind: "text" } },
  PopoverFooter: {
    children: { kind: "text" },
    divider: { kind: "boolean" },
    title: { kind: "text" },
  },
  Tooltip: {
    content: { kind: "text" },
    open: { kind: "boolean" },
    animated: { kind: "boolean" },
  },
  OverlayPortal: { children: { kind: "text" } },
} satisfies {
  Popover: PropertyEditors<PopoverProps>;
  PopoverHeader: PropertyEditors<PopoverHeaderProps>;
  PopoverBody: PropertyEditors<PopoverBodyProps>;
  PopoverFooter: PropertyEditors<PopoverFooterProps>;
  Tooltip: PropertyEditors<TooltipProps>;
  OverlayPortal: PropertyEditors<OverlayPortalProps>;
};

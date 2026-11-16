import type {
  ToastRegionProps,
  ToastProps,
  ToastHeaderProps,
  ToastBodyProps,
  ToastFooterProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const toastControlOptions = {
  ToastRegion: { label: { kind: "text" }, title: { kind: "text" } },
  Toast: {
    animated: { kind: "boolean" },
    animationEffect: { kind: "select", options: ["none", "fade", "scale"] },
    title: { kind: "text" },
  },
  ToastHeader: { children: { kind: "text" }, title: { kind: "text" } },
  ToastBody: { children: { kind: "text" }, title: { kind: "text" } },
  ToastFooter: { children: { kind: "text" }, title: { kind: "text" } },
} satisfies {
  ToastRegion: PropertyEditors<ToastRegionProps>;
  Toast: PropertyEditors<ToastProps>;
  ToastHeader: PropertyEditors<ToastHeaderProps>;
  ToastBody: PropertyEditors<ToastBodyProps>;
  ToastFooter: PropertyEditors<ToastFooterProps>;
};

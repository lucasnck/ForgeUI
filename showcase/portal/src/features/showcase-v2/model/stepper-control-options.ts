import type {
  StepperProps,
  StepperHeaderProps,
  StepperBodyProps,
  StepperFooterProps,
  StepperItemProps,
  StepperPanelProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const stepperControlOptions = {
  Stepper: {
    label: { kind: "text" },
    value: { kind: "select", options: ["item-1", "item-2", "item-3"] },
    title: { kind: "text" },
  },
  StepperHeader: { title: { kind: "text" } },
  StepperBody: { title: { kind: "text" } },
  StepperFooter: { children: { kind: "text" }, title: { kind: "text" } },
  StepperPanel: { children: { kind: "text" }, title: { kind: "text" } },
  StepperItem: {
    label: { kind: "text" },
    status: { kind: "select", options: ["pending", "complete", "error"] },
    statusLabel: { kind: "text" },
    disabled: { kind: "boolean" },
    animated: { kind: "boolean" },
    title: { kind: "text" },
  },
} satisfies {
  Stepper: PropertyEditors<StepperProps>;
  StepperHeader: PropertyEditors<StepperHeaderProps>;
  StepperBody: PropertyEditors<StepperBodyProps>;
  StepperFooter: PropertyEditors<StepperFooterProps>;
  StepperPanel: PropertyEditors<StepperPanelProps>;
  StepperItem: PropertyEditors<StepperItemProps>;
};

import type { SharedElementProps, PageTransitionProps, FormFieldInputProps } from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const remainingControlOptions = {
  SharedElement: {
    animated: { kind: "boolean" },
    title: { kind: "text" },
    name: { kind: "text" },
    children: { kind: "text" },
  },
  PageTransition: { animated: { kind: "boolean" }, title: { kind: "text" } },
  FormFieldInput: {
    label: { kind: "text" },
    hint: { kind: "text" },
    placeholder: { kind: "text" },
    required: { kind: "boolean" },
    disabled: { kind: "boolean" },
    readOnly: { kind: "boolean" },
    fullWidth: { kind: "boolean" },
    size: { kind: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    tone: {
      kind: "select",
      options: ["neutral", "brand", "success", "warning", "danger", "info", "inverse"],
    },
    appearance: {
      kind: "select",
      options: ["solid", "soft", "outlined", "bordered", "ghost", "none"],
    },
    shape: { kind: "select", options: ["square", "rounded", "pill"] },
  },
} satisfies {
  SharedElement: PropertyEditors<SharedElementProps>;
  PageTransition: PropertyEditors<PageTransitionProps>;
  FormFieldInput: PropertyEditors<
    FormFieldInputProps<{
      profile: { name: string };
      conditional: string;
      readOnly: string;
    }>
  >;
};

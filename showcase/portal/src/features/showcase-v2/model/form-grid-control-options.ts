import type {
  FormProps,
  FormHeaderProps,
  FormBodyProps,
  FormFooterProps,
  DataGridCellProps,
  DataGridFooterProps,
} from "@forge-ui/web";
import type { PropertyEditors, PropertySchema } from "../components/ExampleScope/example-store";
const options = {
  Form: {
    loading: { kind: "boolean" },
    loadingLabel: { kind: "text" },
    noValidate: { kind: "boolean" },
    autoComplete: { kind: "select", options: ["on", "off"] },
    name: { kind: "text" },
    title: { kind: "text" },
  },
  FormHeader: { children: { kind: "text" }, title: { kind: "text" } },
  FormBody: { children: { kind: "text" }, title: { kind: "text" } },
  FormFooter: { title: { kind: "text" } },
  DataGridCell: {
    rowHeader: { kind: "boolean" },
    children: { kind: "text" },
    title: { kind: "text" },
  },
  DataGridFooter: { title: { kind: "text" } },
} satisfies {
  Form: PropertyEditors<FormProps>;
  FormHeader: PropertyEditors<FormHeaderProps>;
  FormBody: PropertyEditors<FormBodyProps>;
  FormFooter: PropertyEditors<FormFooterProps>;
  DataGridCell: PropertyEditors<DataGridCellProps>;
  DataGridFooter: PropertyEditors<DataGridFooterProps>;
};
export const formGridControlOptions: Readonly<Record<string, PropertySchema>> = options;

import type {
  DataGridHeaderProps,
  DataGridBodyProps,
  DataGridRowProps,
  DataGridColumnHeaderProps,
  ListBoxProps,
  ListBoxHeaderProps,
  ListBoxBodyProps,
  ListBoxFooterProps,
  ListBoxItemProps,
} from "@forge-ui/web";
import type { PropertyEditors, PropertySchema } from "../components/ExampleScope/example-store";
const options = {
  DataGridHeader: { title: { kind: "text" } },
  DataGridBody: { title: { kind: "text" } },
  DataGridRow: { title: { kind: "text" } },
  DataGridColumnHeader: { label: { kind: "text" } },
  ListBox: {
    label: { kind: "text" },
    selectionMode: { kind: "select", options: ["single", "multiple"] },
    disabled: { kind: "boolean" },
    invalid: { kind: "boolean" },
    animated: { kind: "boolean" },
    name: { kind: "text" },
    title: { kind: "text" },
  },
  ListBoxHeader: { children: { kind: "text" }, title: { kind: "text" } },
  ListBoxBody: { title: { kind: "text" } },
  ListBoxFooter: { title: { kind: "text" } },
  ListBoxItem: {
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
    label: { kind: "text" },
    disabled: { kind: "boolean" },
  },
} satisfies {
  DataGridHeader: PropertyEditors<DataGridHeaderProps>;
  DataGridBody: PropertyEditors<DataGridBodyProps>;
  DataGridRow: PropertyEditors<DataGridRowProps>;
  DataGridColumnHeader: PropertyEditors<DataGridColumnHeaderProps>;
  ListBox: PropertyEditors<ListBoxProps>;
  ListBoxHeader: PropertyEditors<ListBoxHeaderProps>;
  ListBoxBody: PropertyEditors<ListBoxBodyProps>;
  ListBoxFooter: PropertyEditors<ListBoxFooterProps>;
  ListBoxItem: PropertyEditors<ListBoxItemProps>;
};
export const gridListControlOptions: Readonly<Record<string, PropertySchema>> = options;

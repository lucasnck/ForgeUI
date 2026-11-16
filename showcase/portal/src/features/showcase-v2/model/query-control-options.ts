import type {
  AutocompleteProps,
  AutocompleteHeaderProps,
  AutocompleteBodyProps,
  AutocompleteFooterProps,
  ComboboxProps,
  ComboboxHeaderProps,
  ComboboxBodyProps,
  ComboboxFooterProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const queryControlOptions = {
  Autocomplete: {
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
    disabled: { kind: "boolean" },
    readOnly: { kind: "boolean" },
    required: { kind: "boolean" },
    invalid: { kind: "boolean" },
    fullWidth: { kind: "boolean" },
    placeholder: { kind: "text" },
    title: { kind: "text" },
    name: { kind: "text" },
    listboxLabel: { kind: "text" },
    query: { kind: "text" },
  },
  AutocompleteHeader: { children: { kind: "text" }, title: { kind: "text" } },
  AutocompleteBody: { title: { kind: "text" } },
  AutocompleteFooter: { children: { kind: "text" }, title: { kind: "text" } },
  Combobox: {
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
    disabled: { kind: "boolean" },
    readOnly: { kind: "boolean" },
    required: { kind: "boolean" },
    invalid: { kind: "boolean" },
    fullWidth: { kind: "boolean" },
    placeholder: { kind: "text" },
    title: { kind: "text" },
    name: { kind: "text" },
    listboxLabel: { kind: "text" },
    query: { kind: "text" },
  },
  ComboboxHeader: { children: { kind: "text" }, title: { kind: "text" } },
  ComboboxBody: { title: { kind: "text" } },
  ComboboxFooter: { children: { kind: "text" }, title: { kind: "text" } },
} satisfies {
  Autocomplete: PropertyEditors<AutocompleteProps>;
  AutocompleteHeader: PropertyEditors<AutocompleteHeaderProps>;
  AutocompleteBody: PropertyEditors<AutocompleteBodyProps>;
  AutocompleteFooter: PropertyEditors<AutocompleteFooterProps>;
  Combobox: PropertyEditors<ComboboxProps>;
  ComboboxHeader: PropertyEditors<ComboboxHeaderProps>;
  ComboboxBody: PropertyEditors<ComboboxBodyProps>;
  ComboboxFooter: PropertyEditors<ComboboxFooterProps>;
};

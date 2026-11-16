import type {
  ChoiceGroupProps,
  ChoiceGroupHeaderProps,
  ChoiceGroupBodyProps,
  ChoiceGroupFooterProps,
  CheckboxGroupProps,
  CheckboxGroupItemProps,
  RadioGroupProps,
  RadioGroupItemProps,
  TagGroupProps,
  TagGroupItemProps,
  TabsProps,
  TabsHeaderProps,
  TabsBodyProps,
  TabsFooterProps,
  TabProps,
  TabPanelProps,
  ToolbarProps,
  ToolbarItemProps,
  DisclosureProps,
} from "@forge-ui/web";
import type { PropertyEditors, PropertySchema } from "../components/ExampleScope/example-store";
const options = {
  ChoiceGroup: {
    legend: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    gap: {
      kind: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    padding: {
      kind: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    title: {
      kind: "text",
    },
  },
  ChoiceGroupHeader: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
    },
  },
  ChoiceGroupBody: {
    title: {
      kind: "text",
    },
  },
  ChoiceGroupFooter: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
    },
  },
  CheckboxGroup: {
    name: {
      kind: "text",
    },
    legend: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    gap: {
      kind: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    padding: {
      kind: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    title: {
      kind: "text",
    },
  },
  CheckboxGroupItem: {
    label: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
    },
    title: {
      kind: "text",
    },
  },
  RadioGroup: {
    name: {
      kind: "text",
    },
    legend: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
    },
    invalid: {
      kind: "boolean",
    },
    gap: {
      kind: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    padding: {
      kind: "select",
      options: ["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"],
    },
    title: {
      kind: "text",
    },
    value: {
      kind: "select",
      options: ["item-1", "item-2", "item-3"],
    },
  },
  RadioGroupItem: {
    label: {
      kind: "text",
    },
    disabled: {
      kind: "boolean",
    },
    title: {
      kind: "text",
    },
  },
  TagGroup: {
    fullWidth: {
      kind: "boolean",
    },
    title: {
      kind: "text",
    },
  },
  TagGroupItem: {
    title: {
      kind: "text",
    },
  },
  Tabs: {
    label: {
      kind: "text",
    },
    direction: {
      kind: "select",
      options: ["ltr", "rtl"],
    },
    animated: {
      kind: "boolean",
    },
    title: {
      kind: "text",
    },
    value: {
      kind: "select",
      options: ["item-1", "item-2", "item-3"],
    },
  },
  TabsHeader: {
    title: {
      kind: "text",
    },
  },
  TabsBody: {
    title: {
      kind: "text",
    },
  },
  TabsFooter: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
    },
  },
  Tab: {
    attached: { kind: "boolean" },
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
    disabled: {
      kind: "boolean",
    },
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
    },
  },
  TabPanel: {
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
    },
  },
  Toolbar: {
    label: {
      kind: "text",
    },
    orientation: {
      kind: "select",
      options: ["horizontal", "vertical"],
    },
    direction: {
      kind: "select",
      options: ["ltr", "rtl"],
    },
    title: {
      kind: "text",
    },
  },
  ToolbarItem: {
    disabled: {
      kind: "boolean",
    },
    animated: {
      kind: "boolean",
    },
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
    },
  },
  Disclosure: {
    label: {
      kind: "text",
    },
    open: {
      kind: "boolean",
    },
    disabled: {
      kind: "boolean",
    },
    animated: {
      kind: "boolean",
    },
    title: {
      kind: "text",
    },
    children: {
      kind: "text",
    },
  },
} satisfies {
  ChoiceGroup: PropertyEditors<ChoiceGroupProps>;
  ChoiceGroupHeader: PropertyEditors<ChoiceGroupHeaderProps>;
  ChoiceGroupBody: PropertyEditors<ChoiceGroupBodyProps>;
  ChoiceGroupFooter: PropertyEditors<ChoiceGroupFooterProps>;
  CheckboxGroup: PropertyEditors<CheckboxGroupProps>;
  CheckboxGroupItem: PropertyEditors<CheckboxGroupItemProps>;
  RadioGroup: PropertyEditors<RadioGroupProps>;
  RadioGroupItem: PropertyEditors<RadioGroupItemProps>;
  TagGroup: PropertyEditors<TagGroupProps>;
  TagGroupItem: PropertyEditors<TagGroupItemProps>;
  Tabs: PropertyEditors<TabsProps>;
  TabsHeader: PropertyEditors<TabsHeaderProps>;
  TabsBody: PropertyEditors<TabsBodyProps>;
  TabsFooter: PropertyEditors<TabsFooterProps>;
  Tab: PropertyEditors<TabProps>;
  TabPanel: PropertyEditors<TabPanelProps>;
  Toolbar: PropertyEditors<ToolbarProps>;
  ToolbarItem: PropertyEditors<ToolbarItemProps>;
  Disclosure: PropertyEditors<DisclosureProps>;
};
export const collectionControlOptions: Readonly<Record<string, PropertySchema>> = options;

import type {
  ODataFilterProps,
  ODataFilterConditionProps,
  ODataFilterGroupProps,
  ODataFilterValueProps,
} from "@forge-ui/web";
import type { PropertyEditors } from "../components/ExampleScope/example-store";
export const odataControlOptions = {
  ODataFilter: {
    mode: { kind: "select", options: ["simple", "advanced"] },
    disabled: { kind: "boolean" },
    title: { kind: "text" },
  },
  ODataFilterCondition: {
    simple: { kind: "boolean" },
    disabled: { kind: "boolean" },
    title: { kind: "text" },
  },
  ODataFilterGroup: {
    value: { kind: "select", options: ["and", "or"] },
    label: { kind: "text" },
    disabled: { kind: "boolean" },
    title: { kind: "text" },
  },
  ODataFilterValue: {
    operator: {
      kind: "select",
      options: ["eq", "ne", "contains", "startswith", "endswith"],
    },
    label: { kind: "text" },
    disabled: { kind: "boolean" },
    invalid: { kind: "boolean" },
  },
} satisfies {
  ODataFilter: PropertyEditors<ODataFilterProps>;
  ODataFilterCondition: PropertyEditors<ODataFilterConditionProps>;
  ODataFilterGroup: PropertyEditors<ODataFilterGroupProps>;
  ODataFilterValue: PropertyEditors<ODataFilterValueProps>;
};

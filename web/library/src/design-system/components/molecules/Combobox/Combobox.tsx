"use client";

import type { NativeQueryInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";
import type { ComponentPopupProps } from "../../../types/popup";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import type { ChoiceOption } from "../../../types/selection-navigation";
import type { QueryInputContextValue } from "../../../internal/query-input/QueryInputContext";
import { ComboboxContext } from "../../../internal/combobox/ComboboxContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { ComboboxHeader } from "../../atoms/ComboboxHeader";
import { ComboboxBody } from "../ComboboxBody";
import { ComboboxFooter } from "../../atoms/ComboboxFooter";
import { useCombobox } from "./useCombobox";
import styles from "./Combobox.module.css";

export interface ComboboxProps
  extends
    NativeQueryInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps,
    ComponentPopupProps,
    ComponentChildrenProps {
  options: readonly ChoiceOption[];
  query: string;
  onQueryChange(query: string): void;
  selectedValue: string | null;
  onSelectionChange(value: string | null): void;
}

export function Combobox(input: ComboboxProps) {
  const { children, ...view } = useCombobox(input);
  const parts = collectCompoundParts(
    children,
    { header: ComboboxHeader, body: ComboboxBody, footer: ComboboxFooter },
    ["body"],
  );
  const describedBy =
    [
      ...new Set([
        ...(view.inputProps["aria-describedby"]?.split(/\s+/).filter(Boolean) ?? []),
        ...(parts.footer ? [view.footerId] : []),
      ]),
    ].join(" ") || undefined;
  const context: QueryInputContextValue = {
    ...view,
    inputProps: {
      ...view.inputProps,
      "aria-describedby": describedBy,
      "aria-label": parts.header ? undefined : view.inputProps["aria-label"],
    },
  };

  return (
    <ComboboxContext value={context}>
      <div className={styles.root} data-gap="2">
        {parts.header}
        {parts.body}
        {parts.footer}
      </div>
    </ComboboxContext>
  );
}

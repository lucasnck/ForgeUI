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
import { AutocompleteContext } from "../../../internal/autocomplete/AutocompleteContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { AutocompleteHeader } from "../../atoms/AutocompleteHeader";
import { AutocompleteBody } from "../AutocompleteBody";
import { AutocompleteFooter } from "../../atoms/AutocompleteFooter";
import { useAutocomplete } from "./useAutocomplete";
import styles from "./Autocomplete.module.css";

export interface AutocompleteProps
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
}

export function Autocomplete(input: AutocompleteProps) {
  const { children, ...view } = useAutocomplete(input);
  const parts = collectCompoundParts(
    children,
    { header: AutocompleteHeader, body: AutocompleteBody, footer: AutocompleteFooter },
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
    <AutocompleteContext value={context}>
      <div className={styles.root} data-gap="2">
        {parts.header}
        {parts.body}
        {parts.footer}
      </div>
    </AutocompleteContext>
  );
}

"use client";
import type {
  NativeSectionRootProps,
  ComponentChildrenProps,
  ComponentSelectionProps,
  ComponentInvalidProps,
  ComponentAnimatedProps,
  ListBoxOption,
  SelectionMode,
} from "../../../types";
import { ListBoxContext } from "../../../internal/listbox/ListBoxContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { ListBoxHeader } from "../../atoms/ListBoxHeader";
import { ListBoxBody } from "../../molecules/ListBoxBody";
import { ListBoxFooter } from "../../atoms/ListBoxFooter";
import { useListBox } from "./useListBox";
import styles from "./ListBox.module.css";
export interface ListBoxProps
  extends
    NativeSectionRootProps,
    ComponentChildrenProps,
    ComponentSelectionProps<readonly string[]>,
    ComponentInvalidProps,
    ComponentAnimatedProps {
  label: string;
  options: readonly ListBoxOption[];
  selectionMode?: SelectionMode;
  disabled?: boolean;
  name?: string;
  form?: string;
}

export function ListBox(input: ListBoxProps) {
  const { props, children, className, context, selected, name, form, disabled, formControlRef } =
    useListBox(input);
  const parts = collectCompoundParts(
    children,
    { header: ListBoxHeader, body: ListBoxBody, footer: ListBoxFooter },
    ["body"],
  );

  return (
    <ListBoxContext value={context}>
      <section
        {...props}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-gap="2"
      >
        {parts.header}
        {parts.body}
        {parts.footer}
        {name && (
          <>
            <input ref={formControlRef} type="hidden" disabled form={form} />
            {selected.map((key) => (
              <input
                key={key}
                type="hidden"
                disabled={disabled}
                name={name}
                form={form}
                value={key}
              />
            ))}
          </>
        )}
      </section>
    </ListBoxContext>
  );
}

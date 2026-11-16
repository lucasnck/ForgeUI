"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { ListContext } from "../../../internal/list/ListContext";
import { ListHeader } from "../../atoms/ListHeader";
import { ListBody } from "../../atoms/ListBody";
import { ListFooter } from "../../atoms/ListFooter";
import { useList } from "./useList";
import styles from "./List.module.css";

export interface ListProps extends NativeSectionRootProps, ComponentChildrenProps {
  label?: string;
}

export function List(props: ListProps) {
  const view = useList(props);
  const parts = collectCompoundParts(
    view.children,
    { header: ListHeader, body: ListBody, footer: ListFooter },
    ["body"],
  );

  return (
    <ListContext value={{ titleId: parts.header ? view.titleId : undefined, label: view.label }}>
      <section
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        data-gap="2"
        aria-labelledby={parts.header ? view.titleId : undefined}
        aria-label={parts.header ? undefined : view.label}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </section>
    </ListContext>
  );
}

"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { EmptyStateContext } from "../../../internal/emptystate/EmptyStateContext";
import { EmptyStateHeader } from "../../atoms/EmptyStateHeader";
import { EmptyStateBody } from "../../atoms/EmptyStateBody";
import { EmptyStateFooter } from "../../atoms/EmptyStateFooter";
import { useEmptyState } from "./useEmptyState";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps extends NativeSectionRootProps, ComponentChildrenProps {}

export function EmptyState(props: EmptyStateProps) {
  const view = useEmptyState(props);
  const parts = collectCompoundParts(
    view.children,
    { header: EmptyStateHeader, body: EmptyStateBody, footer: EmptyStateFooter },
    ["body"],
  );

  return (
    <EmptyStateContext value={{ titleId: parts.header ? view.titleId : undefined }}>
      <section
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        data-gap="2"
        aria-labelledby={parts.header ? view.titleId : undefined}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </section>
    </EmptyStateContext>
  );
}

"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { ErrorStateContext } from "../../../internal/errorstate/ErrorStateContext";
import { ErrorStateHeader } from "../../atoms/ErrorStateHeader";
import { ErrorStateBody } from "../../atoms/ErrorStateBody";
import { ErrorStateFooter } from "../../atoms/ErrorStateFooter";
import type { AnnouncementPoliteness } from "../../../types/collection-contracts";
import { useErrorState } from "./useErrorState";
import styles from "./ErrorState.module.css";

export interface ErrorStateProps extends NativeSectionRootProps, ComponentChildrenProps {
  announcement?: AnnouncementPoliteness;
}

export function ErrorState(props: ErrorStateProps) {
  const view = useErrorState(props);
  const parts = collectCompoundParts(
    view.children,
    { header: ErrorStateHeader, body: ErrorStateBody, footer: ErrorStateFooter },
    ["body"],
  );

  return (
    <ErrorStateContext
      value={{ titleId: parts.header ? view.titleId : undefined, announcement: view.announcement }}
    >
      <section
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        data-gap="2"
        role={undefined}
        aria-live={undefined}
        aria-atomic={undefined}
        aria-labelledby={parts.header ? view.titleId : undefined}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </section>
    </ErrorStateContext>
  );
}

"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { LoadingStateContext } from "../../../internal/loadingstate/LoadingStateContext";
import { LoadingStateHeader } from "../../atoms/LoadingStateHeader";
import { LoadingStateBody } from "../../molecules/LoadingStateBody";
import { LoadingStateFooter } from "../../atoms/LoadingStateFooter";
import { useLoadingState } from "./useLoadingState";
import styles from "./LoadingState.module.css";

export interface LoadingStateProps extends NativeSectionRootProps, ComponentChildrenProps {
  label: string;
}

export function LoadingState(props: LoadingStateProps) {
  const view = useLoadingState(props);
  const parts = collectCompoundParts(
    view.children,
    { header: LoadingStateHeader, body: LoadingStateBody, footer: LoadingStateFooter },
    ["body"],
  );

  return (
    <LoadingStateContext
      value={{ titleId: parts.header ? view.titleId : undefined, label: view.label }}
    >
      <section
        {...view.props}
        className={[styles.root, view.className].filter(Boolean).join(" ")}
        data-gap="2"
        aria-busy={undefined}
        aria-live={undefined}
        role={undefined}
        aria-labelledby={parts.header ? view.titleId : undefined}
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </section>
    </LoadingStateContext>
  );
}

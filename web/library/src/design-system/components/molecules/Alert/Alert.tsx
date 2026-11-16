"use client";

import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import { collectCompoundParts } from "../../../helpers/compound";
import { AlertContext } from "../../../internal/alert/AlertContext";
import { AlertHeader } from "../../atoms/AlertHeader";
import { AlertBody } from "../../atoms/AlertBody";
import { AlertFooter } from "../../atoms/AlertFooter";
import type { AnnouncementPoliteness } from "../../../types/collection-contracts";
import { useAlert } from "./useAlert";
import styles from "./Alert.module.css";

export interface AlertProps extends NativeSectionRootProps, ComponentChildrenProps {
  announcement?: AnnouncementPoliteness;
}

export function Alert(props: AlertProps) {
  const view = useAlert(props);
  const parts = collectCompoundParts(
    view.children,
    { header: AlertHeader, body: AlertBody, footer: AlertFooter },
    ["body"],
  );

  return (
    <AlertContext
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
    </AlertContext>
  );
}

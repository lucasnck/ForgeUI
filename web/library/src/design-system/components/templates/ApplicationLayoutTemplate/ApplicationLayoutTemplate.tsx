import { createElement, type ReactNode } from "react";
import type { ComponentChildrenProps, NativeSectionRootProps } from "../../../types";
import { ApplicationLayoutHeader } from "../../atoms/ApplicationLayoutHeader";
import { ApplicationLayoutBody } from "../../atoms/ApplicationLayoutBody";
import { ApplicationLayoutFooter } from "../../atoms/ApplicationLayoutFooter";
import styles from "./ApplicationLayoutTemplate.module.css";

export interface ApplicationLayoutTemplateProps
  extends NativeSectionRootProps, ComponentChildrenProps {
  mainId?: string;
  header?: ReactNode;
  navigation?: ReactNode;
  toolbar?: ReactNode;
  footer?: ReactNode;
}

export function ApplicationLayoutTemplate({
  children,
  mainId = "main-content",
  header,
  navigation,
  toolbar,
  footer,
  className,
  ...props
}: ApplicationLayoutTemplateProps) {
  const hasHeader =
    header !== undefined && header !== null && typeof header !== "boolean" && header !== "";
  const hasFooter =
    footer !== undefined && footer !== null && typeof footer !== "boolean" && footer !== "";

  return createElement(
    "div",
    {
      ...props,
      className: [styles.root, className].filter(Boolean).join(" "),
      "data-gap": "2",
    },
    hasHeader ? <ApplicationLayoutHeader>{header}</ApplicationLayoutHeader> : null,
    navigation,
    toolbar,
    <ApplicationLayoutBody id={mainId}>{children}</ApplicationLayoutBody>,
    hasFooter ? <ApplicationLayoutFooter>{footer}</ApplicationLayoutFooter> : null,
  );
}

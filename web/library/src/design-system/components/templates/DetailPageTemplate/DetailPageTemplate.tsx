import type { ReactNode } from "react";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PageHeader, type PageHeaderContentProps } from "../../molecules/PageHeader";
import { Stack } from "../../atoms/Stack";
import styles from "./DetailPageTemplate.module.css";

export interface DetailPageTemplateProps extends NativeSectionRootProps, PageHeaderContentProps {
  children: ReactNode;
  aside?: ReactNode;
}

export function DetailPageTemplate({
  titleId,
  pageTitle,
  description,
  identity,
  breadcrumb,
  actions,
  divider,
  children,
  className,
  aside,
  ...props
}: DetailPageTemplateProps) {
  const hasAside =
    aside !== undefined && aside !== null && typeof aside !== "boolean" && aside !== "";

  return (
    <Stack
      as="section"
      padding="3"
      gap="3"
      {...props}
      aria-labelledby={titleId}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      <PageHeader
        titleId={titleId}
        pageTitle={pageTitle}
        description={description}
        identity={identity}
        breadcrumb={breadcrumb}
        actions={actions}
        divider={divider}
      />
      <div className={styles.layout}>
        <div className={styles.results}>{children}</div>
        {hasAside && <div className={styles.aside}>{aside}</div>}
      </div>
    </Stack>
  );
}

import type { ReactNode } from "react";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PageHeader, type PageHeaderContentProps } from "../../molecules/PageHeader";
import { Stack } from "../../atoms/Stack";
import styles from "./HomePageTemplate.module.css";
export interface HomePageTemplateProps extends NativeSectionRootProps, PageHeaderContentProps {
  children: ReactNode;
  quickActions?: ReactNode;
  summary?: ReactNode;
}

export function HomePageTemplate({
  titleId,
  pageTitle,
  description,
  identity,
  breadcrumb,
  actions,
  divider,
  children,
  className,
  quickActions,
  summary,
  ...props
}: HomePageTemplateProps) {
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

      {quickActions !== undefined &&
        quickActions !== null &&
        quickActions !== false &&
        quickActions !== true &&
        quickActions !== "" && <div className={styles.content}>{quickActions}</div>}

      {summary !== undefined &&
        summary !== null &&
        summary !== false &&
        summary !== true &&
        summary !== "" && <div className={styles.content}>{summary}</div>}

      <div className={styles.content}>{children}</div>
    </Stack>
  );
}

import type { ReactNode } from "react";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PageHeader, type PageHeaderContentProps } from "../../molecules/PageHeader";
import { Stack } from "../../atoms/Stack";
import styles from "./ListPageTemplate.module.css";
export interface ListPageTemplateProps extends NativeSectionRootProps, PageHeaderContentProps {
  children: ReactNode;
  filters?: ReactNode;
  pagination?: ReactNode;
}

export function ListPageTemplate({
  titleId,
  pageTitle,
  description,
  identity,
  breadcrumb,
  actions,
  divider,
  children,
  className,
  filters,
  pagination,
  ...props
}: ListPageTemplateProps) {
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
        {filters !== undefined &&
          filters !== null &&
          filters !== false &&
          filters !== true &&
          filters !== "" && <div className={styles.aside}>{filters}</div>}
        <Stack gap="2" className={styles.results}>
          <div className={styles.content}>{children}</div>
          {pagination !== undefined &&
            pagination !== null &&
            pagination !== false &&
            pagination !== true &&
            pagination !== "" && <div className={styles.content}>{pagination}</div>}
        </Stack>
      </div>
    </Stack>
  );
}

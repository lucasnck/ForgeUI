import type { ReactNode } from "react";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PageHeader, type PageHeaderContentProps } from "../../molecules/PageHeader";
import { Stack } from "../../atoms/Stack";
import styles from "./FormPageTemplate.module.css";

export interface FormPageTemplateProps extends NativeSectionRootProps, PageHeaderContentProps {
  children: ReactNode;
  notice?: ReactNode;
}

export function FormPageTemplate({
  titleId,
  pageTitle,
  description,
  identity,
  breadcrumb,
  actions,
  divider,
  children,
  className,
  notice,
  ...props
}: FormPageTemplateProps) {
  const hasNotice =
    notice !== undefined && notice !== null && typeof notice !== "boolean" && notice !== "";

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
      {hasNotice && <div className={styles.content}>{notice}</div>}
      <div className={styles.content}>{children}</div>
    </Stack>
  );
}

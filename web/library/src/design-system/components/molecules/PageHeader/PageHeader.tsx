import type { ComponentPropsWithRef, ReactNode } from "react";
import { Heading } from "../../atoms/Heading";
import { Text } from "../../atoms/Text";
import { Divider } from "../../atoms/Divider";
import { Inline } from "../../atoms/Inline";
import { Stack } from "../../atoms/Stack";
import styles from "./PageHeader.module.css";
export interface PageHeaderContentProps {
  titleId: string;
  pageTitle: ReactNode;
  description?: ReactNode;
  identity?: ReactNode;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
  divider?: boolean;
}
export interface PageHeaderProps extends ComponentPropsWithRef<"header">, PageHeaderContentProps {
  children?: never;
}

export function PageHeader({
  titleId,
  pageTitle,
  description,
  identity,
  breadcrumb,
  actions,
  divider = false,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <Stack
      as="header"
      gap="2"
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {breadcrumb}
      <Inline gap="3" align="center">
        <Inline gap="2" align="center" wrap={false} className={styles.heading}>
          {identity}
          <Stack gap="1" className={styles.content}>
            <Heading level={1} size="xl" id={titleId} tabIndex={-1}>
              {pageTitle}
            </Heading>
            {description !== undefined &&
              description !== null &&
              description !== false &&
              description !== true &&
              description !== "" && <Text as="p">{description}</Text>}
          </Stack>
        </Inline>
        {actions !== undefined &&
          actions !== null &&
          actions !== false &&
          actions !== true &&
          actions !== "" && (
            <Inline gap="2" align="center" className={styles.actions}>
              {actions}
            </Inline>
          )}
      </Inline>
      {divider && <Divider />}
    </Stack>
  );
}

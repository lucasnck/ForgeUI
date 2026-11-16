import type { NativeCollectionItemProps } from "../../../types/compound-composition";
import { Link } from "../Link";
import styles from "./BreadcrumbItem.module.css";

export interface BreadcrumbItemProps extends NativeCollectionItemProps {
  current?: boolean;
  href?: string;
}

export function BreadcrumbItem({
  children,
  className,
  current = false,
  href,
  ...props
}: BreadcrumbItemProps) {
  if (!current && !href?.trim())
    throw new Error("Ancestor BreadcrumbItem requires a nonempty href.");
  return (
    <li
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-current={undefined}
      aria-selected={undefined}
      tabIndex={undefined}
      role={undefined}
    >
      {current ? <span aria-current="page">{children}</span> : <Link href={href}>{children}</Link>}
    </li>
  );
}

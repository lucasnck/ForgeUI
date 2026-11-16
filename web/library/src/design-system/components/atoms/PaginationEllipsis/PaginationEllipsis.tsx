import type { NativePaginationEllipsisProps } from "../../../types/compound-composition";
import styles from "./PaginationEllipsis.module.css";

export interface PaginationEllipsisProps extends NativePaginationEllipsisProps {}

export function PaginationEllipsis({
  id,
  className,
  style,
  title,
  hidden,
  dir,
  lang,
  ref,
}: PaginationEllipsisProps) {
  return (
    <span
      id={id}
      style={style}
      title={title}
      hidden={hidden}
      dir={dir}
      lang={lang}
      ref={ref}
      aria-hidden="true"
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      …
    </span>
  );
}

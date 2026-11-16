import type { AnchorHTMLAttributes } from "react";
import styles from "./Link.module.css";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export function Link({ className, ...props }: LinkProps) {
  return <a {...props} className={[styles.root, className].filter(Boolean).join(" ")} />;
}

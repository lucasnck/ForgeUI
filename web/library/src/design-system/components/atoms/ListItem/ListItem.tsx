import type { NativeCollectionItemProps } from "../../../types/compound-composition";
import styles from "./ListItem.module.css";

export interface ListItemProps extends NativeCollectionItemProps {}

export function ListItem({ children, className, ...props }: ListItemProps) {
  return (
    <li {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {children}
    </li>
  );
}

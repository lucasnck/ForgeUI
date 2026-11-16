import type { NativeTagGroupItemProps } from "../../../types/compound-composition";
import { Tag, type TagProps } from "../Tag";
import styles from "./TagGroupItem.module.css";

export interface TagGroupItemProps extends NativeTagGroupItemProps {
  tag: TagProps;
}

export function TagGroupItem({ className, tag, ...props }: TagGroupItemProps) {
  return (
    <li {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      <Tag {...tag} />
    </li>
  );
}

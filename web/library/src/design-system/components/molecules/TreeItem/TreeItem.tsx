"use client";
import type { NativeTreeItemProps, TreeNodeDescriptor } from "../../../types";
import { Text } from "../../atoms/Text";
import { TreeGroup } from "../TreeGroup";
import { useTreeItem } from "./useTreeItem";
import styles from "./TreeItem.module.css";
export interface TreeItemProps extends NativeTreeItemProps {
  node: TreeNodeDescriptor;
  level?: number;
  position?: number;
  siblingCount?: number;
}

export function TreeItem(input: TreeItemProps) {
  const {
    props,
    className,
    node,
    level,
    position,
    siblingCount,
    itemRef,
    selected,
    branch,
    expanded,
    tabIndex,
    animated,
    handleFocus,
    handleClick,
    handleKeyDown,
    handlePointerDown,
  } = useTreeItem(input);

  return (
    <li
      {...props}
      ref={itemRef}
      role="treeitem"
      aria-label={node.label}
      aria-disabled={!!node.disabled}
      aria-level={level}
      aria-posinset={position}
      aria-setsize={siblingCount}
      aria-selected={selected}
      aria-expanded={branch ? expanded : undefined}
      tabIndex={tabIndex}
      data-selected={selected || undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
      onFocus={handleFocus}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
    >
      <Text
        as="span"
        className={styles.label}
        data-animated={animated}
        weight={selected ? "semibold" : undefined}
      >
        {node.label}
      </Text>
      {branch && <TreeGroup parentKey={node.key} nodes={node.children!} level={(level ?? 1) + 1} />}
    </li>
  );
}

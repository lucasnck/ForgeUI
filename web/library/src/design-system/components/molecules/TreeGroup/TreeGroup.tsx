"use client";
import type { NativeCollectionListProps, TreeNodeDescriptor } from "../../../types";
import { TreeItem } from "../TreeItem";
import { useTreeGroup } from "./useTreeGroup";
import styles from "./TreeGroup.module.css";
export interface TreeGroupProps extends NativeCollectionListProps {
  parentKey: string;
  nodes: readonly TreeNodeDescriptor[];
  level: number;
}

export function TreeGroup(input: TreeGroupProps) {
  const { props, className, nodes, level, hidden } = useTreeGroup(input);

  return (
    <ul
      {...props}
      role="group"
      hidden={hidden}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {nodes.map((node, index) => (
        <TreeItem
          key={node.key}
          node={node}
          level={level}
          position={index + 1}
          siblingCount={nodes.length}
        />
      ))}
    </ul>
  );
}

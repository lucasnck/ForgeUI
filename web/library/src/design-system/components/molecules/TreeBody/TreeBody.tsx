"use client";
import type { NativeCollectionListProps } from "../../../types";
import { TreeItem } from "../TreeItem";
import { useTreeBody } from "./useTreeBody";
import styles from "./TreeBody.module.css";
export interface TreeBodyProps extends NativeCollectionListProps {}

export function TreeBody(input: TreeBodyProps) {
  const { props, className, bodyRef, label, nodes, fallback } = useTreeBody(input);

  return (
    <ul
      {...props}
      ref={bodyRef}
      role="tree"
      aria-label={label}
      tabIndex={fallback ? 0 : undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {nodes.map((node, index) => (
        <TreeItem
          key={node.key}
          node={node}
          level={1}
          position={index + 1}
          siblingCount={nodes.length}
        />
      ))}
    </ul>
  );
}

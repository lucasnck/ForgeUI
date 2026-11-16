"use client";
import type {
  NativeSectionRootProps,
  ComponentChildrenProps,
  ComponentSelectionProps,
  ComponentTreeExpansionProps,
  ComponentAnimatedProps,
  TreeNodeDescriptor,
} from "../../../types";
import { TreeContext } from "../../../internal/tree/TreeContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { TreeHeader } from "../../atoms/TreeHeader";
import { TreeBody } from "../../molecules/TreeBody";
import { TreeFooter } from "../../atoms/TreeFooter";
import { useTree } from "./useTree";
import styles from "./Tree.module.css";
export interface TreeProps
  extends
    NativeSectionRootProps,
    ComponentChildrenProps,
    ComponentSelectionProps<string | null>,
    ComponentTreeExpansionProps,
    ComponentAnimatedProps {
  label: string;
  nodes: readonly TreeNodeDescriptor[];
}

export function Tree(input: TreeProps) {
  const { props, children, className, context } = useTree(input);
  const parts = collectCompoundParts(
    children,
    { header: TreeHeader, body: TreeBody, footer: TreeFooter },
    ["body"],
  );

  return (
    <TreeContext value={context}>
      <section
        {...props}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-gap="2"
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </section>
    </TreeContext>
  );
}

import type { KeyboardEvent, RefObject } from "react";
import type {
  TreeNodeDescriptor,
  ComponentTreeExpansionProps,
  NativeWidgetItemProps,
} from "./collection-contracts";
import type { ComponentSelectionProps } from "./compound-composition";
import type { RovingFocusContract } from "./focus";

export interface VisibleTreeNode {
  node: TreeNodeDescriptor;
  parentKey: string | null;
  level: number;
  position: number;
  siblingCount: number;
}

export interface TreeStateOptions
  extends ComponentSelectionProps<string | null>, ComponentTreeExpansionProps {
  nodes: readonly TreeNodeDescriptor[];
  fallbackRef?: RefObject<HTMLElement | null>;
}

export interface TreeStateContract {
  selected: string | null;
  expanded: readonly string[];
  visibleNodes: readonly VisibleTreeNode[];
  isExpanded(key: string): boolean;
  setExpanded(key: string, expanded: boolean): void;
  select(key: string): void;
}

export interface TreeNavigationContract extends TreeStateContract {
  focus: RovingFocusContract;
  onNodeKeyDown(event: KeyboardEvent<HTMLElement>, key: string): void;
}

export interface NativeTreeItemProps extends Omit<NativeWidgetItemProps, "children"> {}

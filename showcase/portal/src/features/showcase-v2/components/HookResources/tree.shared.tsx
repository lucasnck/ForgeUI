"use client";
import { Button, Inline, Stack, Text } from "@forge-ui/web";
import type { TreeStateContract, TreeNavigationContract, VisibleTreeNode } from "@forge-ui/web";
import type { RefObject, PointerEvent } from "react";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { FocusItem } from "../ResourceExamples/FocusItem";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";
import styles from "../ResourceExamples/ResourceExamples.module.css";
interface RowProps {
  state: TreeStateContract;
  entry: VisibleTreeNode;
}

function useTreeStateRow({ state, entry }: RowProps) {
  function expand() {
    state.setExpanded(entry.node.key, !state.isExpanded(entry.node.key));
  }

  function select() {
    state.select(entry.node.key);
  }

  const copy = useResourceExampleCopy();

  return { expand, select, copy };
}

function StateRow(props: RowProps) {
  const { expand, select, copy } = useTreeStateRow(props);

  return (
    <li className={styles.panel}>
      <Inline gap="2">
        <Text>{props.entry.node.label}</Text>
        {props.entry.node.children?.length && (
          <Button variant="outline" onClick={expand}>
            {props.state.isExpanded(props.entry.node.key) ? copy.collapse : copy.expand}{" "}
            {props.entry.node.label}
          </Button>
        )}
        <Button variant="outline" onClick={select} disabled={props.entry.node.disabled}>
          {copy.select} {props.entry.node.label}
        </Button>
      </Inline>
    </li>
  );
}

export interface TreePreviewProps {
  state: TreeStateContract;
  navigation?: TreeNavigationContract;
  fallbackRef: RefObject<HTMLUListElement | null>;
  acceptChanges: boolean;
  setAcceptChanges(value: boolean): void;
  request: unknown;
  collapseAll(): void;
  removeActive(): void;
  keepFocus(event: PointerEvent<HTMLButtonElement>): void;
}

export function TreePreview(view: TreePreviewProps) {
  const copy = useResourceExampleCopy();
  const {
    acceptChanges: viewAcceptChanges,
    setAcceptChanges: viewSetAcceptChanges,
    fallbackRef: viewFallbackRef,
    navigation: viewNavigation,
    state: viewState,
    keepFocus: viewKeepFocus,
    collapseAll: viewCollapseAll,
    removeActive: viewRemoveActive,
    request: viewRequest,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl
          label="acceptChanges"
          checked={viewAcceptChanges}
          onChange={viewSetAcceptChanges}
        />
      </ExampleControls>
      <ul
        ref={viewFallbackRef}
        className={styles.items}
        tabIndex={-1}
        role={viewNavigation ? "tree" : undefined}
        aria-label="Label"
      >
        {viewState.visibleNodes.map((entry) =>
          viewNavigation ? (
            <FocusItem
              key={entry.node.key}
              focus={viewNavigation.focus}
              id={entry.node.key}
              label={entry.node.label}
              disabled={entry.node.disabled}
              selected={viewState.selected === entry.node.key}
              expanded={
                entry.node.children?.length ? viewState.isExpanded(entry.node.key) : undefined
              }
              role="treeitem"
              level={entry.level}
              position={entry.position}
              size={entry.siblingCount}
              onSelect={viewState.select}
              onKey={viewNavigation.onNodeKeyDown}
            />
          ) : (
            <StateRow key={entry.node.key} state={viewState} entry={entry} />
          ),
        )}
      </ul>
      <Inline gap="2">
        <Button variant="outline" onPointerDown={viewKeepFocus} onClick={viewCollapseAll}>
          {copy.collapse}
        </Button>
        {viewNavigation && (
          <Button
            variant="outline"
            onPointerDown={viewKeepFocus}
            onClick={viewRemoveActive}
            disabled={!viewNavigation.focus.activeId}
          >
            {copy.remove}
          </Button>
        )}
      </Inline>
      <ResourceState
        value={{
          selected: viewState.selected,
          expanded: viewState.expanded,
          visibleKeys: viewState.visibleNodes.map((entry) => entry.node.key),
          activeId: viewNavigation?.focus.activeId,
          request: viewRequest,
        }}
      />
    </Stack>
  );
}

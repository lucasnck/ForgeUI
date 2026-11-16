"use client";
import { useLayoutEffect } from "react";
import { Button, Stack, Text, Inline, Heading } from "@forge-ui/web";
import type { DisclosureGroupContract } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";
import styles from "../ResourceExamples/ResourceExamples.module.css";
interface GroupItemProps {
  group: DisclosureGroupContract;
  id: string;
  index: number;
  disabled: boolean;
  domId: string;
}

function useGroupItem({ group, id, disabled }: GroupItemProps) {
  const { registerItem } = group;
  useLayoutEffect(() => registerItem(id, disabled), [registerItem, id, disabled]);

  function toggle() {
    group.toggle(id);
  }

  return { toggle, open: group.isExpanded(id) };
}

function GroupItem(props: GroupItemProps) {
  const { toggle, open } = useGroupItem(props);

  return (
    <Stack gap="2" className={styles.panel}>
      <Heading level={4}>
        <Button
          id={props.domId}
          onClick={toggle}
          aria-expanded={open}
          aria-controls={`${props.domId}-body`}
          disabled={props.disabled}
        >
          Label {props.index}
        </Button>
      </Heading>
      <div id={`${props.domId}-body`} aria-labelledby={props.domId} hidden={!open}>
        <Text>Children {props.index}</Text>
      </div>
    </Stack>
  );
}

export interface DisclosurePreviewProps {
  group: DisclosureGroupContract;
  multiple: boolean;
  setMultiple(value: boolean): void;
  disabled: boolean;
  setDisabled(value: boolean): void;
  acceptChanges: boolean;
  setAcceptChanges(value: boolean): void;
  namespace: string;
}

export function DisclosurePreview(view: DisclosurePreviewProps) {
  const copy = useResourceExampleCopy();
  const {
    multiple: viewMultiple,
    setMultiple: viewSetMultiple,
    disabled: viewDisabled,
    setDisabled: viewSetDisabled,
    acceptChanges: viewAcceptChanges,
    setAcceptChanges: viewSetAcceptChanges,
    group: viewGroup,
    namespace: viewNamespace,
  } = view;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="multiple" checked={viewMultiple} onChange={viewSetMultiple} />
        <ToggleControl label="disabled" checked={viewDisabled} onChange={viewSetDisabled} />
        <ToggleControl
          label="acceptChanges"
          checked={viewAcceptChanges}
          onChange={viewSetAcceptChanges}
        />
      </ExampleControls>
      <Inline gap="2">
        <Text>{copy.disabled}: Label 3</Text>
      </Inline>
      {[1, 2, 3].map((index) => (
        <GroupItem
          key={index}
          group={viewGroup}
          id={`item-${index}`}
          domId={`${viewNamespace}-item-${index}`}
          index={index}
          disabled={index === 3}
        />
      ))}
      <ResourceState value={{ value: viewGroup.value, multiple: viewMultiple }} />
    </Stack>
  );
}

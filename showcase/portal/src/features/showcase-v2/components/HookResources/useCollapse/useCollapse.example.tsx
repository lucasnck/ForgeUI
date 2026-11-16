"use client";
import { Button, Stack, Text, Inline } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { useCollapseResourceExample } from "./useCollapseResourceExample";

export function UseCollapseExample() {
  const {
    collapse,
    controlled,
    setControlled,
    acceptChanges,
    setAcceptChanges,
    disabled,
    setDisabled,
    lastRequest,
    copy,
  } = useCollapseResourceExample();
  const {
    toggle: collapseToggle,
    triggerProps: collapseTriggerProps,
    triggerRef: collapseTriggerRef,
    open: collapseOpen,
    bodyProps: collapseBodyProps,
    bodyRef: collapseBodyRef,
  } = collapse;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="controlled" checked={controlled} onChange={setControlled} />
        <ToggleControl label="acceptChanges" checked={acceptChanges} onChange={setAcceptChanges} />
        <ToggleControl label="disabled" checked={disabled} onChange={setDisabled} />
      </ExampleControls>
      <div>
        <Button {...collapseTriggerProps} ref={collapseTriggerRef} onClick={collapseToggle}>
          {collapseOpen ? copy.collapse : copy.expand}
        </Button>
      </div>
      <div {...collapseBodyProps} ref={collapseBodyRef} className={styles.panel}>
        <Stack gap="2">
          <Text>Children</Text>
          <Inline justify="end">
            <Button variant="outline" onClick={collapseToggle}>
              {copy.close}
            </Button>
          </Inline>
        </Stack>
      </div>
      <ResourceState value={{ open: collapseOpen, lastRequest, controlled }} />
    </Stack>
  );
}

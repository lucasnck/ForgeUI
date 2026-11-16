"use client";
import { Button, Heading, Inline, Stack, Text } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { useOverlayResourceExample } from "./useOverlayResourceExample";

export function UseOverlayExample({ initialLock = false }: { initialLock?: boolean }) {
  const {
    triggerRef,
    panelRef,
    nestedTriggerRef,
    nestedPanelRef,
    branchRef,
    open,
    nested,
    lockScroll,
    setLockScroll,
    reason,
    branchCount,
    show,
    showNested,
    close,
    closeNested,
    branch,
    lockAttribute,
    copy,
  } = useOverlayResourceExample(initialLock);

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="lockScroll" checked={lockScroll} onChange={setLockScroll} />
      </ExampleControls>
      <Inline gap="2">
        <Button ref={triggerRef} onClick={show}>
          {copy.show}
        </Button>
        <Button ref={branchRef} variant="outline" onClick={branch}>
          registerBranch
        </Button>
      </Inline>
      {open && (
        <div ref={panelRef} className={styles.overlay} role="region" aria-label="Label 1">
          <Stack gap="2">
            <Heading level={3}>Title 1</Heading>
            <Text>Children 1</Text>
            <Inline gap="2">
              <Button variant="outline" onClick={close}>
                {copy.close} 1
              </Button>
              <Button ref={nestedTriggerRef} onClick={showNested}>
                {copy.show} 2
              </Button>
            </Inline>
            {nested && (
              <div ref={nestedPanelRef} className={styles.panel} role="region" aria-label="Label 2">
                <Stack gap="2">
                  <Heading level={4}>Title 2</Heading>
                  <Text>Children 2</Text>
                  <Button onClick={closeNested}>{copy.close} 2</Button>
                </Stack>
              </div>
            )}
          </Stack>
        </div>
      )}
      <ResourceState value={{ open, nested, reason, branchCount, lockAttribute }} />
    </Stack>
  );
}

export function OverlayScrollLockExample() {
  return <UseOverlayExample initialLock />;
}

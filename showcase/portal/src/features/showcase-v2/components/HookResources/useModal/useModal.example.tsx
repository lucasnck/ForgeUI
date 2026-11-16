"use client";
import { Button, Heading, Stack, Text } from "@forge-ui/web";
import { ExampleControls, ToggleControl } from "../../ExampleControls";
import { ResourceState } from "../../ResourceExamples/ResourceState";
import styles from "../../ResourceExamples/ResourceExamples.module.css";
import { useModalResourceExample } from "./useModalResourceExample";

export function UseModalExample() {
  const {
    modal,
    titleId,
    triggerRef,
    closeRef,
    acceptChanges,
    setAcceptChanges,
    closeOnOutsideClick,
    setCloseOnOutsideClick,
    requested,
    show,
    close,
    copy,
  } = useModalResourceExample();
  const {
    dialogRef: modalDialogRef,
    onPointerDown: modalOnPointerDown,
    onPointerCancel: modalOnPointerCancel,
    onClick: modalOnClick,
    onCancel: modalOnCancel,
    onClose: modalOnClose,
    open: modalOpen,
  } = modal;

  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="acceptChanges" checked={acceptChanges} onChange={setAcceptChanges} />
        <ToggleControl
          label="closeOnOutsideClick"
          checked={closeOnOutsideClick}
          onChange={setCloseOnOutsideClick}
        />
      </ExampleControls>
      <div>
        <Button ref={triggerRef} onClick={show}>
          {copy.show}
        </Button>
      </div>
      <dialog
        ref={modalDialogRef}
        aria-labelledby={titleId}
        onPointerDown={modalOnPointerDown}
        onPointerCancel={modalOnPointerCancel}
        onClick={modalOnClick}
        onCancel={modalOnCancel}
        onClose={modalOnClose}
        className={styles.modal}
      >
        <Stack gap="2">
          <Heading id={titleId} level={3}>
            Title
          </Heading>
          <Text>Children</Text>
          <div>
            <Button ref={closeRef} onClick={close}>
              {copy.close}
            </Button>
          </div>
        </Stack>
      </dialog>
      <ResourceState value={{ open: modalOpen, requested }} />
    </Stack>
  );
}

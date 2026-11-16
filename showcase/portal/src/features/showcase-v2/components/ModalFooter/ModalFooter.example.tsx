"use client";
import { useExamplePropertySnapshot as useModalFooterExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseModalFooterProps } from "react";
import { useExampleProperties as useModalFooterExampleProperties } from "../ExampleScope/useExampleScope";
import { Button, Modal, ModalBody, ModalFooter } from "@forge-ui/web";
import { ExampleControls, ToggleControl, EventFeedback } from "../ExampleControls";
import { useModalFooterExample } from "./useModalFooterExample";

export function ModalFooterExample() {
  const { properties: modalFooterProperties } = useModalFooterPropertyBindings();

  const {
    divider,
    setDivider,
    triggerRef,
    show,
    messages,
    open,
    onOpenChange,
    close,
    confirm,
    feedback,
  } = useModalFooterExample();
  useModalFooterPropertySnapshot({ divider: divider });
  return (
    <>
      <ExampleControls>
        <ToggleControl label="divider" checked={divider} onChange={setDivider} />
      </ExampleControls>
      <Button ref={triggerRef} onClick={show}>
        {messages.open}
      </Button>
      <Modal
        aria-label="ModalFooter preview"
        open={open}
        onOpenChange={onOpenChange}
        returnFocusRef={triggerRef}
      >
        <ModalBody hidden />
        <ModalFooter divider={divider} {...modalFooterProperties}>
          <Button variant="outline" tone="neutral" onClick={close}>
            {messages.cancel}
          </Button>
          <Button onClick={confirm}>{messages.confirm}</Button>
        </ModalFooter>
      </Modal>
      <EventFeedback>{feedback}</EventFeedback>
    </>
  );
}

function useModalFooterPropertyBindings() {
  return useModalFooterExampleProperties<
    Pick<ShowcaseModalFooterProps<typeof ModalFooter>, "divider" | "title">
  >("ModalFooter");
}

function useModalFooterPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useModalFooterExamplePropertySnapshot("ModalFooter", values);
}

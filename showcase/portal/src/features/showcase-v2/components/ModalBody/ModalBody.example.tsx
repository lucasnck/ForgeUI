"use client";
import type { ComponentProps as ShowcaseModalBodyProps } from "react";
import { useExampleProperties as useModalBodyExampleProperties } from "../ExampleScope/useExampleScope";
import { Button, Modal, ModalBody, Text, Stack, DialogClose } from "@forge-ui/web";
import { EventFeedback } from "../ExampleControls";
import { useModalBodyExample } from "./useModalBodyExample";

export function ModalBodyExample() {
  const { properties: modalBodyProperties } = useModalBodyPropertyBindings();

  const { triggerRef, show, messages, open, onOpenChange, feedback } = useModalBodyExample();

  return (
    <>
      <Button ref={triggerRef} onClick={show}>
        {messages.open}
      </Button>
      <Modal
        aria-label="ModalBody preview"
        open={open}
        onOpenChange={onOpenChange}
        returnFocusRef={triggerRef}
      >
        <ModalBody {...modalBodyProperties}>
          <Stack gap="2">
            <Text>Children</Text>
            <DialogClose appearance="outlined">{messages.close}</DialogClose>
          </Stack>
        </ModalBody>
      </Modal>
      <EventFeedback>{feedback}</EventFeedback>
    </>
  );
}

function useModalBodyPropertyBindings() {
  return useModalBodyExampleProperties<Pick<ShowcaseModalBodyProps<typeof ModalBody>, "title">>(
    "ModalBody",
  );
}

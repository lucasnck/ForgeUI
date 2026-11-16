"use client";
import { useExamplePropertySnapshot as useModalHeaderExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseModalHeaderProps } from "react";
import { useExampleProperties as useModalHeaderExampleProperties } from "../ExampleScope/useExampleScope";
import { Button, Modal, ModalHeader, ModalBody, Icon, DialogClose } from "@forge-ui/web";
import { ExampleControls, ToggleControl, EventFeedback } from "../ExampleControls";
import { useModalHeaderExample } from "./useModalHeaderExample";

export function ModalHeaderExample() {
  const { properties: modalHeaderProperties } = useModalHeaderPropertyBindings();

  const {
    divider,
    setDivider,
    icon,
    setIcon,
    triggerRef,
    show,
    messages,
    open,
    onOpenChange,
    feedback,
  } = useModalHeaderExample();
  useModalHeaderPropertySnapshot({ title: "Title", divider: divider });
  return (
    <>
      <ExampleControls>
        <ToggleControl label="divider" checked={divider} onChange={setDivider} />
        <ToggleControl label="icon" checked={icon} onChange={setIcon} />
      </ExampleControls>
      <Button ref={triggerRef} onClick={show}>
        {messages.open}
      </Button>
      <Modal open={open} onOpenChange={onOpenChange} returnFocusRef={triggerRef}>
        <ModalHeader
          title="Title"
          divider={divider}
          icon={icon ? <Icon name="info" size="inherit" /> : undefined}
          {...modalHeaderProperties}
        >
          <DialogClose aria-label={messages.close} appearance="ghost" tone="neutral">
            <Icon name="close" size="inherit" />
          </DialogClose>
        </ModalHeader>
        <ModalBody hidden />
      </Modal>
      <EventFeedback>{feedback}</EventFeedback>
    </>
  );
}

function useModalHeaderPropertyBindings() {
  return useModalHeaderExampleProperties<
    Pick<ShowcaseModalHeaderProps<typeof ModalHeader>, "title" | "divider">
  >("ModalHeader");
}

function useModalHeaderPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useModalHeaderExamplePropertySnapshot("ModalHeader", values);
}

"use client";
import { useExamplePropertySnapshot as useModalExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseModalProps } from "react";
import { useExampleProperties as useModalExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Label,
  Input,
  DialogClose,
  Icon,
  Stack,
} from "@forge-ui/web";
import { ExampleControls, ToggleControl, SelectControl, EventFeedback } from "../ExampleControls";
import { useModalExample } from "./useModalExample";

function ModalScenario({ input = false }: { input?: boolean }) {
  const { properties: modalProperties, bindChange: bindModalPropertyChange } =
    useModalPropertyBindings();

  const {
    closeOnOutsideClick,
    setCloseOnOutsideClick,
    animated,
    setAnimated,
    animationEffect,
    changeEffect,
    triggerRef,
    show,
    messages,
    open,
    onOpenChange,
    inputRef,
    inputId,
    value,
    onChange,
    close,
    confirm,
    feedback,
  } = useModalExample();
  useModalPropertySnapshot({
    open: open,
    closeOnOutsideClick: closeOnOutsideClick,
    animated: animated,
    animationEffect: animationEffect,
  });
  return (
    <>
      <ExampleControls>
        <ToggleControl
          label="closeOnOutsideClick"
          checked={closeOnOutsideClick}
          onChange={setCloseOnOutsideClick}
        />
        <ToggleControl label="animated" checked={animated} onChange={setAnimated} />
        <SelectControl
          label="animationEffect"
          value={animationEffect}
          options={["none", "fade", "scale"]}
          onChange={changeEffect}
        />
      </ExampleControls>
      <Button ref={triggerRef} onClick={show}>
        {messages.open}
      </Button>
      <Modal
        open={open}
        onOpenChange={bindModalPropertyChange("open", onOpenChange)}
        returnFocusRef={triggerRef}
        initialFocusRef={input ? inputRef : undefined}
        closeOnOutsideClick={closeOnOutsideClick}
        animated={animated}
        animationEffect={animationEffect}
        {...modalProperties}
      >
        <ModalHeader title="Title">
          <DialogClose aria-label={messages.close} appearance="ghost" tone="neutral">
            <Icon name="close" size="inherit" />
          </DialogClose>
        </ModalHeader>
        <ModalBody>
          {input ? (
            <Stack gap="1">
              <Label htmlFor={inputId}>Children</Label>
              <Input
                id={inputId}
                ref={inputRef}
                value={value}
                onChange={onChange}
                placeholder="Placeholder"
              />
            </Stack>
          ) : (
            <Text>Children</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={close}>
            {input ? messages.cancel : messages.close}
          </Button>
          {input && <Button onClick={confirm}>{messages.confirm}</Button>}
        </ModalFooter>
      </Modal>
      <EventFeedback>{feedback}</EventFeedback>
    </>
  );
}

export function ModalExample() {
  return <ModalScenario />;
}

export function ModalInputExample() {
  return <ModalScenario input />;
}

function useModalPropertyBindings() {
  return useModalExampleProperties<
    Pick<
      ShowcaseModalProps<typeof Modal>,
      "open" | "closeOnOutsideClick" | "animated" | "animationEffect" | "title"
    >
  >("Modal");
}

function useModalPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useModalExamplePropertySnapshot("Modal", values);
}

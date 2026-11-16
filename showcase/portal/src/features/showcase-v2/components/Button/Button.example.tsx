"use client";
import { useExamplePropertySnapshot as useButtonExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseButtonProps } from "react";
import { useExampleProperties as useButtonExampleProperties } from "../ExampleScope/useExampleScope";
import {
  Button,
  Inline,
  Stack,
  Heading,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl, EventFeedback } from "../ExampleControls";
import { useButtonExample, useButtonHierarchyExample } from "./useButtonExample";

export function ButtonExample() {
  const { properties: buttonProperties } = useButtonPropertyBindings();

  const view = useButtonExample();
  useButtonPropertySnapshot({
    title: "Title",
    loadingLabel: "LoadingLabel",
    size: view.size,
    tone: view.tone,
    variant: view.variant,
    appearance: view.resolvedAppearance,
    shape: view.resolvedShape,
    loading: view.loading,
    disabled: view.disabled,
    fullWidth: view.fullWidth,
  });
  return (
    <>
      <ExampleControls>
        <SelectControl
          label="size"
          value={view.size}
          options={["xs", "sm", "md", "lg", "xl"]}
          onChange={view.changeSize}
        />
        <SelectControl
          label="tone"
          value={view.tone}
          options={[
            "neutral",
            "brand",
            "success",
            "warning",
            "danger",
            "info",
            "inverse",
            "sand",
            "violet",
            "forest",
            "sky",
          ]}
          onChange={view.changeTone}
        />
        <SelectControl
          label="variant"
          value={view.variant}
          options={["solid", "soft", "ghost", "outline"]}
          onChange={view.changeVariant}
        />
        <SelectControl
          label="appearance"
          value={view.appearance}
          options={["default", "solid", "soft", "outlined", "bordered", "ghost", "none"]}
          onChange={view.setAppearance}
        />
        <SelectControl
          label="shape"
          value={view.shape}
          options={["inherited", "square", "rounded", "pill"]}
          onChange={view.setShape}
        />
        <ToggleControl label="loading" checked={view.loading} onChange={view.setLoading} />
        <ToggleControl label="disabled" checked={view.disabled} onChange={view.setDisabled} />
        <ToggleControl label="fullWidth" checked={view.fullWidth} onChange={view.setFullWidth} />
      </ExampleControls>
      <Button
        title="Title"
        loadingLabel="LoadingLabel"
        size={view.size}
        tone={view.tone}
        variant={view.variant}
        appearance={view.resolvedAppearance}
        shape={view.resolvedShape}
        loading={view.loading}
        disabled={view.disabled}
        fullWidth={view.fullWidth}
        onClick={view.onClick}
        {...buttonProperties}
      >
        {buttonProperties.children === undefined ? <>Children</> : <>{buttonProperties.children}</>}
      </Button>
      <EventFeedback>onClick: {view.count}</EventFeedback>
    </>
  );
}

export function ButtonHierarchyExample() {
  const { cancelRef, ...view } = useButtonHierarchyExample();

  return (
    <Stack gap="3">
      <Stack gap="2">
        <Heading level={3} size="md">
          {view.copy.list}
        </Heading>
        <Inline gap="2">
          <Button tone="neutral" appearance="bordered" onClick={view.retry}>
            {view.copy.retry}
          </Button>
          <Button tone="brand" appearance="solid" onClick={view.create}>
            {view.copy.create}
          </Button>
        </Inline>
      </Stack>
      <Stack gap="2">
        <Heading level={3} size="md">
          {view.copy.details}
        </Heading>
        <Inline gap="2">
          <Button tone="neutral" appearance="ghost" onClick={view.back}>
            {view.copy.back}
          </Button>
          <Button tone="sand" appearance="bordered" onClick={view.edit}>
            {view.copy.edit}
          </Button>
          <Button tone="neutral" appearance="bordered" onClick={view.remove}>
            {view.copy.remove}
          </Button>
        </Inline>
      </Stack>
      <EventFeedback>
        {view.copy.feedback}: {view.action}
      </EventFeedback>
      <AlertDialog
        open={view.open}
        onOpenChange={view.setOpen}
        initialFocusRef={cancelRef}
        description={view.copy.help}
      >
        <AlertDialogHeader title={view.copy.confirm} />
        <AlertDialogBody>{view.copy.help}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} tone="neutral" appearance="ghost" onClick={view.cancel}>
            {view.copy.cancel}
          </Button>
          <Button tone="danger" appearance="solid" onClick={view.confirm}>
            {view.copy.remove}
          </Button>
        </AlertDialogFooter>
      </AlertDialog>
    </Stack>
  );
}

function useButtonPropertyBindings() {
  return useButtonExampleProperties<
    Pick<
      ShowcaseButtonProps<typeof Button>,
      | "children"
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "variant"
      | "fullWidth"
      | "loading"
      | "loadingLabel"
      | "type"
      | "disabled"
      | "title"
    >
  >("Button");
}

function useButtonPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useButtonExamplePropertySnapshot("Button", values);
}

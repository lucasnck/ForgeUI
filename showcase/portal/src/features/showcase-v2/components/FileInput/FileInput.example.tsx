"use client";
import { useExamplePropertySnapshot as useFileInputExamplePropertySnapshot } from "../ExampleScope/useExampleScope";
import type { ComponentProps as ShowcaseFileInputProps } from "react";
import { useExampleProperties as useFileInputExampleProperties } from "../ExampleScope/useExampleScope";
import { Stack, FormField, FileInput, Inline, Button } from "@forge-ui/web";
import { ExampleControls, SelectControl, ToggleControl } from "../ExampleControls";
import { ResourceState } from "../ResourceExamples/ResourceState";
import { useFileInputExample } from "./useFileInputExample";

import { fileAcceptOptions } from "./fixtures";

export function FileInputExample() {
  const { properties: fileInputProperties } = useFileInputPropertyBindings();

  const view = useFileInputExample();
  const {
    multiple: viewMultiple,
    setMultiple: viewSetMultiple,
    accept: viewAccept,
    setAccept: viewSetAccept,
    formRef: viewFormRef,
    id: viewId,
    change: viewChange,
    reset: viewReset,
    copy: viewCopy,
    files: viewFiles,
    changes: viewChanges,
  } = view;
  useFileInputPropertySnapshot({ fullWidth: true });
  return (
    <Stack gap="2">
      <ExampleControls>
        <ToggleControl label="multiple" checked={viewMultiple} onChange={viewSetMultiple} />
        <SelectControl
          label="accept"
          value={viewAccept}
          options={fileAcceptOptions}
          onChange={viewSetAccept}
        />
      </ExampleControls>
      <form ref={viewFormRef}>
        <Stack gap="2">
          <FormField controlId={viewId} label="Label">
            <FileInput
              name="files"
              accept={viewAccept}
              multiple={viewMultiple}
              onFilesChange={viewChange}
              fullWidth
              {...fileInputProperties}
            />
          </FormField>
          <Inline justify="end">
            <Button variant="outline" onClick={viewReset}>
              {viewCopy.clear}
            </Button>
          </Inline>
        </Stack>
      </form>
      <ResourceState
        value={{
          files: viewFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
          })),
          onFilesChange: viewChanges,
        }}
      />
    </Stack>
  );
}

function useFileInputPropertyBindings() {
  return useFileInputExampleProperties<
    Pick<
      ShowcaseFileInputProps<typeof FileInput>,
      | "size"
      | "tone"
      | "appearance"
      | "shape"
      | "fullWidth"
      | "invalid"
      | "title"
      | "placeholder"
      | "checked"
      | "disabled"
      | "readOnly"
    >
  >("FileInput");
}

function useFileInputPropertySnapshot(values: Readonly<Record<string, unknown>>) {
  useFileInputExamplePropertySnapshot("FileInput", values);
}

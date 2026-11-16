"use client";
import { useRef, useState, useId } from "react";
import type { FileInputProps } from "@forge-ui/web";
import { useResourceExampleCopy } from "../ResourceExamples/useResourceExampleCopy";

export function useFileInputExample() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [multiple, setMultiple] = useState(false);
  const [accept, setAccept] = useState("image/*");
  const [files, setFiles] = useState<readonly File[]>([]);
  const [changes, setChanges] = useState(0);

  const change: NonNullable<FileInputProps["onFilesChange"]> = (next) => {
    setFiles(next);
    setChanges((v) => v + 1);
  };

  function reset() {
    formRef.current?.reset();
    setFiles([]);
    setChanges(0);
  }

  return {
    id,
    formRef,
    multiple,
    setMultiple,
    accept,
    setAccept,
    files,
    changes,
    change,
    reset,
    copy: useResourceExampleCopy(),
  };
}

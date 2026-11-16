"use client";

import { Input } from "../../atoms/Input";
import type { NativeFileInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";
import { useFileInput } from "./useFileInput";

export interface FileInputProps
  extends NativeFileInputProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {
  onFilesChange?(files: readonly File[]): void;
}

export function FileInput(props: FileInputProps) {
  const view = useFileInput(props);

  return <Input {...view.props} type="file" onChange={view.handleChange} />;
}

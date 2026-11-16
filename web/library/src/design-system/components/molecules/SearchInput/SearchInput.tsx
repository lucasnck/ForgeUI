"use client";

import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { InputGroup } from "../InputGroup";
import type { NativeSpecializedInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";
import { useSearchInput } from "./useSearchInput";

export interface SearchInputProps
  extends NativeSpecializedInputProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {
  clearLabel?: string;
}

export function SearchInput(props: SearchInputProps) {
  const {
    props: inputProps,
    inputRef,
    value,
    defaultValue,
    disabled,
    readOnly,
    fullWidth,
    handleChange,
    showClear,
    clear,
    clearLabel,
  } = useSearchInput(props);

  return (
    <InputGroup
      fullWidth={fullWidth}
      trailing={
        showClear ? (
          <Button type="button" onClick={clear}>
            {clearLabel}
          </Button>
        ) : undefined
      }
    >
      <Input
        {...inputProps}
        ref={inputRef}
        type="search"
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={readOnly}
        fullWidth={fullWidth}
        onChange={handleChange}
      />
    </InputGroup>
  );
}

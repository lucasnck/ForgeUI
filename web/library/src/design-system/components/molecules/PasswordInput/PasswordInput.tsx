"use client";

import { InputGroup } from "../InputGroup";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import type { NativeSpecializedInputProps } from "../../../types/input-specializations";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";
import { usePasswordInput } from "./usePasswordInput";

export interface PasswordInputProps
  extends NativeSpecializedInputProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {
  revealLabel: string;
  concealLabel: string;
  revealable?: boolean;
}

export function PasswordInput(props: PasswordInputProps) {
  const {
    props: inputProps,
    inputRef,
    showText,
    revealable,
    disabled,
    fullWidth,
    concealLabel,
    revealLabel,
    toggle,
  } = usePasswordInput(props);

  return (
    <InputGroup
      fullWidth={fullWidth}
      trailing={
        revealable ? (
          <Button
            type="button"
            disabled={disabled}
            aria-label={showText ? concealLabel : revealLabel}
            aria-pressed={showText}
            onClick={toggle}
          >
            {showText ? concealLabel : revealLabel}
          </Button>
        ) : undefined
      }
    >
      <Input
        autoComplete="current-password"
        {...inputProps}
        ref={inputRef}
        disabled={disabled}
        fullWidth={fullWidth}
        type={showText ? "text" : "password"}
      />
    </InputGroup>
  );
}

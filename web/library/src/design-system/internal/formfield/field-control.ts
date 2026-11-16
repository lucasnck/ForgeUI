import type { HTMLAttributes, ReactElement } from "react";
import type { ComponentInvalidProps } from "../../types/component-capabilities";
import type { FormFieldContextValue } from "./FormFieldContext";

export interface FieldControlProps extends HTMLAttributes<HTMLElement>, ComponentInvalidProps {}

export function mergeFieldDescriptions(existing?: string, owned?: string): string | undefined {
  return (
    [
      ...new Set([
        ...(existing?.split(/\s+/).filter(Boolean) ?? []),
        ...(owned?.split(/\s+/).filter(Boolean) ?? []),
      ]),
    ].join(" ") || undefined
  );
}

export function fieldControlAttributes(
  control: ReactElement<FieldControlProps>,
  context: FormFieldContextValue,
): Partial<FieldControlProps> {
  const attributes = {
    id: context.controlId,
    "aria-describedby": mergeFieldDescriptions(
      control.props["aria-describedby"],
      context.describedBy,
    ),
  };

  return typeof control.type === "string"
    ? {
        ...attributes,
        "aria-invalid": context.invalid
          ? true
          : (control.props["aria-invalid"] ?? control.props.invalid),
      }
    : { ...attributes, invalid: context.invalid || control.props.invalid };
}

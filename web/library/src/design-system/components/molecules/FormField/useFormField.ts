import { Fragment, isValidElement } from "react";
import type { FieldControlProps } from "../../../internal/formfield/field-control";
import type { FormFieldProps } from "./FormField";

export function useFormField({ controlId, label, hint, error, children }: FormFieldProps) {
  const control =
    isValidElement<FieldControlProps>(children) && children.type !== Fragment ? children : null;

  return {
    controlId,
    label,
    hint,
    error,
    children,
    control,
    hintId: `${controlId}-hint`,
    errorId: `${controlId}-error`,
  };
}

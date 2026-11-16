"use client";

import { Fragment, isValidElement } from "react";
import { useFormFieldContext } from "../../../internal/formfield/FormFieldContext";
import { fieldControlAttributes } from "../../../internal/formfield/field-control";
import type { FieldControlProps } from "../../../internal/formfield/field-control";
import type { FormFieldBodyProps } from "./FormFieldBody";

export function useFormFieldBody({ children, className, ...props }: FormFieldBodyProps) {
  const context = useFormFieldContext();
  if (!isValidElement<FieldControlProps>(children) || children.type === Fragment)
    throw new Error("FormFieldBody requires one id/ARIA-forwarding control.");
  return {
    props,
    className,
    control: children,
    attributes: fieldControlAttributes(children, context),
  };
}

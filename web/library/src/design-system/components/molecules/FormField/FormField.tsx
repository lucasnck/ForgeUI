"use client";

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { collectCompoundParts } from "../../../helpers/compound";
import { FormFieldContext } from "../../../internal/formfield/FormFieldContext";
import { fieldControlAttributes } from "../../../internal/formfield/field-control";
import { Label } from "../../atoms/Label";
import { FieldHint } from "../../atoms/FieldHint";
import { FieldError } from "../../atoms/FieldError";
import { FormFieldHeader } from "../../atoms/FormFieldHeader";
import { FormFieldBody } from "../../atoms/FormFieldBody";
import { FormFieldFooter } from "../FormFieldFooter";
import type { FormFieldFooterProps } from "../FormFieldFooter";
import { useFormField } from "./useFormField";
import styles from "./FormField.module.css";

export interface FormFieldProps {
  controlId: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

function containsFieldPart(children: ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return false;
    if (child.type === Fragment && child.key !== null)
      return containsFieldPart(child.props.children);
    return (
      child.type === FormFieldHeader ||
      child.type === FormFieldBody ||
      child.type === FormFieldFooter
    );
  });
}

export function FormField(props: FormFieldProps): ReactElement {
  const view = useFormField(props);
  const parts = containsFieldPart(view.children)
    ? collectCompoundParts(
        view.children,
        { header: FormFieldHeader, body: FormFieldBody, footer: FormFieldFooter },
        ["body"],
      )
    : null;
  const footer = parts?.footer as ReactElement<FormFieldFooterProps> | undefined;
  const hint = footer?.props.hint ?? view.hint;
  const error = footer?.props.error ?? view.error;
  const context = {
    controlId: view.controlId,
    label: view.label,
    hintId: view.hintId,
    errorId: view.errorId,
    invalid: Boolean(error),
    describedBy:
      [hint ? view.hintId : undefined, error ? view.errorId : undefined]
        .filter(Boolean)
        .join(" ") || undefined,
  };

  return (
    <FormFieldContext value={context}>
      <div className={styles.root} data-gap="2">
        {parts ? (
          <>
            {parts.header ?? <FormFieldHeader />}
            {parts.body}
            {footer ? (
              cloneElement(footer, { hint, error })
            ) : hint || error ? (
              <FormFieldFooter hint={hint} error={error} />
            ) : null}
          </>
        ) : (
          <>
            <Label htmlFor={view.controlId}>{view.label}</Label>
            {view.control
              ? cloneElement(view.control, fieldControlAttributes(view.control, context))
              : view.children}
            {hint && <FieldHint id={view.hintId}>{hint}</FieldHint>}
            {error && <FieldError id={view.errorId}>{error}</FieldError>}
          </>
        )}
      </div>
    </FormFieldContext>
  );
}

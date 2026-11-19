"use client";
import type { FormEventHandler, ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { FormViewMode } from "../../../../types";
import type { FormConfig, FormFieldsConfig } from "../../../../../support/forms";
import type { FormViewFieldProps } from "./FormViewField";
import { FormViewField } from "./FormViewField";
import styles from "./FormView.module.css";
import { useFormView } from "./useFormView";

function isFieldKey<Shape extends Record<string, z.ZodType>>(
  name: string,
  fields: FormFieldsConfig<Shape>,
): name is Extract<keyof Shape, string> {
  return Object.hasOwn(fields, name);
}

export interface FormViewProps<
  Shape extends Record<string, z.ZodType>,
  Context = undefined,
  Output extends FieldValues = z.output<z.ZodObject<Shape>>,
> {
  config: FormConfig<Shape>;
  methods: UseFormReturn<z.input<z.ZodObject<Shape>>, Context, Output>;
  mode?: FormViewMode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  idPrefix?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  footer?: ReactNode;
  error?: ReactNode;
  translate?: (key: string) => string;
  fieldError?: (name: Extract<keyof Shape, string>) => string | undefined;
  passwordLabels?: FormViewFieldProps["passwordLabels"];
  telephoneLabels?: FormViewFieldProps["telephoneLabels"];
}
const identity = (key: string) => key;

export function FormView<
  Shape extends Record<string, z.ZodType>,
  Context = undefined,
  Output extends FieldValues = z.output<z.ZodObject<Shape>>,
>(props: FormViewProps<Shape, Context, Output>) {
  const { idPrefix, rootRef } = useFormView(props.idPrefix);
  if (props.mode === "fields" && props.onSubmit)
    throw new Error("Field-only FormView cannot own submission.");
  if (props.mode !== "fields" && !props.onSubmit)
    throw new Error("FormView requires a caller-owned submit callback.");
  const content = (
    <>
      {Object.entries(props.config.fields).map(([key, field]) => {
        if (!isFieldKey(key, props.config.fields) || field.name !== key)
          throw new Error("FormView field names must match configuration keys.");
        return (
          <FormViewField
            key={key}
            field={field}
            id={field.id ?? idPrefix + "-" + key}
            disabled={props.disabled}
            readOnly={props.readOnly}
            translate={props.translate ?? identity}
            error={props.fieldError?.(key)}
            passwordLabels={props.passwordLabels}
            telephoneLabels={props.telephoneLabels}
          />
        );
      })}
      {props.error && <div role="alert">{props.error}</div>}
      {props.footer}
    </>
  );

  return (
    <FormProvider {...props.methods}>
      {props.mode === "fields" ? (
        <div
          ref={rootRef}
          className={[styles.root, props.className].filter(Boolean).join(" ")}
          aria-busy={props.methods.formState.isSubmitting}
        >
          {content}
        </div>
      ) : (
        <form
          ref={rootRef}
          className={[styles.root, props.className].filter(Boolean).join(" ")}
          noValidate
          onSubmit={props.onSubmit}
          aria-busy={props.methods.formState.isSubmitting}
        >
          {content}
        </form>
      )}
    </FormProvider>
  );
}

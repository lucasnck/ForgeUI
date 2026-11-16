"use client";

import type { SubmitEvent } from "react";
import type { NativeFormRootProps } from "../../../types/collection-contracts";
import type { ComponentChildrenProps } from "../../../types/compound-composition";
import type { ComponentLoadingProps } from "../../../types/component-capabilities";
import { FormContext } from "../../../internal/form/FormContext";
import { collectCompoundParts } from "../../../helpers/compound";
import { FormHeader } from "../../atoms/FormHeader";
import { FormBody } from "../../atoms/FormBody";
import { FormFooter } from "../../atoms/FormFooter";
import { useForm } from "./useForm";
import styles from "./Form.module.css";

export interface FormProps
  extends NativeFormRootProps, ComponentChildrenProps, ComponentLoadingProps {
  onValidSubmit(data: FormData, event: SubmitEvent<HTMLFormElement>): void;
}

export function Form(input: FormProps) {
  const { context, children, props, className, submit } = useForm(input);
  const parts = collectCompoundParts(children, {
    header: FormHeader,
    body: FormBody,
    footer: FormFooter,
  });

  return (
    <FormContext value={context}>
      <form
        {...props}
        onSubmit={submit}
        className={[styles.root, className].filter(Boolean).join(" ")}
        data-gap="2"
      >
        {parts.header}
        {parts.body}
        {parts.footer}
      </form>
    </FormContext>
  );
}

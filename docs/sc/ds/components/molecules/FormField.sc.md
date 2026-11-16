---
title: "FormField Text Atom Composition"
scope: "Replace embedded field text with Label, FieldHint and FieldError without changing public props"
status: "DONE"
type: "component"
ds-level: "molecules"
---

# FormField Text Atom Composition

## Files

```text
design-system/components/molecules/FormField/FormField.tsx (M)
design-system/components/molecules/FormField/FormField.module.css (M)
features/showcase/examples/FormField.example.tsx (M)
../scripts/check-design-system.cjs (M)
design-system/components/molecules/FormField/index.ts (M)
design-system/components/molecules/FormField/useFormField.ts (C)
design-system/internal/formfield/field-control.ts (C)
../scripts/check-forms.cjs (C)
features/showcase-v2/components/FormField/definition.ts (C)
features/showcase-v2/components/FormField/FormField.example.tsx (C)
features/showcase-v2/components/FormField/useFormFieldExample.ts (C)
features/showcase-v2/components/FormField/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Label](../atoms/Label.sc.md)
- [FieldHint](../atoms/FieldHint.sc.md)
- [FieldError](../atoms/FieldError.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Layout](../../styles/tech-layout.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { FormField, Input } from "@forge-ui/web";
<FormField controlId="email" label="Email" hint="Use your work email">
 <Input type="email"/>
</FormField>;
```

## Styles

```css
.root {
  composes: stack from "../../../styles/layout-components.module.css";
  min-inline-size: var(--zero);
}
```
## Hooks

```tsx
import { Fragment, isValidElement } from "react";
import type { FieldControlProps } from "../../../internal/formfield/field-control";
import type { FormFieldProps } from "./FormField";

export function useFormField({ controlId, label, hint, error, children }: FormFieldProps) {
  const control = isValidElement<FieldControlProps>(children) && children.type !== Fragment ? children : null;
  return { controlId, label, hint, error, children, control, hintId: `${controlId}-hint`, errorId: `${controlId}-error` };
}
```
## Content

```tsx
"use client";

import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
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
  return Children.toArray(children).some(child => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return false;
    if (child.type === Fragment && child.key !== null) return containsFieldPart(child.props.children);
    return child.type === FormFieldHeader || child.type === FormFieldBody || child.type === FormFieldFooter;
  });
}

export function FormField(props: FormFieldProps): ReactElement {
  const view = useFormField(props);
  const parts = containsFieldPart(view.children)
    ? collectCompoundParts(view.children, { header: FormFieldHeader, body: FormFieldBody, footer: FormFieldFooter }, ["body"])
    : null;
  const footer = parts?.footer as ReactElement<FormFieldFooterProps> | undefined;
  const hint = footer?.props.hint ?? view.hint;
  const error = footer?.props.error ?? view.error;
  const context = {
    controlId: view.controlId, label: view.label, hintId: view.hintId, errorId: view.errorId,
    invalid: Boolean(error),
    describedBy: [hint ? view.hintId : undefined, error ? view.errorId : undefined].filter(Boolean).join(" ") || undefined,
  };
  return <FormFieldContext value={context}>
    <div className={styles.root} data-gap="2">
      {parts ? <>
        {parts.header ?? <FormFieldHeader />}
        {parts.body}
        {footer ? cloneElement(footer, { hint, error }) : (hint || error) ? <FormFieldFooter hint={hint} error={error} /> : null}
      </> : <>
        <Label htmlFor={view.controlId}>{view.label}</Label>
        {view.control ? cloneElement(view.control, fieldControlAttributes(view.control, context)) : view.children}
        {hint && <FieldHint id={view.hintId}>{hint}</FieldHint>}
        {error && <FieldError id={view.errorId}>{error}</FieldError>}
      </>}
    </div>
  </FormFieldContext>;
}

"use client";

import { createContext, useContext } from "react";

export interface FormFieldContextValue {
  controlId: string;
  label: string;
  hintId: string;
  errorId: string;
  invalid: boolean;
  describedBy?: string;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export function useFormFieldContext(): FormFieldContextValue {
  const context = useContext(FormFieldContext);
  if (!context) throw new Error("FormField parts require FormField.");
  return context;
}

import type { HTMLAttributes, ReactElement } from "react";
import type { ComponentInvalidProps } from "../../types/component-capabilities";
import type { FormFieldContextValue } from "./FormFieldContext";

export interface FieldControlProps extends HTMLAttributes<HTMLElement>, ComponentInvalidProps {}

export function mergeFieldDescriptions(existing?: string, owned?: string): string | undefined {
  return [...new Set([...(existing?.split(/\s+/).filter(Boolean) ?? []), ...(owned?.split(/\s+/).filter(Boolean) ?? [])])].join(" ") || undefined;
}

export function fieldControlAttributes(control: ReactElement<FieldControlProps>, context: FormFieldContextValue): Partial<FieldControlProps> {
  const attributes = {
    id: context.controlId,
    "aria-describedby": mergeFieldDescriptions(control.props["aria-describedby"], context.describedBy),
  };
  return typeof control.type === "string"
    ? { ...attributes, "aria-invalid": context.invalid ? true : control.props["aria-invalid"] ?? control.props.invalid }
    : { ...attributes, invalid: context.invalid || control.props.invalid };
}
```
## Tests

- V2 Field label hint and error: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- The declared native or controlled value channel forwards one user change while prop updates emit no corrective callback.
- Caller-prevented and composing input does not trigger an owned selection/completion action.
- Two mounted instances preserve independent ids, descriptions and native submission values.

## Criteria

- [x] Public FormFieldProps and default typography remain compatible with existing consumers.
- [x] Label/hint/error are actual Atom imports; no private text selectors remain.
- [x] Existing descriptions survive; hint/error IDs appear only while their messages render, without duplicates.
- [x] Error forces invalid state; otherwise native/child validity and input ref/event handling remain intact.
- [x] Text atoms each have their own Showcase entry; FormField demonstrates their composition, not another implementation.
- [x] Lint, types, relationship checks, token checks and static export pass before marking the revision done.
- [x] Preserve public props, generated relationship IDs, existing descriptions and invalid-state propagation.
- [x] No validation engine, new field layout, business copy or form-state owner.
- [x] The Public API contract uses Preserve existing fields; FormFieldControlProps is a private typing projection, not a new public field API.
- [x] The hint / error contract uses Omitted/empty strings render no message or description ID.
- [x] The Description IDs contract uses controlId-hint and controlId-error; retain existing child's space-separated IDs and deduplicate.
- [x] The invalid contract uses Nonempty error forces true; otherwise retain child's existing invalid/aria-invalid behavior.
- [x] The Announcement contract uses FieldError default alert matches current source; no extra live region on wrapper.
- [x] The Layout contract uses Existing vertical stack gap space-2; no new size/tone props on FormField.
- [x] Keep only the existing layout.
- [x] No new global rule, palette or copied text recipe.
- [x] Preserve the already-delivered shared layout recipe.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Preserve Header/Body/Footer hierarchy and mount/focus policy from that visual owner.
- [x] Optional sections do not fade independently.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Field label hint and error**: Compose actual Header/Body/Footer and one Input with controlId, label="Label", hint="Hint", placeholder="Placeholder"; switch consumer error/disabled state and verify connected descriptions without duplicate labels.
- [x] The FormField V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useFormFieldExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

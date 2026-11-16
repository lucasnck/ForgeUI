---
title: "FormPageTemplate"
scope: "Shared create and edit page composition around a caller-owned semantic form"
status: "PENDING"
type: "component"
ds-level: "templates"
---


# FormPageTemplate


## Files


```text
features/showcase-v2/components/FormPageTemplate/usage-code.ts (M)
features/showcase-v2/components/FormPageTemplate/definition.ts (M)
features/showcase-v2/components/FormPageTemplate/FormPageTemplate.example.tsx (C)
features/showcase-v2/components/FormPageTemplate/useFormPageTemplateExample.ts (C)
design-system/components/templates/FormPageTemplate/FormPageTemplate.tsx (C)
design-system/components/templates/FormPageTemplate/FormPageTemplate.module.css (C)
design-system/components/templates/FormPageTemplate/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/FormPageTemplate.example.tsx (C)
features/showcase/examples/useFormPageTemplateExample.ts (C)
features/showcase/examples/PortalRecordForm.tsx (M)
features/showcase/examples/useCrudRecordForm.ts (C)
features/showcase/examples/record-form/form.ts (C)
features/showcase/components/TemplateShowcase/TemplateShowcaseForm.tsx (C)
../scripts/check-crud-home.cjs (M)
features/showcase/model/showcase-registry.ts (M)
```


## Dependencies


- [PageHeader](../molecules/PageHeader.sc.md)
- [Stack](../atoms/Stack.sc.md)
- [Collection contracts](../../types/tech-collection-contracts.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Form](../organisms/Form.sc.md)


## Contract


```tsx
import { FormPageTemplate } from "@forge-ui/web";
<FormPageTemplate titleId="record-form-title" pageTitle={formTitle} identity={knownRecordIdentity} actions={backAction} notice={formNotice}>
  {recordForm}
</FormPageTemplate>;
```


## Styles


```css
.root {
  min-inline-size: var(--zero);
}


.root[hidden] {
  display: none;
}


.content {
  min-inline-size: var(--zero);
}
```


## Content


```tsx
import type { ReactNode } from "react";
import type { NativeSectionRootProps } from "../../../types/collection-contracts";
import { PageHeader, type PageHeaderContentProps } from "../../molecules/PageHeader";
import { Stack } from "../../atoms/Stack";
import styles from "./FormPageTemplate.module.css";


export interface FormPageTemplateProps extends NativeSectionRootProps, PageHeaderContentProps {
  children: ReactNode;
  notice?: ReactNode;
}


export function FormPageTemplate({ titleId, pageTitle, description, identity, breadcrumb, actions, divider, children, className, notice, ...props }: FormPageTemplateProps) {
  const hasNotice = notice !== undefined && notice !== null && typeof notice !== "boolean" && notice !== "";
  return <Stack as="section" padding="3" gap="3" {...props} aria-labelledby={titleId} className={[styles.root, className].filter(Boolean).join(" ")}>
    <PageHeader titleId={titleId} pageTitle={pageTitle} description={description} identity={identity} breadcrumb={breadcrumb} actions={actions} divider={divider} />
    {hasNotice && <div className={styles.content}>{notice}</div>}
    <div className={styles.content}>{children}</div>
  </Stack>;
}
```


## Tests


- Verify the named V2 preview composition, independent reset and link to its routed neutral demo.


- Render create and edit using one template and a real caller-owned Form; submit by keyboard and recover from validation/save errors.
- Save pending preserves field values/focus, cancel has explicit unsaved-change behavior, and loading edit never shows an editable empty record.


## Criteria


- [x] Template is a content section inside the existing application main; it adds no main, outer application banner/menu, router, provider or data request.
- [x] Header spacing and title/identity/actions reuse PageHeader. Root padding and region gaps use space-3 tokens; absent optional slots omit their wrappers.
- [x] Pure slots render the exact supplied children. Consumer supplies Skeleton, EmptyState, ErrorState and busy/status semantics for the affected regions rather than a template-owned async state machine.
- [x] Template accepts native section attributes/ref; aria-labelledby targets its caller-provided titleId. No new visual size/tone/appearance axis or empty view hook is introduced.
- [x] PageTransition wraps the changing template and SharedElement wraps known identity content; template does not import feature navigation or duplicate animation CSS.
- [x] Standalone Showcase renders the actual template in an isolated document under one ApplicationLayoutTemplate main; only the complete-flow example adds navigation and simulated requests.
- [x] Create and edit reuse the same template; headings/identity/notice and form configuration are supplied by the feature, without an extra duplicated edit template or unsupported mode axis.
- [x] Template adds no form element. Its child owns the one native form, validation, registered fields, submit handler and footer actions; header actions are navigation, never detached unassociated submit buttons.
- [x] New record has no fictitious shared entity identity. Existing record may retain its known header while form values load, but interactive fields initialize only from accepted record data.
- [x] Save retains entered values, mounted fields and form focus; the actual submit action shows pending state and prevents duplicate submission without replacing the form with a skeleton.
- [x] Only the accepted save response updates detail/list cache and destination identity. A rejected save preserves dirty values and renders actionable field/form feedback.
- [x] Cancel and navigation away from dirty data are feature-owned; dismissing a confirmation preserves the form and does not start a transition or request.
- [x] Standalone Showcase demonstrates create, edit, pending save and rejected save with real Form anatomy/actions and correct native submit associations.


- [x] Simultaneous Showcase form previews and repeated example instances use distinct, stable title transition names generated by the colocated view hook.


- [x] The Record form example composes FormPageTemplate with FormField, Input and Button in supported slots; label="Label" and placeholder="Placeholder" follow the guide, and create/edit modes show required validation, save and cancel outcomes.
- [x] V2 property/method/event/resource documentation matches the real template contract and identifies composition slots; the demo link opens the corresponding full-page route.
- [x] Full-page templates render in a landmark-safe preview or link to the separate demo instead of nesting main landmarks.
- [x] V2 examples use real public exports, local view hooks and deterministic fixtures; reset restores initial state and V1 remains unchanged.


- [x] Each V2 scenario includes minimal copyable TSX in the catalog format: public imports and direct JSX with valid owner/parts; application-owned values and callbacks remain external, without wrapper components, hook bodies or showcase dependencies.


- [x] The full V2 Create/Edit route keeps breadcrumbs, a matching Create action/heading identity or known record title/description from Details, the existing controlled fields, discard handling and accepted-save navigation. Route-owned transition boundaries leave chrome mounted.

- [x] Create and Edit page consumers expose exactly one visually primary native submit action (Create/Save) with `tone="brand" appearance="solid"`; the template itself neither manufactures a button nor changes the caller-owned form element.
- [x] Cancel and Back are `tone="neutral" appearance="ghost"`. Non-destructive secondary assistance can be neutral/bordered or semantically justified sand/bordered; semantic `danger` appears only for confirmed destructive behavior.
- [ ] Preserve native submit association, Enter-key behavior, pending/disabled state, duplicate-submit prevention, dirty-value retention, rejected-save feedback, and discard confirmation. In loading/edit mode, do not show an empty editable record.
- [ ] V1/V2 examples and actual page consumers show the same visible hierarchy, respect keyboard focus and accessible contrast across all themes, and pass form, typecheck, formatting and build checks.

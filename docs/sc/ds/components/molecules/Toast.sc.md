---
title: "Toast"
scope: "Presentation-only Toast with explicit public parts and caller-owned data/actions."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# Toast

## Files

```text
features/showcase/examples/ToastAtomicExamples.tsx (C)
../scripts/check-overlays.cjs (M)
design-system/components/molecules/Toast/Toast.tsx (C)
design-system/components/molecules/Toast/Toast.module.css (C)
design-system/components/molecules/Toast/index.ts (C)
design-system/internal/toast/ToastContext.ts (C)
design-system/index.ts (M)
features/showcase/examples/Toast.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
design-system/components/molecules/Toast/useToastView.ts (C)
features/showcase-v2/components/Toast/definition.ts (C)
features/showcase-v2/components/Toast/Toast.example.tsx (C)
features/showcase-v2/components/Toast/useToastExample.ts (C)
features/showcase-v2/components/Toast/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/components/ToastRegion/fixtures.ts (C)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [tech-collection-contracts.sc.md](../../types/tech-collection-contracts.sc.md)
- [tech-compound-composition.sc.md](../../types/tech-compound-composition.sc.md)
- [tech-notifications.sc.md](../../hooks/tech-notifications.sc.md)
- [Surface.sc.md](../atoms/Surface.sc.md)
- [Button.sc.md](../atoms/Button.sc.md)
- [Animation contracts](../../types/tech-animation-contracts.sc.md)
- [Notification contracts](../../types/tech-notification-contracts.sc.md)
- [ToastHeader](../atoms/ToastHeader.sc.md)
- [ToastBody](../atoms/ToastBody.sc.md)
- [ToastFooter](ToastFooter.sc.md)

## Contract

```tsx
import { ToastRegion, Toast, ToastHeader, ToastBody, ToastFooter } from "@forge-ui/web";
<ToastRegion label="Notifications" defaultRecords={records} renderToast={record => <Toast record={record}><ToastHeader>{record.title}</ToastHeader><ToastBody>{record.message}</ToastBody><ToastFooter>{record.action}</ToastFooter></Toast>} />;
```

## Styles

```css
.root {
  min-inline-size: var(--zero);
  color: var(--color-text-default);
}
```

## Animations

```text
surfacePresence
```

## Hooks

```tsx
"use client";

import type { ComponentAnimationEffectProps, NativeWidgetItemProps, ToastRecord } from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { ToastContext } from "../../../internal/toast/ToastContext";
import { Surface } from "../../atoms/Surface";
import { Button } from "../../atoms/Button";
import { ToastHeader } from "../../atoms/ToastHeader";
import { ToastBody } from "../../atoms/ToastBody";
import { ToastFooter } from "../ToastFooter";
import { useToastView } from "./useToastView";
import styles from "./Toast.module.css";
import effects from "../../../styles/animations/surface-animations.module.css";

export interface ToastProps extends NativeWidgetItemProps, ComponentAnimationEffectProps {
  record: ToastRecord;
}

export function Toast(input: ToastProps) {
  const { children, record, animated, animationEffect, className, props, rootRef, actionRef, dismiss, context } = useToastView(input);
  const parts = children == null ? null : collectCompoundParts(children, { header: ToastHeader, body: ToastBody, footer: ToastFooter }, ["body"]);
  return <ToastContext value={context}>
    <li {...props} ref={rootRef} aria-live="off" className={[styles.root, className].filter(Boolean).join(" ")}>
      <Surface gap="2" padding="2" className={effects[animationEffect]} data-motion-state="entered" data-animated={animated}>
        {parts ? <>{parts.header}{parts.body}{parts.footer}</> : <>
          <ToastHeader>{record.title}</ToastHeader>
          <ToastBody>{record.message}</ToastBody>
          <ToastFooter>{record.action}<Button ref={actionRef} type="button" onClick={dismiss}>{record.dismissLabel}</Button></ToastFooter>
        </>}
      </Surface>
    </li>
  </ToastContext>;
}
```

## Content

```tsx
"use client";

import type { ComponentAnimationEffectProps, NativeWidgetItemProps, ToastRecord } from "../../../types";
import { collectCompoundParts } from "../../../helpers/compound";
import { ToastContext } from "../../../internal/toast/ToastContext";
import { Surface } from "../../atoms/Surface";
import { Button } from "../../atoms/Button";
import { ToastHeader } from "../../atoms/ToastHeader";
import { ToastBody } from "../../atoms/ToastBody";
import { ToastFooter } from "../ToastFooter";
import { useToastView } from "./useToastView";
import styles from "./Toast.module.css";
import effects from "../../../styles/animations/surface-animations.module.css";

export interface ToastProps extends NativeWidgetItemProps, ComponentAnimationEffectProps {
  record: ToastRecord;
}

export function Toast(input: ToastProps) {
  const { children, record, animated, animationEffect, className, props, rootRef, actionRef, dismiss, context } = useToastView(input);
  const parts = children == null ? null : collectCompoundParts(children, { header: ToastHeader, body: ToastBody, footer: ToastFooter }, ["body"]);
  return <ToastContext value={context}>
    <li {...props} ref={rootRef} aria-live="off" className={[styles.root, className].filter(Boolean).join(" ")}>
      <Surface gap="2" padding="2" className={effects[animationEffect]} data-motion-state="entered" data-animated={animated}>
        {parts ? <>{parts.header}{parts.body}{parts.footer}</> : <>
          <ToastHeader>{record.title}</ToastHeader>
          <ToastBody>{record.message}</ToastBody>
          <ToastFooter>{record.action}<Button ref={actionRef} type="button" onClick={dismiss}>{record.dismissLabel}</Button></ToastFooter>
        </>}
      </Surface>
    </li>
  </ToastContext>;
}
```

## Tests

- V2 Scoped toast composition: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Removing or unmounting a record disposes only that record’s lifecycle and timers.
- Focus/pointer pause does not emit a duplicate live announcement.

## Criteria

- [x] A nonempty dismissLabel is required; the default renderer keeps its named dismiss button, while explicit parts own their visible controls.

- [x] Given dismissal, queue updates once and focused-action restoration follows the region policy.
- [x] The record contract uses Required stable id, localized title/message/dismissLabel.
- [x] The animated contract uses true; per-toast visual only.
- [x] Footer action is optional and root dismiss is a native Button.
- [x] Use data-gap="2" on the owned stack.
- [x] Semantic child controls reuse existing Button/Input/Surface recipes; do not copy their palette or sizing selectors.
- [x] Do not postpone queue removal or announcements to fake an exit.
- [x] Reduced motion/animated=false settles immediately.
- [x] useToastView is colocated with Toast and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] Explicit children accept scoped ToastHeader/Body/Footer constructors with required Body, rejecting unknown/duplicate regions; absent children preserve record-driven rendering.
- [x] Custom compositions register their first enabled action for the existing queue focus policy without importing private contexts in consumers.

- [x] V2 **Scoped toast composition**: Use ToastRegion renderToast returning Toast with Header/Body/Footer for an actual indexed ToastRecord. Invoke supported action/dismiss paths, preserve one announcement owner and never render a Toast outside its public scope.
- [x] The Toast V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useToastExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] Contextual V2 collection data reuses the ToastRegion fixture module listed in Files; part pages do not create a second index/key sequence for the same records.

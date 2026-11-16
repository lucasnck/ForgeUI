---
title: "AlertDialogHeader"
scope: "Identity alias of ModalHeader; reuse modal anatomy rather than duplicating rendering/context."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# AlertDialogHeader

## Files

```text
design-system/components/molecules/AlertDialogHeader/index.ts (C)
design-system/index.ts (M)
features/showcase-v2/components/AlertDialogHeader/definition.ts (C)
features/showcase-v2/components/AlertDialogHeader/AlertDialogHeader.example.tsx (C)
features/showcase-v2/components/AlertDialogHeader/useAlertDialogHeaderExample.ts (C)
features/showcase-v2/components/AlertDialogHeader/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-animations.sc.md](../../styles/animations/tech-motion-recipes.sc.md)
- [ModalHeader.sc.md](ModalHeader.sc.md)
- [AlertDialog.sc.md](../organisms/AlertDialog.sc.md)

## Contract

```tsx
import { Modal, AlertDialogHeader, ModalBody } from "@forge-ui/web";
<Modal aria-label="Details"><AlertDialogHeader title="Details"/><ModalBody hidden /></Modal>;
```

## Content

```ts
import type { ModalHeaderProps } from "../ModalHeader";

export interface AlertDialogHeaderProps extends ModalHeaderProps {}
export { ModalHeader as AlertDialogHeader } from "../ModalHeader";
```

## Tests

- V2 AlertDialogHeader contextual region: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- The alias and canonical modal part preserve the same constructor identity.
- Its named Props accepts the parent contract without introducing state or callbacks.
- Modal compound validation accepts the alias without a second wrapper.

## Criteria

- [x] Given alias imports, constructor identity matches the corresponding Modal part.
- [x] The Constructor contract uses Same identity, so Modal compound validation recognizes it.
- [x] Public named Props preserves the shared parent contract; Footer close controls use DialogClose or caller explicit state.

- [x] Showcase demonstrates this component independently with only the required family context, distinct supported content/state variations and no duplicated complete-family preview.

- [x] Part previews reuse the canonical Modal owner and identical public constructors, with only the selected region visible; AlertDialog root retains its separate required description and safe initial action contract.

- [x] V2 **AlertDialogHeader contextual region**: Render AlertDialogHeader through public Dialog using the canonical public alias constructor with the minimum valid siblings. Use a real Heading or owner title slot with Children/Title text; any decorative icon has an aligned Inline gap="2" row outside heading text. Hide/omit optional siblings only where allowed by the owner; link to the full AlertDialog composition. Open from a named trigger and include a visible Close action inside the demonstrated region, with Escape/focus return as additional paths.
- [x] The AlertDialogHeader V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useAlertDialogHeaderExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

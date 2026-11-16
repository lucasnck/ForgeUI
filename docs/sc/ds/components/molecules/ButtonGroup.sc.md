---
title: "ButtonGroup"
scope: "Group related actions while preserving each native button's focus and activation. Excludes toolbar keyboard navigation and automatic propagation of disabled/loading state."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# ButtonGroup

## Files

```text
../package.json (M)
features/showcase/examples/InlineExample.module.css (C)
design-system/components/static-components.contracts.test.ts (C)
../scripts/check-static-components.cjs (C)
design-system/index.ts (M)
design-system/components/molecules/ButtonGroup/ButtonGroup.tsx (C)
design-system/components/molecules/ButtonGroup/ButtonGroup.module.css (C)
design-system/components/molecules/ButtonGroup/index.ts (C)
features/showcase/examples/ButtonGroup.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase-v2/components/ButtonGroup/definition.ts (C)
features/showcase-v2/components/ButtonGroup/ButtonGroup.example.tsx (C)
features/showcase-v2/components/ButtonGroup/useButtonGroupExample.ts (C)
features/showcase-v2/components/ButtonGroup/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-layout.sc.md](../../styles/tech-layout.sc.md)
- [Button.sc.md](../atoms/Button.sc.md)
- [Layout contracts](../../types/tech-layout-contracts.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { ButtonGroup, Button } from "@forge-ui/web";
<ButtonGroup label="Editing actions"><Button>Save</Button><Button>Cancel</Button></ButtonGroup>;
```

## Styles

```css
.root {
  composes: inline from "../../../styles/layout-components.module.css";
  composes: fullWidth from "../../../styles/full-width-components.module.css";
  min-inline-size: var(--zero);
  inline-size: fit-content;
  max-inline-size: var(--size-full);
}
```

## Content

```tsx
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { ComponentSpaceProps } from "../../../types/layout";
import type { ComponentFullWidthProps } from "../../../types/component-capabilities";
import styles from "./ButtonGroup.module.css";

export interface ButtonGroupProps extends ComponentPropsWithRef<"div">, ComponentSpaceProps, ComponentFullWidthProps {
  label: string;
  children: ReactNode;
}

export function ButtonGroup({ children, className, label, gap = "2", padding, fullWidth = false, ...props }: ButtonGroupProps) {
  if (!label.trim()) throw new Error("ButtonGroup requires a nonempty label.");
  return (
    <div
      {...props}
      role="group"
      aria-label={label}
      data-gap={gap}
      data-padding={padding}
      data-full-width={fullWidth || undefined}
      className={[styles.root, className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
```

## Tests

- V2 Action grouping: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Server markup preserves native owner attributes, named semantic regions and permitted child hierarchy.
- One disabled Button does not disable sibling native actions or add a toolbar/tabIndex policy.
- Empty group labels fail; gap, padding and fullWidth map to existing recipes.

## Criteria

- [x] Given the public props, rendering and callbacks follow the defaults and constraints above; unsupported channels are not added.
- [x] Verify: Tab visits every enabled button in DOM order; Enter/Space remain native.
- [x] Verify: Disabled state on one action does not disable its siblings.
- [x] Verify: Layout wraps rather than clipping labels.
- [x] Text and focus consume canonical semantic tokens and recipes; shared contrast and forced-color fallbacks are owned by the token/style specifications.
- [x] The owned layout accommodates caller content; preference changes do not reset caller-owned values.
- [x] Given reduced motion, no required interaction depends on animation; no document/window access occurs during module evaluation or static rendering.
- [x] Consumer import after delivery:
- [x] The label / children contract uses Required; Nonempty group name; actual buttons remain consumer-owned.
- [x] The gap / fullWidth contract uses "2" / false; Existing layout/full-width recipes.
- [x] Focused excerpt only; state/ref/local names are implementation locals, not additional public exports.
- [x] Disabled state on one action does not disable its siblings.
- [x] Layout wraps rather than clipping labels.
- [x] A toolbar requires a separate contract; do not assign role="toolbar".
- [x] Use shared data-gap="2" when this root consumes a layout gap.
- [x] Native list/fieldset margins and borders are reset locally with --zero only where the component owns those elements; interactive controls reuse Button/Input focus recipes.
- [x] No new visual capability axis is added.
- [x] No new tokens, shared recipe or visual value union is introduced by this component.
- [x] Use current semantic token overrides for themes; caller supplies locale text and the component inherits direction.

- [x] V2 **Action grouping**: Compose secondary Cancel and primary Save Buttons with explicit gap="2", using an outer Inline justify="end" for alignment rather than inventing a ButtonGroup justify prop; report independent callbacks and allow wrapping in narrow layouts.
- [x] The ButtonGroup V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useButtonGroupExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

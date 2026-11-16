---
title: "IconButton"
scope: "Compose Button and Icon into an icon-only named native action"
status: "DONE"
type: "component"
ds-level: "molecules"
---

# IconButton

## Files

```text
design-system/components/molecules/IconButton/IconButton.tsx (M)
design-system/components/molecules/IconButton/IconButton.module.css (M)
design-system/components/molecules/IconButton/index.ts (M)
design-system/index.ts (M)
features/showcase/examples/IconButton.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/IconButton/definition.ts (C)
features/showcase-v2/components/IconButton/IconButton.example.tsx (C)
features/showcase-v2/components/IconButton/useIconButtonExample.ts (C)
features/showcase-v2/components/IconButton/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Interactive primitives](../../styles/tech-interactive-primitives.sc.md)
- [Button](../atoms/Button.sc.md)
- [Icon](../atoms/Icon.sc.md)
- [Loading indicators](../../styles/tech-loading-indicators.sc.md)
- [Interactive native controls](../../types/tech-interactive-controls.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)
- [Icon geometry](../../types/tech-icon-geometry.sc.md)

## Contract

```tsx
import { IconButton } from "@forge-ui/web";
<IconButton icon="close" label="Close" size="md"/>;
```

## Styles

```css
.root {
  composes: squareAction from "../../../styles/interactive-primitives.module.css";
}
```

## Content

```tsx
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/Icon";
import type { IconName } from "../../../types/icon-geometry";
import type { ReactElement } from "react";
import type {
  NativeIconButtonProps,
  ComponentAccessibleNameProps,
} from "../../../types/interactive-controls";
import type {
  VisualProps,
  ComponentLoadingProps,
  ComponentVariantProps,
} from "../../../types/component-capabilities";

export interface IconButtonProps
  extends NativeIconButtonProps,
    ComponentAccessibleNameProps,
    VisualProps,
    ComponentLoadingProps,
    ComponentVariantProps {
  icon: IconName;
}
import styles from "./IconButton.module.css";

export function IconButton({
  className,
  icon,
  label,
  loading = false,
  loadingLabel,
  size = "md",
  tone = "brand",
  variant = "solid",
  ...props
}: IconButtonProps): ReactElement {
  if (!label.trim()) {
    throw new Error("IconButton requires a label.");
  }
  return (
    <Button
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      size={size}
      tone={tone}
      variant={variant}
      loading={loading}
      aria-label={loading && loadingLabel?.trim() ? loadingLabel : label}
    >
      {!loading && <Icon name={icon} size="inherit" />}
    </Button>
  );
}
```

## Tests

- V2 Named icon action: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Five sizes, seven tones, six appearances/four variants, three shapes, disabled/loading/focus and caller-owned pressed state are demonstrated.
- [x] All square targets fit one icon or one loading indicator, without clipping or duplicated status.
- [x] Native accessible name, Enter/Space, form type and disabled/loading behavior match Button.
- [x] Exactly one Molecule registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] Exclude visible text, fullWidth stretching, custom activation and a second loading indicator.
- [x] The Defaults contract uses icon and nonempty label required.
- [x] The Constraint 1 contract uses size md, tone brand, variant solid; appearance overrides variant as Button; inherited shape supports square/rounded/pill.
- [x] The Constraint 2 contract uses type button, loading false; disabled OR loading blocks activation.
- [x] The Constraint 3 contract uses loadingLabel optionally supplies a nonblank localized busy accessible name, never visible text; blank copy preserves label.
- [x] The Constraint 4 contract uses Native aria-pressed supports caller-owned toggle state.
- [x] Defaults are those in Signature.
- [x] No nested button or copied Button selectors.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Native activation and focus do not depend on motion completion.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Named icon action**: Use a supported icon and meaningful action label; invoke the actual callback by keyboard/pointer and compare supported disabled/loading behavior.
- [x] The IconButton V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useIconButtonExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

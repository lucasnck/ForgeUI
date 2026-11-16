---
title: "Spinner"
scope: "Reusable circular loading indicator"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# Spinner

## Files

```text
design-system/components/atoms/Spinner/Spinner.tsx (M)
design-system/components/atoms/Spinner/Spinner.module.css (M)
design-system/components/atoms/Spinner/index.ts (M)
design-system/index.ts (M)
features/showcase/examples/Spinner.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
features/showcase-v2/components/Spinner/definition.ts (C)
features/showcase-v2/components/Spinner/Spinner.example.tsx (C)
features/showcase-v2/components/Spinner/useSpinnerExample.ts (C)
features/showcase-v2/components/Spinner/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Loading indicators](../../styles/tech-loading-indicators.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)
- [Animation contracts](../../types/tech-animation-contracts.sc.md)

## Contract

```tsx
import { Spinner } from "@forge-ui/web";
<Spinner size="md" decorative={false} label="Loading"/>;
```

## Styles

```css
.root {
  composes: spinnerSize spinnerTone rotating from "../../../styles/loading-components.module.css";
}
```

## Content

```tsx
import type { HTMLAttributes, ReactElement } from "react";
import type { ComponentSizedProps, ComponentToneProps, ComponentAnimatedProps, } from "../../../types";
import styles from "./Spinner.module.css";
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement>, ComponentSizedProps, ComponentToneProps, ComponentAnimatedProps {
  decorative?: boolean;
  label?: string;
}
export function Spinner({ className, decorative = true, label, size = "md", tone, animated = true, ...props }: SpinnerProps): ReactElement {
  if (!decorative && !label?.trim()) {
    throw new Error("A nondecorative Spinner requires a label.");
  }
  return (<span {...props} className={[styles.root, className].filter(Boolean).join(" ")} data-size={size} data-tone={tone} data-animated={animated} role={decorative ? undefined : "status"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : label} tabIndex={undefined}/>);
}
```

## Tests

- V2 Loading presentation: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] Decorative mode adds no accessible announcement; named mode exposes one status name.
- [x] Five sizes, inherited/seven explicit tones, animated/static, named/decorative and Button-loading compositions are demonstrated.
- [x] Button consumes Spinner instead of private CSS and retains disabled/aria-busy/loadingLabel/type behavior.
- [x] Exactly one Atom registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] Consumer owns asynchronous work and accessible busy region.
- [x] The Defaults contract uses size md, animated true, decorative true.
- [x] The Constraint 1 contract uses Omitted tone inherits currentColor; explicit canonical tone selects action palette.
- [x] The Constraint 2 contract uses Nondecorative mode requires nonempty localized label.
- [x] The Constraint 3 contract uses No fullWidth/shape/value/loading props.
- [x] The Constraint 4 contract uses Button uses decorative size xs with inherited color..
- [x] Defaults are those in Signature.
- [x] No private keyframes or numeric CSS.
- [x] Reduced motion/animated=false retains static ring.
- [x] Never add a live role inside Button.
- [x] loading loop → Existing animated=true → Existing rotating recipe → --motion-spin-duration / --ease-linear.

- [x] V2 **Loading presentation**: Place the indicator beside Text and one named loading status; toggle consumer loading and supported appearance settings without duplicate announcements or fabricated progress.
- [x] The Spinner V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useSpinnerExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

---
title: "Input"
scope: "Native input with shared visual capabilities and caller-owned validation"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# Input

## Files

```text
design-system/index.ts (M)
design-system/components/atoms/Input/Input.tsx (M)
design-system/components/atoms/Input/Input.module.css (M)
design-system/components/atoms/Input/index.ts (M)
features/showcase/examples/Input.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
features/showcase-v2/components/Input/definition.ts (C)
features/showcase-v2/components/Input/Input.example.tsx (C)
features/showcase-v2/components/Input/useInputExample.ts (C)
features/showcase-v2/components/Input/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [Native control recipes](../../styles/tech-native-control-recipes.sc.md)
- [Native Control Contracts and Checkable Styles](../../types/tech-native-control-contracts.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { FormField, Input } from "@forge-ui/web";
<FormField controlId="email" label="Email">
 <Input type="email" name="email" autoComplete="email" required/>
</FormField>;
```

## Styles

```css
.root {
  composes: control from "../../../styles/field-control.module.css";
}
```

```css
.root {
  composes: stateFeedback from "../../../styles/motion-components.module.css";
}
```

## Animations

```text
stateFeedback
```

## Content

```tsx
import type {
  ComponentAnimatedProps,
} from "../../../types/animation";
import type {
  NativeInputProps,
} from "../../../types/native-control-contracts";
import type {
  ComponentFullWidthProps,
  ComponentInvalidProps,
  VisualProps,
} from "../../../types/component-capabilities";
import styles from "./Input.module.css";

export interface InputProps
  extends NativeInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentAnimatedProps,
    ComponentInvalidProps {}

export function Input({
  invalid,
  animated = true,
  className,
  fullWidth = true,
  size = "md",
  tone = "neutral",
  appearance = "bordered",
  shape,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-invalid={invalid ?? ariaInvalid}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-tone={tone}
      data-appearance={appearance}
      data-shape={shape}
      data-animated={animated ? undefined : "false"}
    />
  );
}

```

## Tests

- V2 Controlled text entry: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Exercise controlled typing and native required submission; explicit invalid=false overrides aria-invalid=true.
- Toggle invalid, disabled, animated and mount state; native values and descriptions remain caller-owned.

## Criteria

- [x] Given invalid is supplied, aria-invalid reflects it; otherwise the native aria-invalid value is retained.
- [x] Given omitted visual props, md/neutral/bordered/rounded defaults apply.
- [x] Given native attributes and events, the input forwards them without business logic.
- [x] Given composition with FormField, the control accepts injected IDs and description references.
- [x] Caller supplies value/onChange for controlled input and native validation attributes.
- [x] Excludes API calls, provider access, business validation and implicit field context.
- [x] Native interfaces and fullWidth behavior follow [Native control contracts](../../types/tech-native-control-contracts.sc.md).
- [x] The tone / appearance contract uses neutral / bordered; Canonical visual types.
- [x] The shape contract uses Inherited from the document shape; rounded when nothing is declared; `square`, `rounded` or `pill`; rendered as `data-shape` only when passed.
- [x] The shared `appearance="solid"` value now renders the tone fill, which Input also consumes.
| fullWidth | true | false uses intrinsic width; true fills the parent |
| invalid | undefined | Explicit value overrides aria-invalid, including false |
| value / defaultValue | Native React contract | Caller owns controlled/uncontrolled behavior |
- [x] Native attributes, events, ref and className pass through.
- [x] The shared field-control recipe owns sizing, shape, appearance, tone, focus, disabled and invalid states, and composes fullWidth from full-width-components.module.css after the native-control dependency is delivered.
- [x] Component-specific styles stay local; numeric/color values reference tokens.
- [x] State, callbacks, native form values and focus update immediately.
- [x] rest ↔ hover/pressed → Native pointer/keyboard interaction → Existing root background/border targets → --motion-fast / --ease-standard.
- [x] enabled ↔ disabled → Disabled prop → Native root opacity → --motion-fast / --ease-standard.
- [x] valid ↔ invalid → Existing invalid/aria-invalid prop → Existing border-color target only → --motion-fast / --ease-standard.
- [x] Use only states actually defined by the component; focus outline and error semantics are immediate.
- [x] No validation shake, typing animation, caret movement or delayed submission.
- [x] Controlled updates retarget from the current interpolated frame.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Controlled text entry**: Compose FormField with label="Label", placeholder="Placeholder" and caller-owned value; type/clear and toggle supported disabled/readOnly/invalid states, reporting the actual value channel once.
- [x] The Input V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useInputExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

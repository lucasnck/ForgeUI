---
title: "Checkbox"
scope: "Native checkbox with a filled checked state, shared shape/size/tone contracts and caller-owned label"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# Checkbox

## Files

```text
design-system/components/atoms/Checkbox/Checkbox.tsx (M)
design-system/components/atoms/Checkbox/Checkbox.module.css (M)
design-system/styles/checkable-components.module.css (M)
design-system/styles/tokens.css (M)
../scripts/check-theme.cjs (M)
features/showcase/examples/Checkbox.example.tsx (M)
features/showcase/examples/control-variations.ts (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
design-system/components/atoms/Checkbox/index.ts (M)
features/showcase-v2/components/Checkbox/definition.ts (C)
features/showcase-v2/components/Checkbox/Checkbox.example.tsx (C)
features/showcase-v2/components/Checkbox/useCheckboxExample.ts (C)
features/showcase-v2/components/Checkbox/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Native control contracts](../../types/tech-native-control-contracts.sc.md)
- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Shape contracts](../../styles/tech-shape.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [Native control recipes](../../styles/tech-native-control-recipes.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)
- [Animation contracts](../../types/tech-animation-contracts.sc.md)

## Contract

```tsx
import { Checkbox } from "@forge-ui/web";
<Checkbox size="md" tone="brand" shape="pill" aria-label="Enable option" defaultChecked/>;
```

## Styles

```css
.root {
  composes: checkable from "../../../styles/checkable-components.module.css";
  composes: fullWidth from "../../../styles/full-width-components.module.css";
}
.control {
  composes: indicator from "../../../styles/checkable-components.module.css";
  composes: interactive from "../../../styles/interactive-components.module.css";
  margin: var(--zero);
  cursor: pointer;
}
.control:checked {
  background: var(--checkable-accent);
  border-color: var(--checkable-accent);
}
.control[aria-invalid="true"]:not(:focus-visible) {
  outline: var(--border-width-thin) var(--border-style-default)
    var(--color-text-danger);
  outline-offset: var(--length-1);
}
```

```css
.control {
  composes: stateFeedback from "../../../styles/motion-components.module.css";
}
```

## Animations

```text
stateFeedback
```

## Content

```tsx
import type { NativeCheckboxProps, ComponentSizedProps, ComponentToneProps, ComponentShapeProps, ComponentFullWidthProps, ComponentInvalidProps, ComponentAnimatedProps, } from "../../../types";
import styles from "./Checkbox.module.css";
export interface CheckboxProps extends NativeCheckboxProps, ComponentSizedProps, ComponentToneProps, ComponentShapeProps, ComponentFullWidthProps, ComponentInvalidProps, ComponentAnimatedProps {
}
export function Checkbox({ size = "md", tone = "brand", shape, fullWidth = false, invalid, animated = true, className, "aria-invalid": ariaInvalid, ...props }: CheckboxProps) {
  return (<label className={styles.root} data-size={size} data-tone={tone} data-shape={shape} data-full-width={fullWidth || undefined}>
   <input {...props} type="checkbox" className={[styles.control, className].filter(Boolean).join(" ")} aria-invalid={invalid ?? ariaInvalid} data-animated={animated}/>
  </label>);
}
```

## Tests

- V2 Controlled boolean: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Native required validation blocks the unchecked control; checked enabled named controls submit while disabled named controls do not.
- All seven tone endpoints meet 3:1 against their semantic adjacent surfaces; inverse is demonstrated on --color-surface-inverse.
- Dark brand indicators consume the shared derived checkable token rather than changing the brand palette or action colors.

## Criteria

- [x] Given no type override, the rendered control is always `input[type=checkbox]` with native checkbox semantics.
- [x] Given checked, the box is filled with the tone color and no glyph, tick or pseudo-element is drawn; given unchecked, the box shows the surface fill and the default border.
- [x] Given any tone, the checked fill and the unchecked box each keep at least 3:1 against their adjacent surfaces in light and dark.
- [x] Given a shape value or an inherited document shape, the box radius follows the capability; without either, the box renders no `data-shape` and uses `--radius-md`.
- [x] Given forced colors, the platform indicator returns and the checked state stays distinguishable without relying on the tone fill.
- [x] Given controlled checked/onChange, pointer or Space activation reports the native checked value and the caller controls the next state.
- [x] Given defaultChecked, the browser manages state without a controlled/uncontrolled warning.
- [x] Given disabled, activation is prevented and the shared disabled styling applies.
- [x] Given invalid, aria-invalid reflects it, the danger outline applies outside focus, and a supplied native aria-invalid is otherwise retained.
- [x] Given a visible associated label, clicking it activates the control and supplies its accessible name.
- [x] Given keyboard focus, a visible focus ring remains distinguishable from invalid styling, including forced colors.
- [x] Given required and unchecked, native form validation rejects submission; checked enabled named controls submit their value.
- [x] Given the delivery, `npm run lint`, `npm run test:contracts`, `npm run test:tokens`, `npm run test:design-system` and `npm run build` pass, and only token-backed values appear in the component CSS.
- [x] Includes `size`, `tone`, `shape` and `fullWidth` through canonical capability interfaces.
- [x] Caller owns label, description, validation and localized text.
- [x] Excludes any checkmark, dash, tick or other drawn icon, indeterminate state, checkbox groups, custom indicator elements, API calls and provider access.
- [x] The type contract uses checkbox, internal; Caller cannot change input type.
- [x] The checked / onChange contract uses Native controlled contract; Caller updates checked from event.currentTarget.checked.
- [x] The defaultChecked contract uses Native uncontrolled contract; Do not combine with controlled checked.
- [x] The tone contract uses brand; Fill tone while checked: neutral/brand/success/warning/danger/info/inverse. Brand uses the canonical checkable accent token; inverse requires the caller-owned inverse surface.
- [x] The shape contract uses Inherited from `data-shape`; `rounded` when nothing is declared; `square`, `rounded` or `pill`; rendered as `data-shape` only when passed.
- [x] The fullWidth contract uses false; Expands the wrapper target, never the box.
- [x] The animated contract uses true; false disables native control transitions; reduced motion also disables them.
- [x] The invalid contract uses undefined; Explicit value overrides aria-invalid, including false.
- [x] The disabled / required / name / value contract uses Native contract; No duplicate shared interfaces for native attributes.
- [x] The id / aria-label / aria-labelledby contract uses Caller-supplied; Accessible name required through a label or ARIA.
- [x] Forward native attributes, events, ref and className.
- [x] Only checked, enabled named controls contribute their value to the form.
- [x] The box resolves its radius from the shape capability: the `shape` prop when present, otherwise the nearest `[data-shape]` ancestor, otherwise `--radius-md`.
- [x] Checked fills `--checkable-accent`; unchecked stays on the surface color with the default border; invalid keeps its danger outline; focus and disabled come from the interactive recipe.
- [x] Component-local CSS: `src/design-system/components/atoms/Checkbox/Checkbox.module.css`.
- [x] The label wrapper supplies the sized click target and optional full width; the native input stays the only control element and the only focusable target.
- [x] No `::before`/`::after` and no `background-image` are introduced, so no glyph is drawn.
- [x] Invalid styling must not replace keyboard focus.
- [x] Shared recipes own every size, tone, shape, full-width and disabled selector.
- [x] State, callbacks, native form values and focus update immediately.
- [x] unchecked ↔ checked → Native change or controlled checked → Existing .control background-color and border-color → --motion-fast / --ease-standard.
- [x] enabled ↔ disabled → Native disabled prop → Existing .control opacity via stateFeedback → --motion-fast / --ease-standard.
- [x] Invalid/focus outlines remain immediate.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] The checked state is a tone fill only. That is a deliberate design decision by the approver; the checked fill and the unchecked box hold at least 3:1 against their adjacent surfaces for every tone and theme, so the state stays perceivable, and forced colors restores the platform indicator because the fill is suppressed there. Color is the only *visual* difference between checked and unchecked in normal rendering, which is recorded as an accepted design risk for WCAG 1.4.1; a non-color cue would be an explicit revision of this SC.

- [x] V2 **Controlled boolean**: Compose a connected Label with checked state; keyboard/pointer emits the actual native checked value once, while disabled preserves it.
- [x] The Checkbox V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useCheckboxExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

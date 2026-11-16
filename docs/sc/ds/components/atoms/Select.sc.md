---
title: "Select"
scope: "Native select with the Input bordered appearance by default and explicit tone-filled variants"
status: "PENDING"
type: "component"
ds-level: "atoms"
---

# Select

## Files

```text
design-system/components/atoms/Select/Select.tsx (M)
design-system/components/atoms/Select/Select.module.css (M)
design-system/styles/appearance-components.module.css (M)
design-system/styles/toned-components.module.css (M)
design-system/styles/field-control.module.css (M)
features/showcase/examples/Select.example.tsx (M)
features/showcase/examples/Input.example.tsx (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
design-system/components/atoms/Select/index.ts (M)
features/showcase-v2/components/Select/definition.ts (C)
features/showcase-v2/components/Select/Select.example.tsx (C)
features/showcase-v2/components/Select/useSelectExample.ts (C)
features/showcase-v2/components/Select/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Native control contracts](../../types/tech-native-control-contracts.sc.md)
- [Popup contracts](../../hooks/tech-popup-contracts.sc.md)
- [Input](Input.sc.md)
- [Motion recipes](../../styles/animations/tech-motion-recipes.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { FormField, Select } from "@forge-ui/web";
<FormField controlId="category" label="Category">
 <Select name="category" defaultValue="general">
  <option value="general">General</option>
  <option value="other">Other</option>
 </Select>
</FormField>;
```

## Styles

```css
.appearance[data-appearance="solid"] {
  --control-appearance-background: var(
    --control-solid-background,
    var(--control-background)
  );
  --control-appearance-foreground: var(
    --control-solid-foreground,
    var(--control-foreground)
  );
}
.field {
  --control-solid-foreground: var(--color-action-foreground);
}
.field[data-tone="neutral"] {
  --control-solid-background: var(--color-action-neutral-background);
}
.field[data-tone="brand"] {
  --control-solid-background: var(--color-action-brand-background);
}
.field[data-tone="success"] {
  --control-solid-background: var(--color-action-success-background);
}
.field[data-tone="warning"] {
  --control-solid-background: var(--color-action-warning-background);
}
.field[data-tone="danger"] {
  --control-solid-background: var(--color-action-danger-background);
}
.field[data-tone="info"] {
  --control-solid-background: var(--color-action-info-background);
}
.field[data-tone="inverse"] {
  --control-solid-background: var(--color-surface-inverse);
  --control-solid-foreground: var(--color-text-inverse);
}
.control[data-appearance="solid"][aria-invalid="true"] {
  --control-appearance-background: var(--color-action-danger-background);
  --control-appearance-foreground: var(--color-action-foreground);
}
```

```css
.root {
  composes: control from "../../../styles/field-control.module.css";
  appearance: none;
}
@media (forced-colors: active) {
  .root {
    appearance: auto;
  }
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
import type { NativeSelectProps, ComponentFullWidthProps, ComponentInvalidProps, VisualProps, } from "../../../types";
import styles from "./Select.module.css";
export interface SelectProps extends NativeSelectProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {
}
export function Select({ invalid, className, fullWidth = true, size = "md", tone = "neutral", appearance = "bordered", shape, "aria-invalid": ariaInvalid, ...props }: SelectProps) {
  return (<select {...props} className={[styles.root, className].filter(Boolean).join(" ")} aria-invalid={invalid ?? ariaInvalid} data-size={size} data-full-width={fullWidth || undefined} data-tone={tone} data-appearance={appearance} data-shape={shape}/>);
}
```

## Tests


`node scripts/check-theme.cjs` renders the actual native Input and Select atoms independently of the public-barrel harness and verifies their matching neutral bordered defaults in light/dark contexts. Both continue composing the same field-control recipe without component-local background overrides; explicit solid remains opt-in.

- V2 Indexed native selection: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [ ] Given no `appearance` prop, the rendered select carries `data-appearance="bordered"`, matching the default Input surface and border in every theme.
- [x] Given explicit `appearance="solid"`, the control fill is `--color-action-<tone>-background` with `--color-action-foreground` text; `tone="inverse"` uses `--color-surface-inverse` with `--color-text-inverse`.
- [x] Given `appearance="solid"` and `invalid`, the fill uses `--color-action-danger-background` and `--color-action-foreground`; shared system-border precedence remains unchanged.
- [x] The authored control has no background image, pseudo-element or dropdown icon and uses appearance:none; its forced-colors CSS fallback restores appearance:auto.
- [x] The native select owns its picker, selection and constraint validation; FormField supplies label and description relationships without a custom option list.
- [x] Given `appearance="bordered"`, the control renders the existing bordered field look and still draws no indicator, matching the Input default while preserving native select behavior.
- [x] Given Button, its rendered colors, border and hover are unchanged, because the solid rule falls back to `--control-background` when `--control-solid-background` is unset.
- [x] Preserved from the delivered revision: `aria-invalid` precedence, md/neutral defaults for the other capabilities, native attribute, event and ref passthrough, FormField id/description injection, and `fullWidth` default true. `shape` no longer defaults to `rounded`: the select renders `data-shape` only when the caller passes it, so the document shape applies ([Shape contracts](../../styles/tech-shape.sc.md)).
- [x] Given the delivery, `npm run lint`, `npm run test:tokens`, `npm run test:contracts` and `npm run test:design-system` pass, and no numeric or color literal appears in the modified stylesheets.
- [x] Caller supplies options and value/onChange for controlled selection.
- [ ] Excludes API calls, provider access, business validation, implicit field context, a custom option list or popup, and every icon asset. the filled look remains available through explicit `appearance="solid"`; the component default is `appearance="bordered"` and the dropdown indicator is removed in every appearance.
- [x] The previously delivered scope — shared native interfaces, `fullWidth` default, visual capabilities and FormField relationships — is unchanged by this revision.
- [x] The public contract is unchanged: no new prop, no new type and no new capability.
- [ ] The proposed new default changes only `appearance` to `bordered`; explicit appearance values remain supported.
- [x] The tone contract uses neutral; Selects the fill pair: neutral/brand/success/warning/danger/info, and inverse uses the inverse surface.
- [x] The shape contract uses Inherited from the document shape; rounded when nothing is declared; `square`, `rounded` or `pill`; rendered as `data-shape` only when passed.
- [x] The fullWidth contract uses true; false uses intrinsic width; true fills the parent.
- [x] The invalid contract uses undefined; Explicit value overrides aria-invalid, including false; on a solid control it replaces the fill.
- [x] The value / defaultValue contract uses Native React contract; Caller owns controlled/uncontrolled behavior.
- [x] Native attributes, events, ref and className pass through.
- [x] No icon, arrow or extra element is added to the DOM.
- [x] The behavior lives in the shared recipes, owned by [Design tokens](../../styles/tech-design-tokens.sc.md); the component adds no tone selector.
- [x] `--control-appearance-background`/`--control-appearance-foreground` are read by the existing base `.appearance` rule; no new value is introduced outside `tokens.css`, and the invalid state is additionally announced by the FormField error text, never by color alone.
- [x] A filled invalid control keeps its fill contrast against the page surface (at least 3:1 for the control boundary) and the existing invalid border rule stays in place for the non-solid appearances.
- [x] Component-local CSS: `src/design-system/components/atoms/Select/Select.module.css`.
- [x] The fill, sizing, shape, focus, disabled and invalid recipes belong to [Design tokens](../../styles/tech-design-tokens.sc.md).
- [x] `appearance: none` removes the browser-drawn indicator; no `background-image`, pseudo-element or extra padding replaces it, and the inline padding stays symmetric from the shared sizing recipe.
- [x] The focus ring is unchanged: the interactive recipe draws it with `outline-offset`, so it sits on the page surface and `--color-focus-ring` keeps its contrast against the filled control.
- [x] The disabled opacity comes from the same recipe.
- [x] The native `<option>` list keeps the platform rendering.
- [x] State, callbacks, native form values and focus update immediately.
- [x] rest ↔ hover/pressed → Native pointer/keyboard interaction → Existing root background/border targets → --motion-fast / --ease-standard.
- [x] enabled ↔ disabled → Disabled prop → Native root opacity → --motion-fast / --ease-standard.
- [x] valid ↔ invalid → Existing invalid/aria-invalid prop → Existing border-color target only → --motion-fast / --ease-standard.
- [x] Use only states actually defined by the component; focus outline and error semantics are immediate.
- [x] No validation shake, typing animation, caret movement or delayed submission.
- [x] Controlled updates retarget from the current interpolated frame.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Indexed native selection**: Compose Select/FormField with three Options labeled Children 1..3 and stable item-1..3 values; change selection and report native value while the contextual Option page links to Select.
- [x] The Select V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useSelectExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

- [ ] The default `Select` visual appearance is `bordered`, exactly matching a default `Input` (shared field-control background, text and border tokens) in light and dark.
- [ ] Explicit `appearance="solid"` still uses tone-based fills without changing the generic Input or Button defaults.
- [ ] Existing controlled/uncontrolled selection, `aria-invalid`, native focus, disabled state, forced colors and fullWidth behavior remain unchanged.
- [ ] Update existing focused tests and Showcase V2 examples only if their declared defaults are coupled to the former solid value; verify targeted checks and actual dark/light browser result before changing to DONE.
- [ ] Run Prettier/ESLint for changed supported files only, then typecheck and relevant `test:design-system`, `test:tokens`, `test:contracts` / theme checks.

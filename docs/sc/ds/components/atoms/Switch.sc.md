---
title: "Switch"
scope: "Native checkbox with switch semantics and position-changing thumb"
status: "DONE"
type: "component"
ds-level: "atoms"
---

# Switch

## Files

```text
design-system/components/atoms/Switch/Switch.module.css (M)
design-system/styles/tokens.css (M)
design-system/styles/interactive-primitives.module.css (M)
features/showcase/examples/Switch.example.tsx (M)
features/showcase/examples/ShowcaseExamples.module.css (M)
design-system/components/atoms/Switch/index.ts (M)
design-system/components/atoms/Switch/Switch.tsx (M)
features/showcase-v2/components/Switch/definition.ts (C)
features/showcase-v2/components/Switch/Switch.example.tsx (C)
features/showcase-v2/components/Switch/useSwitchExample.ts (C)
features/showcase-v2/components/Switch/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Interactive primitives](../../styles/tech-interactive-primitives.sc.md)
- [Interactive native controls](../../types/tech-interactive-controls.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { Switch } from "@forge-ui/web";
<Switch id="notifications" name="notifications" aria-label="Notifications"/>;
```

## Styles

```css
.control {
  composes: switchInput from "../../../styles/interactive-primitives.module.css";
}
```

## Content

```tsx
import type { ReactElement } from "react";
import type { NativeSwitchProps, ComponentSizedProps, ComponentToneProps, ComponentFullWidthProps, ComponentInvalidProps, } from "../../../types";
import styles from "./Switch.module.css";
export interface SwitchProps extends NativeSwitchProps, ComponentSizedProps, ComponentToneProps, ComponentFullWidthProps, ComponentInvalidProps {
}
export function Switch({ className, fullWidth = false, invalid, size = "md", tone = "brand", "aria-invalid": ariaInvalid, ...props }: SwitchProps): ReactElement {
  return (<span className={styles.root} data-size={size} data-tone={tone} data-full-width={fullWidth || undefined}>
   <input {...props} className={[styles.control, className].filter(Boolean).join(" ")} type="checkbox" role="switch" aria-invalid={invalid ?? ariaInvalid}/>
   <span className={styles.track} aria-hidden="true">
  <span className={styles.thumb}/>
   </span>
  </span>);
}
```

## Tests

- V2 Controlled boolean: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

## Criteria

- [x] At md with the default root font, the visible rail measures 48 × 16px and thumb diameter measures 24px; the native hit target remains at least 48px high.
- [x] At every size, the circular thumb is taller than the low pill rail and occupies opposite logical ends when checked changes.
- [x] Enabled on/off controls show a thumb-centered circular halo for hover, focus-visible and pressed; disabled controls show none.
- [x] Keyboard focus has an immediate visible outline; checked and unchecked remain distinguishable in forced colors.
- [x] Checked reversals converge to the latest state without delaying semantic callbacks or losing focus; reduced motion settles all switch transitions immediately.
- [x] Space and external label toggle native checked; disabled activation does nothing and checked form value is submitted once.
- [x] Controlled event emits native ChangeEvent and parent owns the checked update; no duplicated state.
- [x] Showcase covers five sizes, seven tones, widths, checked/unchecked, disabled, required, invalid and RTL; the canonical shared recipe owns focus and reduced-motion fallbacks.
- [x] Exactly one Atom registration exists in Showcase; examples cover its supported public capabilities.
- [x] Lint, type, token and static-export checks pass; canonical interfaces/recipes are reused.
- [x] The visual revision requested uses a low pill track, a larger overhanging thumb and a circular interaction halo, retaining Praticar's semantic palette.
- [x] Supports binary controlled/uncontrolled state and native form attributes.
- [x] Exclude mixed state, auto-saving, shape/appearance and custom event protocol.
- [x] The public API remains unchanged.
- [x] The Defaults contract uses size md, tone brand, fullWidth false.
- [x] The Constraint 1 contract uses invalid undefined preserves aria-invalid; explicit false overrides it.
- [x] The Constraint 2 contract uses Fixed role switch/type checkbox.
- [x] The Constraint 3 contract uses Native checked/defaultChecked/onChange/ref/name/value/required forwarded.
- [x] The Constraint 4 contract uses Label remains stable while state changes; no redundant aria-checked..
- [x] Defaults are those in Signature.
- [x] Root/track/thumb compose switchTarget/switchTrack/switchThumb.
- [x] The transparent native input covers the full target and receives focus/clicks; decorations have pointer-events none.
- [x] Target minimum height follows the existing checkable size tokens, independently of the smaller visible track. fullWidth expands the target without stretching the track or thumb.
- [x] xs / sm → --length-5 × --length-2 → --length-3.
- [x] md → --length-6 × --length-2 → --length-3.
- [x] lg → --length-7 × --length-3 → --length-4.
- [x] xl → --length-8 × --length-3 → --length-4.
- [x] The track uses --radius-full to produce a pill with straight middle segments rather than an ellipse.
- [x] The thumb and halo use --radius-circle.
- [x] The thumb is vertically centered and extends beyond the track height; logical inset-inline-start moves from --zero to track width minus thumb diameter.
- [x] A circular halo follows the thumb on enabled hover, focus-visible and pressed states.
- [x] Disabled state dims the complete visual control and suppresses the halo.
- [x] Keyboard focus adds an immediate visible outline independently of the halo.
- [x] Invalid state keeps its existing visible error outline; focus takes precedence while focused.
- [x] Shared interactive-primitives.module.css owns exact palette/state-layer tokens, size/tone mappings, RTL displacement, reduced motion and forced colors.
- [x] No geometry, state selector or motion recipe is duplicated in Switch.module.css.
- [x] The image is a geometry reference; its purple color is not a new project palette.
- [x] The shared interactive-primitives.module.css recipe remains the single motion owner.
- [x] State, callbacks, native form values and focus update immediately.
- [x] off ↔ on → Native checked change or controlled checked prop → Thumb inset-inline-start and background-color; rail background-color → --motion-fast / --ease-standard; retarget current frame to latest state.
- [x] resting ↔ hover / focus-visible → Enabled native input pointer/focus state → Thumb halo opacity → --motion-fast / --ease-standard; latest interaction wins.
- [x] hover / focus-visible ↔ pressed → Enabled native input active state → Halo opacity → --motion-fast / --ease-standard; pressed takes precedence.
- [x] enabled ↔ disabled → Disabled prop → Complete visible control opacity; halo removed → Immediate; disabled suppresses interaction styling.
- [x] Focus outlines appear immediately. prefers-reduced-motion: reduce disables all switch transitions while retaining final geometry, state colors and focus indication; changing the preference during motion settles to the latest state.
- [x] No mount retention, completion listener, keyframe or teardown lifecycle is needed; unmount cancels presentation normally.

- [x] V2 **Controlled boolean**: Compose a connected Label with checked state; keyboard/pointer emits the actual native checked value once, while disabled preserves it.
- [x] The Switch V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useSwitchExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

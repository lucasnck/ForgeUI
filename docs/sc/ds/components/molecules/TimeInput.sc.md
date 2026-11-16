---
title: "TimeInput"
scope: "Render native time input; string values use the HTML time format and have no timezone semantics."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TimeInput

## Files

```text
design-system/index.ts (M)
design-system/components/molecules/TimeInput/index.ts (C)
design-system/components/molecules/TimeInput/TimeInput.tsx (C)
features/showcase/examples/TimeInput.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-inputs.cjs (C)
features/showcase/examples/InputFamilyExample.tsx (C)
features/showcase-v2/components/TimeInput/definition.ts (C)
features/showcase-v2/components/TimeInput/TimeInput.example.tsx (C)
features/showcase-v2/components/TimeInput/useTimeInputExample.ts (C)
features/showcase-v2/components/TimeInput/usage-code.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [tech-input-specializations.sc.md](../../types/tech-input-specializations.sc.md)
- [Input.sc.md](../atoms/Input.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import { TimeInput } from "@forge-ui/web";
<TimeInput name="startTime" aria-label="Start time" step={60}/>;
```

## Content

```tsx
import { Input } from "../../atoms/Input";
import type { NativeSpecializedInputProps } from "../../../types/input-specializations";
import type { VisualProps, ComponentFullWidthProps, ComponentInvalidProps } from "../../../types/component-capabilities";

export interface TimeInputProps extends NativeSpecializedInputProps, VisualProps, ComponentFullWidthProps, ComponentInvalidProps {}

export function TimeInput(props: TimeInputProps) {
  return <Input {...props} type="time" />;
}
```

## Tests

- V2 Typed native entry: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Render without browser globals and verify forwarded native attributes and the documented value channel.
- Verify explicit invalid=false overrides aria-invalid=true and fullWidth=false preserves the intrinsic contract.
- Verify shared input capabilities use canonical contracts without introducing another visual recipe.

## Criteria

- [x] Given the public props, rendering and callbacks follow the defaults and constraints above; unsupported channels are not added.
- [x] Verify: Value is HH:mm or HH:mm:ss according to step.
- [x] Verify: Native min/max/step and keyboard editing apply.
- [x] Verify: Do not convert to Date, UTC or browser-local timestamps.
- [x] Native interactions remain delegated to the control; custom handlers intercept only documented keys, respect composition and prevent activation when disabled.
- [x] Text and focus consume canonical semantic tokens and recipes; shared contrast and forced-color fallbacks are owned by the token/style specifications.
- [x] The owned layout accommodates caller content; preference changes do not reset caller-owned values.
- [x] Given reduced motion, no required interaction depends on animation; no document/window access occurs during module evaluation or static rendering.
- [x] The fullWidth / invalid contract uses true / undefined; Forward to Input; explicit invalid wins over aria-invalid.
- [x] The value / defaultValue / onChange contract uses Native; Never switch controlled mode after mount; event contains the native string.
- [x] The disabled / readOnly / required contract uses false; Preserve native semantics.
- [x] The type contract uses time; Fixed by the wrapper; excluded from its native props.
- [x] The step contract uses Native 60 seconds; Native min/max use time strings.
- [x] Value is HH:mm or HH:mm:ss according to step.
- [x] Empty remains empty.
- [x] Native min/max/step and keyboard editing apply.
- [x] Do not convert to Date, UTC or browser-local timestamps.
- [x] No new tokens, shared recipe or visual value union is introduced by this component.
- [x] Use current semantic token overrides for themes; caller supplies locale text and the component inherits direction.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Native field value and focus stay unchanged by motion.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Typed native entry**: Use valid typed fixtures and supported native constraints from this Contract within FormField; edit/clear and report native canonical values without replacing typed data with prop-name strings.
- [x] The TimeInput V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTimeInputExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

---
title: "PercentageInput"
scope: "Compose NumberInput and a noninteractive percent addon. Values are percentage points, not a normalized fraction; excludes locale parsing and business validation."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# PercentageInput

## Files

```text
design-system/index.ts (M)
design-system/components/molecules/PercentageInput/index.ts (C)
design-system/components/molecules/PercentageInput/PercentageInput.tsx (C)
features/showcase/examples/PercentageInput.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase/examples/InputFamilyExample.tsx (M)
../scripts/check-inputs.cjs (C)
features/showcase-v2/components/PercentageInput/definition.ts (C)
features/showcase-v2/components/PercentageInput/PercentageInput.example.tsx (C)
features/showcase-v2/components/PercentageInput/usePercentageInputExample.ts (C)
features/showcase-v2/components/PercentageInput/usage-code.ts (C)
features/showcase-v2/model/specialized-input-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/messages/useShowcaseV2Copy.ts (M)
features/showcase-v2/components/PercentageInput/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [NumberInput.sc.md](NumberInput.sc.md)
- [InputGroup.sc.md](InputGroup.sc.md)
- [InputAddon.sc.md](InputAddon.sc.md)

## Contract

```tsx
import { PercentageInput } from "@forge-ui/web";
<PercentageInput name="rate" aria-label="Rate in percent" step={0.1}/>;
```

## Content

```tsx
import { InputGroup } from "../InputGroup";
import { InputAddon } from "../InputAddon";
import { NumberInput } from "../NumberInput";
import type { NumberInputProps } from "../NumberInput";

export interface PercentageInputProps extends NumberInputProps {}

export function PercentageInput({ fullWidth = true, ...props }: PercentageInputProps) {
  return (
    <InputGroup fullWidth={fullWidth} trailing={<InputAddon aria-hidden="true">%</InputAddon>}>
      <NumberInput
        min={0}
        max={100}
        step={1}
        {...props}
        fullWidth={fullWidth}
      />
    </InputGroup>
  );
}
```

## Tests

- V2 Native numeric constraints: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Render without browser globals and verify forwarded native attributes and the documented value channel.
- Verify explicit invalid=false overrides aria-invalid=true and fullWidth=false preserves the intrinsic contract.
- Verify shared input capabilities use canonical contracts without introducing another visual recipe.

## Criteria

- [x] Given the public props, rendering and callbacks follow the defaults and constraints above; unsupported channels are not added.
- [x] Verify: id, name, aria-describedby and invalid belong to NumberInput, never the wrapper.
- [x] Verify: The caller label includes the percent unit because the suffix is decorative.
- [x] Verify: Empty/partial input stays native; never divide/multiply by 100.
- [x] Native interactions remain delegated to the control; custom handlers intercept only documented keys, respect composition and prevent activation when disabled.
- [x] Text and focus consume canonical semantic tokens and recipes; shared contrast and forced-color fallbacks are owned by the token/style specifications.
- [x] The owned layout accommodates caller content; preference changes do not reset caller-owned values.
- [x] Given reduced motion, no required interaction depends on animation; no document/window access occurs during module evaluation or static rendering.
- [x] The fullWidth / invalid contract uses true / undefined; Forward to Input; explicit invalid wins over aria-invalid.
- [x] The value / defaultValue / onChange contract uses Native; Never switch controlled mode after mount; event contains the native string.
- [x] The disabled / readOnly / required contract uses false; Preserve native semantics.
- [x] The min / max / step contract uses 0 / 100 / 1; Overridable native bounds; 12.5 means 12.5 percent.
- [x] The caller label includes the percent unit because the suffix is decorative.
- [x] Empty/partial input stays native; never divide/multiply by 100.
- [x] No new tokens, shared recipe or visual value union is introduced by this component.
- [x] Use current semantic token overrides for themes; caller supplies locale text and the component inherits direction.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Native field value and focus stay unchanged by motion.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Native numeric constraints**: Compose FormField with valid supported min/max/step values; type/increment/clear and compare valid/invalid native data without inventing business validation.
- [x] The PercentageInput V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. usePercentageInputExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

---
title: "DateInput"
scope: "Compose a caller-selected numeric date mask without calendar validation or timezone interpretation. Follow the existing mask SC raw-value contract; this is not a native date picker."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# DateInput

## Files

```text
design-system/index.ts (M)
design-system/components/molecules/DateInput/DateInput.tsx (C)
design-system/components/molecules/DateInput/index.ts (C)
features/showcase/examples/DateInput.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
features/showcase/examples/InputFamilyExample.tsx (M)
../scripts/check-inputs.cjs (C)
features/showcase-v2/components/DateInput/definition.ts (C)
features/showcase-v2/components/DateInput/DateInput.example.tsx (C)
features/showcase-v2/components/DateInput/useDateInputExample.ts (C)
features/showcase-v2/components/DateInput/usage-code.ts (C)
features/showcase-v2/model/specialized-input-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/messages/useShowcaseV2Copy.ts (M)
features/showcase-v2/components/InputFixtures/HelperResults.tsx (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/components/DateInput/fixtures.ts (C)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [MaskedInput.sc.md](MaskedInput.sc.md)
- [tech-mask.sc.md](../../hooks/tech-mask.sc.md)

## Contract

```tsx
import { MASK_DATE_DMY } from "@forge-ui/web";
import { DateInput } from "@forge-ui/web";
<DateInput mask={MASK_DATE_DMY} value={rawDate} onValueChange={setRawDate} aria-label="Date, day month year"/>;
```

## Content

```tsx
import { MaskedInput } from "../MaskedInput";
import type { MaskedInputProps } from "../MaskedInput";

export interface DateInputProps extends MaskedInputProps {}

export function DateInput(props: DateInputProps) {
  return <MaskedInput {...props} />;
}
```

## Tests

- V2 Canonical masked entry: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Render without browser globals and verify forwarded native attributes and the documented value channel.
- Verify explicit invalid=false overrides aria-invalid=true and fullWidth=false preserves the intrinsic contract.
- Verify shared input capabilities use canonical contracts without introducing another visual recipe.

## Criteria

- [x] Given the public props, rendering and callbacks follow the defaults and constraints above; unsupported channels are not added.
- [x] Verify: Native input type remains text through MaskedInput.
- [x] Verify: Do not parse partial values with Date, convert to ISO or accept a country/locale assumption implicitly.
- [x] Verify: The mask constants and masked native/ref contract use their canonical delivered owners.
- [x] Native interactions remain delegated to the control; custom handlers intercept only documented keys, respect composition and prevent activation when disabled.
- [x] Text and focus consume canonical semantic tokens and recipes; shared contrast and forced-color fallbacks are owned by the token/style specifications.
- [x] The owned layout accommodates caller content; preference changes do not reset caller-owned values.
- [x] Given reduced motion, no required interaction depends on animation; no document/window access occurs during module evaluation or static rendering.
- [x] The mask / value / onValueChange contract uses Required; Consumer chooses date order and stores raw digits.
- [x] The placeholder / aria-describedby contract uses Caller supplied; Explain the selected format visibly.
- [x] The calendar validation contract uses Consumer owned; Eight digits alone do not prove a real date.
- [x] Native input type remains text through MaskedInput.
- [x] Do not parse partial values with Date, convert to ISO or accept a country/locale assumption implicitly.
- [x] The mask constants and masked native/ref contract use their canonical delivered owners.
- [x] No new tokens, shared recipe or visual value union is introduced by this component.
- [x] Use current semantic token overrides for themes; caller supplies locale text and the component inherits direction.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Native field value and focus stay unchanged by motion.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Canonical masked entry**: Use the actual public mask/preset in the existing Contract with FormField; type/delete/paste a valid fixture and clear it, showing display text separately from onValueChange canonical data.
- [x] The DateInput V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useDateInputExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] V2 supporting fixture **Civil date display** in the DateInput example uses the actual [helper contract](../../helpers/tech-date-only-formatters.sc.md): Compare valid leap-day and invalid civil-date fixtures through actual dateOnly formatter/validator APIs, with explicit locales and no timezone shift. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.

- [x] V2 mask presets restore matching valid caller-owned fixture digits: date DMY/YMD or document CPF/numeric CNPJ/alphanumeric CNPJ. Other display/validation behavior remains with the public DS contracts.

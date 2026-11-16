---
title: "TaxIdInput"
scope: "Presentation wrapper around MaskedInput for a caller-owned tax identifier format. No country, checksum, network lookup or business rule is assumed."
status: "DONE"
type: "component"
ds-level: "molecules"
---

# TaxIdInput

## Files

```text
design-system/index.ts (M)
design-system/components/molecules/TaxIdInput/index.ts (C)
design-system/components/molecules/TaxIdInput/TaxIdInput.tsx (C)
features/showcase/examples/TaxIdInput.example.tsx (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-inputs.cjs (C)
features/showcase/examples/InputFamilyExample.tsx (C)
features/showcase-v2/components/TaxIdInput/definition.ts (C)
features/showcase-v2/components/TaxIdInput/TaxIdInput.example.tsx (C)
features/showcase-v2/components/TaxIdInput/useTaxIdInputExample.ts (C)
features/showcase-v2/components/TaxIdInput/usage-code.ts (C)
features/showcase-v2/model/specialized-input-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/messages/useShowcaseV2Copy.ts (M)
features/showcase-v2/components/InputFixtures/HelperResults.tsx (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/components/TaxIdInput/fixtures.ts (C)
```

## Dependencies

- [tech-design-tokens.sc.md](../../styles/tech-design-tokens.sc.md)
- [MaskedInput.sc.md](MaskedInput.sc.md)
- [tech-mask.sc.md](../../hooks/tech-mask.sc.md)

## Contract

```tsx
import { TaxIdInput } from "@forge-ui/web";
<TaxIdInput mask={taxIdMask} value={rawValue} onValueChange={setRawValue} aria-label="Tax identifier"/>;
```

## Content

```tsx
import { MaskedInput } from "../MaskedInput";
import type { MaskedInputProps } from "../MaskedInput";

export interface TaxIdInputProps extends MaskedInputProps {}

export function TaxIdInput(props: TaxIdInputProps) {
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
- [x] Verify: Consumer variables in the expression are caller state, callbacks and format configuration.
- [x] Verify: Preserve leading zeros, paste and caret rules from MaskedInput.
- [x] Verify: Completeness is structural, never semantic validity.
- [x] Native interactions remain delegated to the control; custom handlers intercept only documented keys, respect composition and prevent activation when disabled.
- [x] Text and focus consume canonical semantic tokens and recipes; shared contrast and forced-color fallbacks are owned by the token/style specifications.
- [x] The owned layout accommodates caller content; preference changes do not reset caller-owned values.
- [x] Given reduced motion, no required interaction depends on animation; no document/window access occurs during module evaluation or static rendering.
- [x] The mask / value / onValueChange contract uses Required; Raw characters; mask supplied by the consumer.
- [x] The visual, invalid and fullWidth props contract uses MaskedInput defaults; Forward unchanged.
- [x] The autoComplete contract uses undefined; Caller may override.
- [x] Consumer variables in the expression are caller state, callbacks and format configuration.
- [x] Preserve leading zeros, paste and caret rules from MaskedInput.
- [x] No new tokens, shared recipe or visual value union is introduced by this component.
- [x] Use current semantic token overrides for themes; caller supplies locale text and the component inherits direction.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Native field value and focus stay unchanged by motion.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.

- [x] V2 **Canonical masked entry**: Use the actual public mask/preset in the existing Contract with FormField; type/delete/paste a valid fixture and clear it, showing display text separately from onValueChange canonical data.
- [x] The TaxIdInput V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useTaxIdInputExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] V2 supporting fixture **Document formatting and validation** in the TaxIdInput example uses the actual [helper contract](../../helpers/tech-brazilian-document-formatters.sc.md): Compare the actual formatters/validators for valid CPF, numeric CNPJ and supported alphanumeric CNPJ fixtures, plus invalid check digits. Show normalized display and validation separately; examples do not certify registration status. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.

- [x] V2 mask presets restore matching valid caller-owned fixture digits: date DMY/YMD or document CPF/numeric CNPJ/alphanumeric CNPJ. Other display/validation behavior remains with the public DS contracts.

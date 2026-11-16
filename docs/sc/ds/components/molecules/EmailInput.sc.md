---
title: "EmailInput"
scope: "Controlled email field that requests the mobile email keyboard and completes the domain with caller-supplied provider suggestions"
status: "DONE"
type: "component"
ds-level: "molecules"
---

# EmailInput

## Files

```text
design-system/index.ts (M)
design-system/components/molecules/EmailInput/EmailInput.tsx (M)
design-system/components/molecules/EmailInput/EmailInput.module.css (M)
design-system/components/molecules/EmailInput/index.ts (M)
features/showcase/examples/EmailInput.example.tsx (M)
features/showcase/examples/useExampleCopy.ts (M)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-design-system.cjs (M)
design-system/components/molecules/EmailInput/useEmailInput.ts (C)
../scripts/check-hooks.cjs (M)
features/showcase-v2/components/EmailInput/definition.ts (C)
features/showcase-v2/components/EmailInput/EmailInput.example.tsx (C)
features/showcase-v2/components/EmailInput/useEmailInputExample.ts (C)
features/showcase-v2/components/EmailInput/usage-code.ts (C)
features/showcase-v2/model/specialized-input-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/messages/useShowcaseV2Copy.ts (M)
features/showcase-v2/components/EmailInput/fixtures.ts (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
```

## Dependencies

- [Design tokens](../../styles/tech-design-tokens.sc.md)
- [Popup contracts](../../hooks/tech-popup-contracts.sc.md)
- [PopupListbox](PopupListbox.sc.md)
- [Native control contracts](../../types/tech-native-control-contracts.sc.md)
- [Popup recipes](../../styles/tech-popup-recipes.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)
- [Popup contracts](../../types/tech-popup-types.sc.md)

## Contract

```tsx
import { EmailInput, FormField } from "@forge-ui/web";
<FormField controlId="signup-email" label={emailLabel} hint={emailHint}>
 <EmailInput name="email" required value={email} onValueChange={setEmail} providers={["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"]} listboxLabel={providerSuggestionsLabel}/>
</FormField>;
```

## Styles

```css
.root {
  composes: anchor from "../../../styles/popup-components.module.css";
}
```

## Hooks

```tsx
"use client";
import { useId } from "react";
import type { ComponentPropsWithRef } from "react";
import { usePopupListbox } from "../../../hooks/popup";
import type { EmailInputProps } from "./EmailInput";
interface EmailDomainSuggestions {
  atIndex: number;
  key: string;
  domains: readonly string[];
}

function resolveEmailDomainSuggestions(
  value: string,
  providers: readonly string[],
  maxSuggestions: number,
): EmailDomainSuggestions | null {
  const atIndex = value.lastIndexOf("@");
  if (atIndex < 1 || maxSuggestions < 1) return null;
  const fragment = value.slice(atIndex + 1).toLowerCase();
  const domains = providers
    .filter(
      (domain) =>
        domain.length > fragment.length &&
        domain.toLowerCase().startsWith(fragment),
    )
    .slice(0, maxSuggestions);
  return domains.length
    ? { atIndex, key: `${atIndex}:${fragment}`, domains }
    : null;
}


export function useEmailInput(input: EmailInputProps) {
  const { value, onValueChange, providers, maxSuggestions = 4, id, listboxLabel, onFocus, onBlur, onKeyDown, ...props } = input;
  const generatedId = useId();
  const controlId = id ?? "email-" + generatedId;
  const suggestion = props.disabled || props.readOnly
    ? null
    : resolveEmailDomainSuggestions(value, providers, maxSuggestions);
  const popup = usePopupListbox({ id: controlId, count: suggestion?.domains.length ?? 0, queryKey: suggestion?.key ?? null,
    onAcceptOption: (index) => { if (suggestion) onValueChange(value.slice(0, suggestion.atIndex + 1) + suggestion.domains[index]); },
  });
  const handleChange: NonNullable<ComponentPropsWithRef<"input">["onChange"]> = (event) => onValueChange(event.currentTarget.value);
  const handleKeyDown: NonNullable<ComponentPropsWithRef<"input">["onKeyDown"]> = (event) => { onKeyDown?.(event); if (!event.defaultPrevented) popup.onKeyDown(event); };
  const handleFocus: NonNullable<ComponentPropsWithRef<"input">["onFocus"]> = (event) => { onFocus?.(event); if (!event.defaultPrevented) popup.onFocus(event); };
  const handleBlur: NonNullable<ComponentPropsWithRef<"input">["onBlur"]> = (event) => { onBlur?.(event); if (!event.defaultPrevented) popup.onBlur(event); };
  return { props, controlId, value, suggestion, popup, listboxLabel, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur, onKeyDown: handleKeyDown };
}
```

## Content

```tsx
"use client";

import { useEmailInput } from "./useEmailInput";
import type { ReactElement } from "react";
import type {
  ComponentFullWidthProps,
  ComponentInvalidProps,
  VisualProps,
} from "../../../types/component-capabilities";
import type {
  ComponentPopupProps,
} from "../../../types/popup";
import type {
  NativeEmailInputProps,
} from "../../../types/native-control-contracts";
import { Input } from "../../atoms/Input";
import { PopupListbox } from "../PopupListbox";
import styles from "./EmailInput.module.css";

export interface EmailInputProps
  extends NativeEmailInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps,
    ComponentPopupProps {
  value: string;
  onValueChange: (value: string) => void;
  providers: readonly string[];
  maxSuggestions?: number;
}

export function EmailInput(input: EmailInputProps): ReactElement {
  const { props, controlId, value, suggestion, popup, listboxLabel, onChange, onFocus, onBlur, onKeyDown } = useEmailInput(input);
  return <div className={styles.root}>
    <Input {...props} id={controlId} type="email" inputMode="email" autoComplete="email" autoCapitalize="none" autoCorrect="off" spellCheck={false} value={value} {...popup.comboboxAttributes} aria-autocomplete="list" onChange={onChange} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} />
    <PopupListbox popup={popup} items={suggestion?.domains ?? []} getOptionLabel={(domain) => "@" + domain} listboxLabel={listboxLabel} />
  </div>;
}
```

## Tests

- V2 Provider completion: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- The declared native or controlled value channel forwards one user change while prop updates emit no corrective callback.
- Caller-prevented and composing input does not trigger an owned selection/completion action.
- Two mounted instances preserve independent ids, descriptions and native submission values.

## Criteria

- [x] Given disabled or readOnly, no suggestion is exposed or accepted and no option id remains active.

- [x] Given a focused field, the rendered control is `input[type=email]` with `inputmode=email`, `autocomplete=email`, `autocapitalize=none`, `autocorrect=off` and `spellcheck=false`, and no prop can replace them because `NativeEmailInputProps` omits those fields.
- [x] Given providers `["gmail.com", "outlook.com", "yahoo.com"]` and value `ana@gm`, when the field is focused, then exactly one option `@gmail.com` is rendered with `role="option"` and the combobox points at it through `aria-activedescendant` once it is active.
- [x] Given value `ana@`, then providers are listed in declaration order, limited to `maxSuggestions` (default 4); given `maxSuggestions={2}`, exactly two options are rendered; given `maxSuggestions={0}`, no listbox is rendered.
- [x] Given value `ana@gmail.com` (complete domain), value `ana` (no `@`) or value `@gmail` (no local part), then no listbox is rendered, `aria-expanded` is `false` and no option id is referenced.
- [x] Given a case-insensitive match, when the suggestion is accepted, then the typed local part and the provider domain are preserved verbatim (`Ana@GM` accepted as `gmail.com` yields `Ana@gmail.com`).
- [x] Given the open listbox, when ArrowDown then Enter is pressed, then `onValueChange` receives the completed address, the native submit is prevented, and the listbox disappears once the new value is applied.
- [x] Given the open listbox with no active option, when Enter is pressed, then EmailInput does not intercept the key and the enclosing form submits natively.
- [x] Given the open listbox, when Escape is pressed, then the listbox closes without changing the value or focus, and typing another character reopens it.
- [x] Given a pointer press on an option, then [PopupListbox](PopupListbox.sc.md) prevents pointer down default, the input keeps focus, and `onValueChange` receives the completed address exactly once.
- [x] Given focus leaves the field, then the listbox is removed and the field position and size do not change.
- [x] Given any interaction, EmailInput never writes to the DOM value and declares no local disclosure state, no local list markup and no local option markup: the rendered text always equals the `value` prop, the combobox attributes come from `popup.comboboxAttributes` and the list comes from PopupListbox.
- [x] Given static export and hydration, then the server and the first client render contain no listbox and `aria-expanded="false"`, and no browser API runs during module evaluation.
- [x] Given FormField composition, then the injected `id`, `invalid` and `aria-describedby` reach the input, while `aria-controls` and `aria-activedescendant` keep pointing to the ids created by the hook.
- [x] Given the four themes and forced colors, then the field and popup keep the shared recipe behavior, and `EmailInput.module.css` declares only the `.root` anchor composition.
- [x] Given the delivery, `npm run lint`, `npm run typecheck:design-system`, `npm run test:contracts`, `npm run test:tokens` and `npm run test:design-system` pass.
- [x] Includes the fixed input attributes (`type`, `inputMode`, `autoComplete`, `autoCapitalize`, `autoCorrect`, `spellCheck`), the controlled value channel, domain-fragment matching against `providers` and the provider labels.
- [x] Excludes address validation, disposable/role-address checks, remote MX or API verification, the provider list itself (application data supplied through `providers`), the native datalist, submit handling, sending mail, persistence, API calls and provider access.
- [x] `NativeEmailInputProps` lives in the canonical `types/native-control-contracts.ts` module and is exported by `@/design-system`; EmailInput must not declare a local `Omit` or a literal union.
- [x] `listboxLabel` comes from `ComponentPopupProps`; the popup state, ids and `comboboxAttributes` come from `usePopupListbox`, and the list comes from [PopupListbox](PopupListbox.sc.md).
- [x] `onFocus`, `onBlur`, `onKeyDown`, `name`, `required`, `placeholder`, `autoFocus`, `disabled`, `readOnly`, `id` and `aria-describedby` stay inherited from `NativeEmailInputProps` and are not redeclared.
- [x] The value / onValueChange contract uses Required; Controlled text; EmailInput never writes to the DOM value and never falls back to uncontrolled state.
- [x] The providers contract uses Required; Non-empty unique domains without a leading `@`; declared order is suggestion order; matched case-insensitively and inserted verbatim.
- [x] The maxSuggestions contract uses 4; Integer; below 1 offers no suggestion; the popup has no internal scroll region.
- [x] The listboxLabel contract uses undefined; Inherited from `ComponentPopupProps`; optional localized accessible name for the listbox, the DS owns no dictionary.
- [x] The type contract uses email; Fixed; omitted from `NativeEmailInputProps` so the email keyboard cannot be removed.
- [x] The inputMode / autoComplete contract uses email / email; Fixed; keeps the email keyboard and email autofill.
- [x] The autoCapitalize / autoCorrect / spellCheck contract uses none / off / false; Fixed; prevents sentence casing and autocorrection in the address.
- [x] The list contract uses not applicable; Omitted to prevent a competing native datalist.
- [x] The fullWidth contract uses true; Forwarded to the Input Atom.
- [x] The invalid contract uses undefined; Forwarded to the Input Atom; explicit value overrides `aria-invalid`, including `false`.
- [x] The id contract uses `email-${useId()}`; Base id passed to the popup hook; FormField may replace the input id.
- [x] The role / aria-expanded / aria-controls / aria-activedescendant contract uses Derived; Spread from `popup.comboboxAttributes`; EmailInput adds only `aria-autocomplete="list"`.
- [x] Domain resolution is a pure function over the controlled value, the provider list and `maxSuggestions`.
- [x] A suggestion exists only with a local part before the last `@`, and a provider is offered only while it is strictly longer than the typed fragment, which closes the popup on an exact domain match.
- [x] `queryKey` is the current `atIndex:fragment` pair, so an exactly completed domain, a missing local part or a `maxSuggestions` below 1 yields `count: 0` and keeps the popup closed.
- [x] `onAcceptOption` closes over the current render's `suggestion` and `value`, and the popup invokes it synchronously inside the interaction that accepted the option, so the completed address is derived from the value the user is actually looking at.
- [x] The disclosure transitions, the key handling and the ARIA attribute contract belong to [Popup contracts](../../hooks/tech-popup-contracts.sc.md#logic), and the list markup, option elements and pointer acceptance belong to [PopupListbox](PopupListbox.sc.md); EmailInput re-implements none of them.
- [x] Component-local CSS: `src/design-system/components/molecules/EmailInput/EmailInput.module.css`.
- [x] `.root` is the only local class: it anchors the absolutely positioned popup inside the field, so the list never shifts the form layout.
- [x] Every numeric, color and z-index value comes from the shared recipe and its semantic tokens, and the popup shows at most `maxSuggestions` options without an internal scroll region.
- [x] State, callbacks, native form values and focus update immediately.
- [x] Native field value and focus stay unchanged by motion.
- [x] Interruption: latest props win, no duplicate semantic callback, no focus loss or completion-event dependency.
- [x] useEmailInput is colocated with EmailInput and called at the top of render; state, effects, behavioral refs and handlers remain in that hook.

- [x] V2 **Provider completion**: Compose FormField and a valid providers list; type a domain query, accept a real suggestion and clear. Report onValueChange and suppress acceptance when disabled/readOnly.
- [x] The EmailInput V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useEmailInputExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.

---
title: "InternationalTelephoneInput"
scope: "Controlled international telephone entry composed from DS country selection and the existing native telephone input"
status: "DONE"
type: "component"
ds-level: "molecules"
---

# InternationalTelephoneInput

## Files

```text
design-system/components/molecules/InternationalTelephoneInput/InternationalTelephoneInput.tsx (C)
design-system/components/molecules/InternationalTelephoneInput/useInternationalTelephoneInput.ts (C)
design-system/components/molecules/InternationalTelephoneInput/InternationalTelephoneInput.module.css (C)
design-system/components/molecules/InternationalTelephoneInput/index.ts (C)
design-system/index.ts (M)
features/showcase/examples/InternationalTelephoneInput.example.tsx (C)
features/showcase/examples/useInternationalTelephoneInputExample.ts (C)
features/showcase/model/showcase-registry.ts (M)
../scripts/check-phone.cjs (C)
features/showcase-v2/components/InternationalTelephoneInput/definition.ts (C)
features/showcase-v2/components/InternationalTelephoneInput/InternationalTelephoneInput.example.tsx (C)
features/showcase-v2/components/InternationalTelephoneInput/useInternationalTelephoneInputExample.ts (C)
features/showcase-v2/components/InternationalTelephoneInput/usage-code.ts (C)
features/showcase-v2/model/specialized-input-control-options.ts (C)
features/showcase-v2/model/showcase-v2-control-options.ts (M)
features/showcase-v2/messages/useShowcaseV2Copy.ts (M)
features/showcase-v2/components/InputFixtures/HelperResults.tsx (C)
features/showcase-v2/model/showcase-v2-index.ts (M)
features/showcase-v2/model/showcase-v2-loaders.ts (M)
features/showcase-v2/components/InternationalTelephoneInput/fixtures.ts (C)
```

## Dependencies

- [Phone contracts](../../types/tech-phone-contracts.sc.md)
- [Phone helpers](../../helpers/tech-phone-formatters.sc.md)
- [TelephoneInput](TelephoneInput.sc.md)
- [Select](../atoms/Select.sc.md)
- [InputGroup](InputGroup.sc.md)
- [FormField](FormField.sc.md)
- [Component capabilities](../../types/tech-component-capabilities.sc.md)

## Contract

```tsx
import {FormField, InternationalTelephoneInput} from "@forge-ui/web";
<FormField controlId="phone" label={phoneLabel} hint={phoneHint}>
  <InternationalTelephoneInput id="phone" name="phone" value={phone} onValueChange={setPhone}
    locale={locale} countryLabel={countryLabel} internationalLabel={internationalLabel}
    invalidMessage={invalidPhoneMessage} required />
</FormField>
```

## Styles

```css
.root { flex-wrap: wrap; }
.root > .country { flex: auto; flex-basis: var(--length-40); min-inline-size: var(--zero); max-inline-size: var(--size-full); }
.root > input:not([type="hidden"]) { flex: auto; flex-basis: var(--length-40); min-inline-size: var(--zero); }
```

## Hooks

```ts
"use client";
import {
  useCallback,
  useImperativeHandle,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ChangeEvent, CompositionEvent, FocusEvent, InputEvent } from "react";
import {
  formatPhone,
  formatPhoneDraft,
  getPhoneCountries,
  isSupportedPhoneCountry,
  parsePhone,
} from "../../../helpers/phone";
import type { PhoneInputValue, PhoneParseResult } from "../../../types/phone";
import type { InternationalTelephoneInputProps } from "./InternationalTelephoneInput";
const keyOf = (value: PhoneInputValue) => `${value.country ?? ""}:${value.number ?? ""}`;

export function useInternationalTelephoneInput(input: InternationalTelephoneInputProps) {
  const {
    value,
    onValueChange,
    onInputStateChange,
    locale,
    countryLabel: _countryLabel,
    internationalLabel: _internationalLabel,
    invalidMessage,
    countries,
    fixedCountry,
    showCountrySelector = true,
    defaultCountry,
    name: _name,
    ref,
    id,
    onBlur,
    onInput,
    onCompositionStart,
    onCompositionEnd,
    className: _className,
    ...native
  } = input;
  void _countryLabel;
  void _internationalLabel;
  void _name;
  void _className;
  const generatedId = useId();
  if (defaultCountry && !isSupportedPhoneCountry(defaultCountry))
    throw new RangeError("Unsupported phone default country");
  if (
    defaultCountry &&
    ((fixedCountry && defaultCountry !== fixedCountry) ||
      (countries && !countries.includes(defaultCountry)))
  )
    throw new RangeError("Inconsistent phone default country");
  const options = useMemo(() => {
    if (
      countries?.some((country) => !isSupportedPhoneCountry(country)) ||
      (fixedCountry && !isSupportedPhoneCountry(fixedCountry))
    )
      throw new RangeError("Unsupported phone restriction");
    if (countries && new Set(countries).size !== countries.length)
      throw new RangeError("Duplicate phone countries");
    return getPhoneCountries(locale).filter(
      (option) => !countries || countries.includes(option.country),
    );
  }, [locale, countries, fixedCountry]);
  if (value.country !== null && !isSupportedPhoneCountry(value.country))
    throw new RangeError("Unsupported phone country");
  if (
    (fixedCountry && value.country !== fixedCountry) ||
    (value.country && countries && !countries.includes(value.country)) ||
    (fixedCountry && countries && !countries.includes(fixedCountry))
  )
    throw new RangeError("Inconsistent phone country");

  if (value.number !== null) {
    const state = parsePhone(value.number, value.country);
    if (
      state.kind !== "possible" ||
      state.number !== value.number ||
      (fixedCountry && state.country !== fixedCountry) ||
      (countries && (!state.country || !countries.includes(state.country)))
    )
      throw new RangeError("Invalid canonical phone value");
  }

  const externalKey = keyOf(value);
  const display = () =>
    formatPhone(value.number, {
      international:
        showCountrySelector || Boolean(defaultCountry && value.country !== defaultCountry),
    });
  const [editingCountry, setEditingCountry] = useState(value.country ?? defaultCountry ?? null);
  const [draft, setDraft] = useState({ key: externalKey, text: display() });
  const emitted = useRef<string | null>(null);
  const [pendingValue, setPendingValue] = useState<string | null>(null);
  useLayoutEffect(() => {
    emitted.current = null;
  }, [externalKey]);
  const composing = useRef(false);
  const compositionCommit = useRef<string | null>(null);
  const inputCancelled = useRef(false);
  const editor = useRef<HTMLInputElement | null>(null);
  const pendingCaret = useRef<number | null>(null);

  if (draft.key !== externalKey) {
    const accepted = pendingValue === externalKey;
    setDraft({ key: externalKey, text: accepted ? draft.text : display() });
    if (!accepted) setEditingCountry(value.country ?? defaultCountry ?? null);
    setPendingValue(null);
  }

  const text = draft.key === externalKey || pendingValue === externalKey ? draft.text : display();
  const restrict = (state: PhoneParseResult): PhoneParseResult =>
    state.kind === "possible" &&
    ((fixedCountry && state.country !== fixedCountry) ||
      (countries && (!state.country || !countries.includes(state.country))))
      ? { kind: "invalid", text }
      : state;
  const contextCountry = showCountrySelector
    ? value.country
    : text.trim()
      ? editingCountry
      : (defaultCountry ?? value.country);
  const state = restrict(parsePhone(text, contextCountry));
  const invalidDraft = state.kind === "invalid" || state.kind === "incomplete";
  useLayoutEffect(() => {
    editor.current?.setCustomValidity(invalidDraft ? invalidMessage : "");
  }, [invalidDraft, invalidMessage, text]);
  useLayoutEffect(() => {
    const node = editor.current;
    const anchor = pendingCaret.current;
    pendingCaret.current = null;
    if (!node || anchor === null || node.ownerDocument.activeElement !== node) return;
    let position = 0;
    let digits = 0;

    while (position < text.length && digits < anchor) {
      if (/\d/.test(text[position])) digits++;
      position++;
    }

    node.setSelectionRange(position, position);
  }, [text]);

  function emit(next: PhoneInputValue) {
    const nextKey = keyOf(next);
    if (nextKey === emitted.current) return;
    emitted.current = nextKey;
    setPendingValue(nextKey);
    if (nextKey !== externalKey) onValueChange(next);
  }

  function process(nextText: string) {
    const country = showCountrySelector
      ? value.country
      : text.trim()
        ? editingCountry
        : (defaultCountry ?? value.country);
    setEditingCountry(country);
    const punctuationDeletion =
      nextText.length < text.length && nextText.replace(/\D/g, "") === text.replace(/\D/g, "");
    const formatted =
      showCountrySelector || punctuationDeletion ? nextText : formatPhoneDraft(nextText, country);
    setDraft({ key: externalKey, text: formatted });
    let next = parsePhone(formatted, country);
    if (
      next.kind === "possible" &&
      ((fixedCountry && next.country !== fixedCountry) ||
        (countries && (!next.country || !countries.includes(next.country))))
    )
      next = { kind: "invalid", text: nextText };
    onInputStateChange?.(next);

    if (next.kind === "empty") {
      const emptyCountry = defaultCountry ?? value.country;
      setEditingCountry(emptyCountry);
      emit({ number: null, country: emptyCountry });
    }

    if (next.kind === "possible") emit({ number: next.number, country: next.country });
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (input.disabled || input.readOnly || event.defaultPrevented || inputCancelled.current) {
      inputCancelled.current = false;
      return;
    }

    if (compositionCommit.current === event.currentTarget.value) {
      compositionCommit.current = null;
      return;
    }

    compositionCommit.current = null;
    if (!showCountrySelector && !composing.current)
      pendingCaret.current = event.currentTarget.value
        .slice(0, event.currentTarget.selectionStart ?? event.currentTarget.value.length)
        .replace(/\D/g, "").length;
    if (composing.current) setDraft({ key: externalKey, text: event.currentTarget.value });
    else process(event.currentTarget.value);
  }

  function handleInput(event: InputEvent<HTMLInputElement>) {
    onInput?.(event);
    inputCancelled.current = event.defaultPrevented;
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    onBlur?.(event);

    if (!event.defaultPrevented && !composing.current) {
      if (!invalidDraft) setDraft({ key: externalKey, text: display() });
      emitted.current = null;
      setPendingValue(null);
    }
  }

  function handleCompositionStart(event: CompositionEvent<HTMLInputElement>) {
    onCompositionStart?.(event);

    if (!event.defaultPrevented && !input.readOnly && !input.disabled) {
      composing.current = true;
      compositionCommit.current = null;
    }
  }

  function handleCompositionEnd(event: CompositionEvent<HTMLInputElement>) {
    onCompositionEnd?.(event);
    const wasComposing = composing.current;
    composing.current = false;

    if (wasComposing && !event.defaultPrevented && !input.readOnly && !input.disabled) {
      compositionCommit.current = event.currentTarget.value;
      process(event.currentTarget.value);
    }
  }

  function onCountryChange(event: ChangeEvent<HTMLSelectElement>) {
    if (input.disabled || input.readOnly || fixedCountry) return;
    const next = { number: null, country: event.currentTarget.value || null };
    emit(next);
    setDraft({ key: keyOf(next), text: "" });
    onInputStateChange?.({ kind: "empty" });
  }

  useImperativeHandle(ref, () => editor.current!, []);
  const editorRef = useCallback((node: HTMLInputElement | null) => {
    editor.current = node;
  }, []);
  const fixed = options.find((option) => option.country === fixedCountry);

  return {
    options,
    fixedLabel: fixed ? `${fixed.label} (+${fixed.callingCode})` : "",
    onCountryChange,
    submittedValue: state.kind === "possible" && state.number === value.number ? value.number : "",
    editorProps: {
      ...native,
      id: id ?? `phone-${generatedId}`,
      ref: editorRef,
      value: text,
      onChange,
      onInput: handleInput,
      onBlur: handleBlur,
      onCompositionStart: handleCompositionStart,
      onCompositionEnd: handleCompositionEnd,
      invalid: invalidDraft || input.invalid,
      "aria-invalid": invalidDraft || input.invalid || input["aria-invalid"],
    },
  };
}
```

## Content

```tsx
"use client";
import type { Locale } from "@/lib/contracts/preferences";
import type {
  NativeInternationalTelephoneInputProps,
  PhoneInputValue,
  PhoneCountry,
  PhoneParseResult,
} from "../../../types/phone";
import type {
  VisualProps,
  ComponentFullWidthProps,
  ComponentInvalidProps,
} from "../../../types/component-capabilities";
import { Select } from "../../atoms/Select";
import { TelephoneInput } from "../TelephoneInput";
import { InputGroup } from "../InputGroup";
import { useInternationalTelephoneInput } from "./useInternationalTelephoneInput";
import styles from "./InternationalTelephoneInput.module.css";
export interface InternationalTelephoneInputProps
  extends
    NativeInternationalTelephoneInputProps,
    VisualProps,
    ComponentFullWidthProps,
    ComponentInvalidProps {
  value: PhoneInputValue;
  onValueChange(value: PhoneInputValue): void;
  onInputStateChange?(state: PhoneParseResult): void;
  locale: Locale;
  countryLabel: string;
  internationalLabel: string;
  invalidMessage: string;
  countries?: readonly PhoneCountry[];
  fixedCountry?: PhoneCountry;
  showCountrySelector?: boolean;
  defaultCountry?: PhoneCountry;
}

export function InternationalTelephoneInput(input: InternationalTelephoneInputProps) {
  const view = useInternationalTelephoneInput(input);

  return (
    <InputGroup
      className={[styles.root, input.className].filter(Boolean).join(" ")}
      fullWidth={input.fullWidth}
    >
      {input.showCountrySelector === false ? null : input.fixedCountry ? (
        <span className={styles.country} aria-label={input.countryLabel}>
          {view.fixedLabel}
        </span>
      ) : (
        <Select
          className={styles.country}
          aria-label={input.countryLabel}
          aria-describedby={input["aria-describedby"]}
          value={input.value.country ?? ""}
          onChange={view.onCountryChange}
          disabled={input.disabled || input.readOnly}
          size={input.size}
          tone={input.tone}
          appearance={input.appearance}
          shape={input.shape}
        >
          <option value="">{input.internationalLabel}</option>
          {view.options.map((option) => (
            <option key={option.country} value={option.country}>
              {option.label} (+{option.callingCode})
            </option>
          ))}
        </Select>
      )}
      <TelephoneInput {...view.editorProps} />
      {input.name && (
        <input
          type="hidden"
          name={input.name}
          form={input.form}
          disabled={input.disabled}
          value={view.submittedValue}
        />
      )}
    </InputGroup>
  );
}
```

## Tests

- V2 International phone entry: verify the specified actions/outcome, reset and agreement with its minimal copyable code.

- Enter BR mobile and landline, US/CA shared +1, PT, GB and a number with a national significant zero; paste full international values with a different selected country.
- Change country with an empty, complete and incomplete draft; verify one atomic controlled callback and no duplicate/prefixed DDI.
- Edit mid-string, replace selection, paste, backspace, compose IME and blur without caret jumps; parent accepts/refuses updates and replaces the external record.
- Verify FormData E.164, required empty, invalid/incomplete submission prevention, disabled omission, readOnly inclusion and external form association.
- Keyboard-select a country with its name/DDI and edit the number; verify labels/ref/aria-describedby stay on the intended controls.

## Criteria

- [x] Support optional showCountrySelector=false without rendering a select or fixed-country accessory; default behavior remains compatible. Optional defaultCountry supplies the context for empty national entry and is independent from fixedCountry restrictions.
- [x] In single-field mode format progressive national/international entry using local numbering metadata. Preserve incomplete/invalid drafts, composition, paste, punctuation deletion and digit-relative caret position. An explicit +DDI overrides the default context.
- [x] Changing defaultCountry/locale does not reinterpret a nonempty draft or resolved canonical number. Empty input uses the current default; clearing adopts it, and reset discards local drafts. Preserve canonical E.164 submission and existing restricted-country behavior.
- [x] Verify single-field BR/US/ES input and locale changes in the browser; run touched-file Prettier/ESLint, typechecking and targeted phone/form checks before completing the extension.
- [x] Existing TelephoneInput keeps its native unmasked API and DONE status. The new molecule composes it with Select and InputGroup; no second phone mask engine, custom popup or Header/Body/Footer family is introduced.
- [x] Country options show localized name and +callingCode; flags are not the only identifier. Include the explicit international/undetermined option. Default list covers the metadata's territories; caller may restrict it with countries.
- [x] Country and canonical number are one controlled PhoneInputValue so paste/country changes emit one coherent update. Empty number retains country. No default BR from language, IP or browser location is assumed.
- [x] `fixedCountry` removes the editable country selector and uses a labeled noninteractive country/DDI presentation. Inconsistent controlled country or unsupported restrictions are configuration errors rather than silently corrected values. International input belonging elsewhere remains invalid in fixedCountry mode.
- [x] `useInternationalTelephoneInput` owns the draft, composition, handlers, refs and validity, calling shared helpers. Formatting occurs on blur/accepted external replacement; active editing preserves native selection and partial text rather than forcing a live mask.
- [x] Complete parseable edits emit a canonical E.164 value once. Empty emits null number with retained country; incomplete/invalid text remains visible and is reported without silently replacing the last accepted number with zero/null.
- [x] A pasted + number is not prefixed again. Resolve its territory only when supported and unambiguous, preserving a compatible chosen territory for shared DDIs. countries restrictions must not turn an out-of-scope number into another permitted number.
- [x] Explicit country change clears the previous number and draft in one controlled callback, retaining the selected new country. It never silently reinterprets an existing local number as a different country's number. Fixed-country control cannot change via keyboard or paste.
- [x] Visible editor uses type=tel/inputMode=tel/autoComplete=tel; it owns id/ref/required, label/hint/error relationships and localized customValidity. Country Select has its own countryLabel and associated hint where needed. No nested labels or glued controls.
- [x] Incomplete/invalid drafts block submission and expose aria-invalid. Required empty uses native validation; optional empty succeeds. isPossible/metadata checks do not claim assignment, reachability or verification.
- [x] Visible editor is unnamed; one hidden disabled-aware field submits only E.164 under name, honoring the same form association. Country is retained in the controlled object; applications add a separately named field only if required. Invalid visible draft cannot submit the old hidden accepted value.
- [x] Parent remains authoritative: refused updates restore at blur, accepted prop replacements clear stale drafts, reset is caller-controlled and prop changes emit no corrective value callback. Disabled/readOnly suppress edits to both number and country while readOnly retains submitted data.
- [x] Locale/theme changes preserve semantic values and focus. Caller handlers run first, cancellation is honored where applicable and IME is parsed once after composition; no animation/timer owns value changes.
- [x] Showcase independently demonstrates international selection, fixed BR, optional/required, readOnly/disabled, partial/invalid, international paste, US/CA shared calling code and explicit international mode. It includes proper FormField composition, canonical-value feedback and a native submission example under pt-BR/es/en.
- [x] Targeted browser acceptance verifies narrow layout, country/number keyboard order, paste and mid-string edit, validity/focus and canonical FormData. Long translated country names must not squeeze the number field; narrow layout may stack controls using existing tokens.

- [x] Edit parsing/normalization remains internal to the helper and view hook. Public callers use formatters/validators for display and checks; no public parsers service, normalization callback or business-rule parser is added. Existing rich draft state callbacks remain available for component feedback.

- [x] V2 **International phone entry**: Compose FormField with caller-owned canonical value and supported country/locale controls; changing country, typing and clearing reports normalized values with meaningful country/invalid labels.
- [x] The InternationalTelephoneInput V2 definition documents actual public props/defaults and native/capability sources, methods/events and owned resources; controls change supported settings only. useInternationalTelephoneInputExample owns preview controls/state/callbacks rather than an empty hook. Reset restores base settings, fixtures and feedback.
- [x] Each V2 scenario supplies minimal public-import/direct-JSX code in usage-code.ts with required owner/parts and caller variables. Copy preserves the displayed string; token spacing, connected labels, action hierarchy and relevant narrow/alternate states follow the V2 guide. Register only after this pending example acceptance is delivered.
- [x] V2 supporting fixture **Phone normalization and validation** in the InternationalTelephoneInput example uses the actual [helper contract](../../helpers/tech-phone-formatters.sc.md): Compare actual phone formatter/validator results with explicit region/international options, including valid canonical and invalid fixtures; display values separately from country selection and do not claim number ownership. Computed output is an explicit typed-fixture exception to generic Children text; it is not a new prop or helper page.

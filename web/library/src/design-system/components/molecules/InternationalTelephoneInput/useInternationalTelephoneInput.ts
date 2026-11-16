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

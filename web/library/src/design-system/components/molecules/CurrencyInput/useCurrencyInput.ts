"use client";

import { useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent, CompositionEvent, FocusEvent } from "react";
import type { CurrencyInputProps } from "./CurrencyInput";
import type { MoneyFormatOptions, MonetaryValue } from "../../../types/money";
import {
  isValidMoney,
  moneyDisplayText,
  moneyEditText,
  parseMoneyInput,
} from "../../../helpers/money";

interface Draft {
  text: string;
  baseline: MonetaryValue;
  expected: MonetaryValue;
  locale: MoneyFormatOptions["locale"];
  currency: string;
  editing: boolean;
}

function display(value: MonetaryValue, options: MoneyFormatOptions): string {
  return value === null || isValidMoney(value, options)
    ? moneyDisplayText(value, options)
    : moneyEditText(value, options);
}

export function useCurrencyInput(props: CurrencyInputProps) {
  const {
    value,
    onValueChange,
    currency,
    locale,
    allowNegative = true,
    invalidMessage,
    onInputStateChange,
    name: _name,
    form,
    ref,
    onFocus,
    onBlur,
    onCompositionStart,
    onCompositionEnd,
    disabled,
    readOnly,
    invalid,
    "aria-invalid": ariaInvalid,
    ...rest
  } = props;
  void _name;
  const options = { currency, locale, allowNegative };
  const input = useRef<HTMLInputElement | null>(null);
  const composing = useRef(false);
  const composedText = useRef<string | null>(null);
  const [draft, setDraft] = useState<Draft>(() => ({
    text: display(value, options),
    baseline: value,
    expected: value,
    locale,
    currency,
    editing: false,
  }));
  // A genuinely external value wins immediately; an accepted edit keeps its native caret.
  const external = value !== draft.baseline && value !== draft.expected;
  const text = external ? display(value, options) : draft.text;
  const previousState = parseMoneyInput(text, { currency, locale: draft.locale, allowNegative });
  const partial = previousState.kind === "incomplete" || previousState.kind === "invalid";
  const parseOptions = { currency, locale: partial ? draft.locale : locale, allowNegative };
  const presentationChanged = !partial && (draft.locale !== locale || draft.currency !== currency);
  const shownText = external
    ? display(value, options)
    : presentationChanged
      ? draft.editing
        ? moneyEditText(value, options)
        : display(value, options)
      : text;

  if (external || presentationChanged) {
    setDraft({
      text: shownText,
      baseline: value,
      expected: value,
      locale,
      currency,
      editing: draft.editing,
    });
  }

  const state = parseMoneyInput(shownText, parseOptions);
  const ownedInvalid = state.kind === "invalid" || state.kind === "incomplete";
  const canonicalValue = value !== null && /^-0(?:\.0+)?$/.test(value) ? value.slice(1) : value;
  useImperativeHandle(ref, () => input.current!, []);
  useLayoutEffect(() => {
    input.current?.setCustomValidity(ownedInvalid ? invalidMessage : "");
  }, [ownedInvalid, invalidMessage, shownText]);
  const setInput = useCallback((node: HTMLInputElement | null) => {
    input.current = node;
  }, []);

  function process(next: string) {
    if (disabled || readOnly) return;
    const activeOptions = partial ? parseOptions : options;
    const result = parseMoneyInput(next, activeOptions);
    const expected = result.kind === "valid" || result.kind === "empty" ? result.value : value;
    setDraft({
      text: next,
      baseline: value,
      expected,
      locale: activeOptions.locale,
      currency,
      editing: true,
    });
    onInputStateChange?.(result);
    if ((result.kind === "valid" || result.kind === "empty") && result.value !== value)
      onValueChange(result.value);
  }

  function change(event: ChangeEvent<HTMLInputElement>) {
    if (event.defaultPrevented || event.nativeEvent.defaultPrevented || disabled || readOnly)
      return;
    const next = event.currentTarget.value;

    if (composing.current) {
      setDraft({
        text: next,
        baseline: value,
        expected: value,
        locale: draft.locale,
        currency,
        editing: true,
      });
      return;
    }

    if (composedText.current === next) {
      composedText.current = null;
      return;
    }

    composedText.current = null;
    process(next);
  }

  function focus(event: FocusEvent<HTMLInputElement>) {
    onFocus?.(event);
    if (event.defaultPrevented || disabled || readOnly) return;
    const current = parseMoneyInput(shownText, parseOptions);
    const next =
      current.kind === "invalid" || current.kind === "incomplete"
        ? shownText
        : moneyEditText(value, options);
    setDraft({ text: next, baseline: value, expected: value, locale, currency, editing: true });
  }

  function blur(event: FocusEvent<HTMLInputElement>) {
    onBlur?.(event);
    if (event.defaultPrevented || disabled || readOnly) return;
    const result = parseMoneyInput(shownText, parseOptions);
    const validDraft = result.kind === "valid" || result.kind === "empty";
    // Refused edits commit the authoritative prop. Invalid text is never silently erased.
    const next = validDraft ? display(value, options) : shownText;
    setDraft({
      text: next,
      baseline: value,
      expected: value,
      locale: validDraft ? locale : parseOptions.locale,
      currency,
      editing: false,
    });
  }

  function compositionStart(event: CompositionEvent<HTMLInputElement>) {
    onCompositionStart?.(event);
    if (!event.defaultPrevented && !disabled && !readOnly) composing.current = true;
  }

  function compositionEnd(event: CompositionEvent<HTMLInputElement>) {
    onCompositionEnd?.(event);
    composing.current = false;
    if (event.defaultPrevented || disabled || readOnly) return;
    composedText.current = event.currentTarget.value;
    process(event.currentTarget.value);
  }

  return {
    canonicalValue,
    state,
    inputProps: {
      ...rest,
      form,
      disabled,
      readOnly,
      ref: setInput,
      type: "text" as const,
      inputMode: "decimal" as const,
      value: shownText,
      invalid: ownedInvalid ? true : invalid,
      "aria-invalid": ariaInvalid,
      onChange: change,
      onFocus: focus,
      onBlur: blur,
      onCompositionStart: compositionStart,
      onCompositionEnd: compositionEnd,
    },
  };
}

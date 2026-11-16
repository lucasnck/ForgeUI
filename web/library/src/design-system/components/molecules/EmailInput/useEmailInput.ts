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
      (domain) => domain.length > fragment.length && domain.toLowerCase().startsWith(fragment),
    )
    .slice(0, maxSuggestions);

  return domains.length ? { atIndex, key: `${atIndex}:${fragment}`, domains } : null;
}

export function useEmailInput(input: EmailInputProps) {
  const {
    value,
    onValueChange,
    providers,
    maxSuggestions = 4,
    id,
    listboxLabel,
    onFocus,
    onBlur,
    onKeyDown,
    ...props
  } = input;
  const generatedId = useId();
  const controlId = id ?? "email-" + generatedId;
  const suggestion =
    props.disabled || props.readOnly
      ? null
      : resolveEmailDomainSuggestions(value, providers, maxSuggestions);
  const popup = usePopupListbox({
    id: controlId,
    count: suggestion?.domains.length ?? 0,
    queryKey: suggestion?.key ?? null,
    onAcceptOption: (index) => {
      if (suggestion)
        onValueChange(value.slice(0, suggestion.atIndex + 1) + suggestion.domains[index]);
    },
  });
  const handleChange: NonNullable<ComponentPropsWithRef<"input">["onChange"]> = (event) =>
    onValueChange(event.currentTarget.value);

  const handleKeyDown: NonNullable<ComponentPropsWithRef<"input">["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    if (!event.defaultPrevented) popup.onKeyDown(event);
  };

  const handleFocus: NonNullable<ComponentPropsWithRef<"input">["onFocus"]> = (event) => {
    onFocus?.(event);
    if (!event.defaultPrevented) popup.onFocus(event);
  };

  const handleBlur: NonNullable<ComponentPropsWithRef<"input">["onBlur"]> = (event) => {
    onBlur?.(event);
    if (!event.defaultPrevented) popup.onBlur(event);
  };

  return {
    props,
    controlId,
    value,
    suggestion,
    popup,
    listboxLabel,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };
}

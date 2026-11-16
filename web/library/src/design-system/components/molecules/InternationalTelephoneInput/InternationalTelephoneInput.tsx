"use client";
import type { Locale } from "../../../../support/contracts/preferences";
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

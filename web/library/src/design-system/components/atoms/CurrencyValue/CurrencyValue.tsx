import { Text } from "../Text";
import type {
  MoneyFormatOptions,
  MonetaryValue,
  NativeCurrencyValueProps,
} from "../../../types/money";
import { formatMoney } from "../../../helpers/money";
import styles from "./CurrencyValue.module.css";

export interface CurrencyValueProps extends NativeCurrencyValueProps, MoneyFormatOptions {
  value: MonetaryValue;
  emptyLabel?: string;
}

export function CurrencyValue({
  value,
  currency,
  locale,
  currencyDisplay,
  useGrouping,
  emptyLabel = "—",
  className,
  ...props
}: CurrencyValueProps) {
  const formatted = formatMoney(value, { currency, locale, currencyDisplay, useGrouping });

  return (
    <Text {...props} className={[styles.root, className].filter(Boolean).join(" ")}>
      {value === null ? emptyLabel : formatted}
    </Text>
  );
}

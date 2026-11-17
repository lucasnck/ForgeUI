import '../helpers/money.dart';
import '../types/primitives.dart';
import 'forge_text.dart';

class ForgeCurrencyValue extends ForgeText {
  ForgeCurrencyValue(
      {super.key,
      required String? value,
      required String currency,
      required ForgeLocale locale,
      ForgeCurrencyDisplay currencyDisplay = ForgeCurrencyDisplay.code,
      bool useGrouping = true,
      String emptyLabel = '—',
      super.size,
      super.tone,
      super.weight,
      super.semanticLabel,
      super.semanticId,
      super.descriptions,
      super.semanticRole})
      : super(
            text: value == null
                ? emptyLabel
                : formatForgeMoney(
                    value,
                    ForgeMoneyOptions(
                        currency: currency,
                        locale: locale,
                        currencyDisplay: currencyDisplay,
                        useGrouping: useGrouping)));
}

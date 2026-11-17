import 'dart:convert';
import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/src/helpers/money.dart';
import 'package:forge_ui/src/types/primitives.dart';

void main() {
  test(
      'currency helpers match exact Web fixtures across locale, precision and display modes',
      () {
    final cases =
        jsonDecode(File('test/fixtures/money-web.json').readAsStringSync())
            as List;
    for (final raw in cases) {
      final c = raw as Map<String, dynamic>;
      final o = ForgeMoneyOptions(
          currency: c['currency'] as String,
          locale: switch (c['locale']) {
            'pt-BR' => ForgeLocale.ptBR,
            'es' => ForgeLocale.es,
            _ => ForgeLocale.en
          },
          currencyDisplay: ForgeCurrencyDisplay.values
              .byName(c['currencyDisplay'] as String),
          useGrouping: c['useGrouping'] as bool);
      if (c['type'] == 'format') {
        if (c['throws'] == true) {
          expect(() => formatForgeMoney(c['value'] as String?, o),
              throwsArgumentError,
              reason: '$c');
        } else {
          expect(formatForgeMoney(c['value'] as String?, o), c['expected'],
              reason: '$c');
          expect(forgeMoneyDisplayText(c['value'] as String?, o), c['display'],
              reason: '$c');
          expect(forgeMoneyEditText(c['value'] as String?, o), c['edit'],
              reason: '$c');
        }
      } else {
        final result = parseForgeMoneyInput(c['text'] as String, o),
            expected = c['expected'] as Map<String, dynamic>;
        expect(result.kind.name, expected['kind'], reason: '$c');
        expect(result.value, expected['value'], reason: '$c');
        expect(result.reason?.name, expected['reason'], reason: '$c');
      }
    }
  });
}

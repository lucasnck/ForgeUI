import 'dart:convert';
import '../generated/forge_money_data.g.dart';
import '../types/primitives.dart';

enum ForgeMoneyInputKind { empty, valid, incomplete, invalid }

enum ForgeMoneyInputReason { syntax, precision, negative }

class ForgeMoneyInputResult {
  final ForgeMoneyInputKind kind;
  final String? value, text;
  final ForgeMoneyInputReason? reason;
  const ForgeMoneyInputResult(this.kind, {this.value, this.text, this.reason});
}

class ForgeMoneyOptions {
  final String currency;
  final ForgeLocale locale;
  final ForgeCurrencyDisplay currencyDisplay;
  final bool useGrouping, allowNegative;
  const ForgeMoneyOptions(
      {required this.currency,
      required this.locale,
      this.currencyDisplay = ForgeCurrencyDisplay.code,
      this.useGrouping = true,
      this.allowNegative = true});
}

class _Currency {
  final int digits;
  final Map<String, List<List<String>>> patterns;
  _Currency(Map<String, dynamic> v)
      : digits = v['digits'] as int,
        patterns = (v['patterns'] as Map<String, dynamic>).map((k, p) =>
            MapEntry(k,
                (p as List).map((a) => (a as List).cast<String>()).toList()));
}

class _Locale {
  final String decimal, group, minus;
  final int groupMin;
  final Map<String, _Currency> currencies;
  _Locale(Map<String, dynamic> v)
      : decimal = v['decimal'] as String,
        group = v['group'] as String,
        minus = v['minus'] as String,
        groupMin = v['groupMin'] as int,
        currencies = (v['currencies'] as Map<String, dynamic>)
            .map((k, c) => MapEntry(k, _Currency(c as Map<String, dynamic>)));
}

final _data = (jsonDecode(forgeMoneyDataJson) as Map<String, dynamic>)
    .map((k, v) => MapEntry(k, _Locale(v as Map<String, dynamic>)));
_Locale _locale(ForgeLocale l) => _data[switch (l) {
      ForgeLocale.ptBR => 'pt-BR',
      ForgeLocale.es => 'es',
      ForgeLocale.en => 'en'
    }]!;
_Currency _currency(ForgeMoneyOptions o) {
  if (!RegExp(r'^[A-Z]{3}$').hasMatch(o.currency))
    throw ArgumentError('Invalid currency code');
  return _locale(o.locale).currencies[o.currency] ??
      _locale(o.locale).currencies['ZZZ']!;
}

final _canonical = RegExp(r'^-?(0|[1-9][0-9]*)(\.[0-9]+)?$'),
    _negativeZero = RegExp(r'^-0(?:\.0+)?$');
int forgeCurrencyFractionDigits(ForgeMoneyOptions options) =>
    _currency(options).digits;
String normalizeForgeMoney(String value) =>
    _negativeZero.hasMatch(value) ? value.substring(1) : value;
void _validate(String? value, ForgeMoneyOptions o) {
  final digits = _currency(o).digits;
  if (value == null) return;
  if (!_canonical.hasMatch(value))
    throw ArgumentError('Invalid monetary value');
  if ((value.split('.').length > 1 ? value.split('.')[1].length : 0) > digits)
    throw ArgumentError('Invalid currency precision');
}

String forgeMoneyEditText(String? value, ForgeMoneyOptions o) {
  _currency(o);
  if (value == null) return '';
  if (!_canonical.hasMatch(value))
    throw ArgumentError('Invalid monetary value');
  return normalizeForgeMoney(value)
      .replaceFirst('.', _locale(o.locale).decimal);
}

String _numeric(String value, ForgeMoneyOptions o) {
  final l = _locale(o.locale),
      digits = _currency(o).digits,
      n = normalizeForgeMoney(value);
  final negative = n.startsWith('-'),
      parts = (negative ? n.substring(1) : n).split('.');
  var integer = parts.first;
  if (o.useGrouping && integer.length >= l.groupMin) {
    final chunks = <String>[];
    for (var end = integer.length; end > 0; end -= 3) {
      chunks.insert(
          0, integer.substring((end - 3).clamp(0, integer.length), end));
    }
    integer = chunks.join(l.group);
  }
  return integer +
      (digits == 0
          ? ''
          : l.decimal +
              (parts.length > 1 ? parts[1] : '').padRight(digits, '0'));
}

String forgeMoneyDisplayText(String? value, ForgeMoneyOptions o) {
  _validate(value, o);
  if (value == null) return '';
  return (normalizeForgeMoney(value).startsWith('-')
          ? _locale(o.locale).minus
          : '') +
      _numeric(value, o);
}

String formatForgeMoney(String? value, ForgeMoneyOptions o) {
  _validate(value, o);
  if (value == null) return '';
  final n = normalizeForgeMoney(value), negative = n.startsWith('-');
  // Currency name singular follows Intl's visible fraction operand.
  final digits = _currency(o).digits;
  final absolute = n.startsWith('-') ? n.substring(1) : n;
  final whole = absolute.split('.').first;
  final numericOne = whole == '1' &&
      (absolute.split('.').length == 1 ||
          RegExp(r'^0+$').hasMatch(absolute.split('.')[1]));
  final isOne = switch (o.locale) {
    ForgeLocale.ptBR => whole == '0' || whole == '1',
    ForgeLocale.es => numericOne,
    ForgeLocale.en => digits == 0 && numericOne
  };
  final pair = _currency(o).patterns[o.currencyDisplay.name]![
      negative ? (isOne ? 2 : 3) : (isOne ? 0 : 1)];
  final prefix = pair[0].replaceAll('ZZZ', o.currency),
      suffix = pair[1].replaceAll('ZZZ', o.currency);
  return prefix + _numeric(n, o) + suffix;
}

bool isValidForgeMoney(String? value, ForgeMoneyOptions o) {
  if (value == null || value.isEmpty) return false;
  try {
    _validate(value, o);
    return true;
  } on ArgumentError {
    return false;
  }
}

String _affixSpace(String v) =>
    v.replaceAll('\u00a0', ' ').replaceAll('\u202f', ' ');
ForgeMoneyInputResult parseForgeMoneyInput(String text, ForgeMoneyOptions o) {
  final digits = _currency(o).digits, l = _locale(o.locale);
  if (text.isEmpty)
    return const ForgeMoneyInputResult(ForgeMoneyInputKind.empty);
  ForgeMoneyInputResult invalid(ForgeMoneyInputReason reason) =>
      ForgeMoneyInputResult(ForgeMoneyInputKind.invalid,
          text: text, reason: reason);
  ForgeMoneyInputResult incomplete() =>
      ForgeMoneyInputResult(ForgeMoneyInputKind.incomplete, text: text);
  bool allowed(String v) => v.split('').every((c) =>
      RegExp(r'[0-9]').hasMatch(c) ||
      [l.decimal, l.group, l.minus].contains(c));
  var raw = text;
  if (!allowed(raw)) {
    String? stripped;
    final pasted = _affixSpace(text);
    for (final patterns in _currency(o).patterns.values) {
      for (var i = 0; i < patterns.length; i++) {
        final prefix =
                _affixSpace(patterns[i][0].replaceAll('ZZZ', o.currency)),
            suffix = _affixSpace(patterns[i][1].replaceAll('ZZZ', o.currency));
        if (pasted.startsWith(prefix) &&
            pasted.endsWith(suffix) &&
            pasted.length > prefix.length + suffix.length) {
          stripped = (i >= 2 ? '-' : '') +
              pasted.substring(prefix.length, pasted.length - suffix.length);
          break;
        }
      }
      if (stripped != null) break;
    }
    if (stripped == null || !allowed(stripped))
      return invalid(ForgeMoneyInputReason.syntax);
    raw = stripped;
  }
  final negative = raw.startsWith(l.minus);
  if (negative && !o.allowNegative)
    return invalid(ForgeMoneyInputReason.negative);
  if (negative) raw = raw.substring(l.minus.length);
  if (raw.contains(l.minus)) return invalid(ForgeMoneyInputReason.syntax);
  if (raw.isEmpty || raw == l.decimal) return incomplete();
  final sections = raw.split(l.decimal);
  if (sections.length > 2) return invalid(ForgeMoneyInputReason.syntax);
  var integer = sections[0];
  final fraction = sections.length > 1 ? sections[1] : null;
  if (fraction != null && !RegExp(r'^[0-9]*$').hasMatch(fraction))
    return invalid(ForgeMoneyInputReason.syntax);
  if (integer.contains(l.group)) {
    final groups = integer.split(l.group);
    for (var i = 0; i < groups.length; i++) {
      if (!RegExp(r'^[0-9]+$').hasMatch(groups[i]) ||
          (i == 0
              ? (groups[i].isEmpty || groups[i].length > 3)
              : groups[i].length != 3))
        return invalid(ForgeMoneyInputReason.syntax);
    }
    integer = groups.join('');
  }
  if (!RegExp(r'^[0-9]*$').hasMatch(integer) ||
      (integer.isEmpty && fraction == null))
    return invalid(ForgeMoneyInputReason.syntax);
  if (fraction != null && fraction.length > digits)
    return invalid(ForgeMoneyInputReason.precision);
  if (fraction == '') return incomplete();
  integer = integer.replaceFirst(RegExp(r'^0+(?=[0-9])'), '');
  if (integer.isEmpty) integer = '0';
  final unsigned = integer + (fraction == null ? '' : '.$fraction');
  return ForgeMoneyInputResult(ForgeMoneyInputKind.valid,
      value: negative && !RegExp(r'^0(?:\.0+)?$').hasMatch(unsigned)
          ? '-$unsigned'
          : unsigned);
}

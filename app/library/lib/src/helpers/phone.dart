import 'dart:convert';
import 'package:phone_numbers_parser/phone_numbers_parser.dart' as native;
import '../generated/forge_phone_data.g.dart';
import '../types/primitives.dart';

class ForgePhoneInputValue {
  final String? number, country;
  const ForgePhoneInputValue({required this.number, required this.country});
  @override
  bool operator ==(Object other) =>
      other is ForgePhoneInputValue &&
      number == other.number &&
      country == other.country;
  @override
  int get hashCode => Object.hash(number, country);
}

enum ForgePhoneParseKind { empty, incomplete, invalid, possible }

class ForgePhoneParseResult {
  final ForgePhoneParseKind kind;
  final String? text, number, country;
  const ForgePhoneParseResult(this.kind,
      {this.text, this.number, this.country});
}

class ForgePhoneCountryOption {
  final String country, callingCode, label;
  const ForgePhoneCountryOption(
      {required this.country, required this.callingCode, required this.label});
}

class _Country {
  final String callingCode, pattern;
  final List<int> lengths;
  _Country(Map<String, dynamic> v)
      : callingCode = v['callingCode'] as String,
        pattern = v['pattern'] as String,
        lengths = (v['lengths'] as List).cast<int>();
}

final _data = jsonDecode(forgePhoneDataJson) as Map<String, dynamic>;
final _countries = (_data['countries'] as Map<String, dynamic>)
    .map((k, v) => MapEntry(k, _Country(v as Map<String, dynamic>)));
bool isSupportedForgePhoneCountry(String country) =>
    _countries.containsKey(country);
String forgePhoneCallingCode(String country) =>
    _countries[country]?.callingCode ??
    (throw ArgumentError('Unsupported country'));
List<ForgePhoneCountryOption> forgePhoneCountries(ForgeLocale locale) {
  final key = switch (locale) {
    ForgeLocale.ptBR => 'pt-BR',
    ForgeLocale.es => 'es',
    ForgeLocale.en => 'en'
  };
  return ((_data['labels'] as Map<String, dynamic>)[key]
          as Map<String, dynamic>)
      .entries
      .map((e) => ForgePhoneCountryOption(
          country: e.key,
          callingCode: forgePhoneCallingCode(e.key),
          label: e.value as String))
      .toList(growable: false);
}

bool _matches(String pattern, String value) =>
    RegExp('^(?:' + pattern + r')$').hasMatch(value);
ForgePhoneParseResult parseForgePhone(String text, {String? country}) {
  if (country != null && !isSupportedForgePhoneCountry(country))
    throw ArgumentError('Unsupported phone country');
  final draft = text.trim();
  if (draft.isEmpty)
    return const ForgePhoneParseResult(ForgePhoneParseKind.empty);
  ForgePhoneParseResult invalid() =>
      ForgePhoneParseResult(ForgePhoneParseKind.invalid, text: text);
  ForgePhoneParseResult incomplete() =>
      ForgePhoneParseResult(ForgePhoneParseKind.incomplete, text: text);
  if (!RegExp(r'^\+?[0-9() .-]*$').hasMatch(draft) ||
      !RegExp(r'[0-9+]').hasMatch(draft)) return invalid();
  if (!draft.startsWith('+') && country == null) return incomplete();
  if (draft.startsWith('+0')) return invalid();
  if (RegExp(r'^\+\d{0,2}$').hasMatch(draft)) return incomplete();
  try {
    final p = native.PhoneNumber.parse(draft,
        callerCountry:
            country == null ? null : native.IsoCode.values.byName(country));
    final canonicalCountry =
        native.PhoneNumber.parse(p.international).isoCode.name;
    final metadata = _countries[canonicalCountry];
    if (metadata == null) return invalid();
    if (!metadata.lengths.contains(p.nsn.length)) {
      return p.nsn.length < metadata.lengths.reduce((a, b) => a < b ? a : b)
          ? incomplete()
          : invalid();
    }
    if (!RegExp(r'^\+[1-9][0-9]{1,14}$').hasMatch(p.international))
      return invalid();
    final shared = _countries.entries
        .where((e) => e.value.callingCode == p.countryCode)
        .toList();
    String? detected = canonicalCountry;
    if (shared.length > 1 && !_matches(metadata.pattern, p.nsn)) {
      detected = shared
          .where((e) => _matches(e.value.pattern, p.nsn))
          .firstOrNull
          ?.key;
    }
    final compatible = country != null &&
        forgePhoneCallingCode(country) == p.countryCode &&
        (detected == null || country == detected);
    return ForgePhoneParseResult(ForgePhoneParseKind.possible,
        number: p.international, country: compatible ? country : detected);
  } on native.PhoneNumberException {
    final digits = draft.replaceAll(RegExp(r'\D'), '');
    return digits.length < 4 ? incomplete() : invalid();
  }
}

String formatForgePhone(String? number, {bool international = true}) {
  if (number == null) return '';
  final state = parseForgePhone(number);
  if (state.kind != ForgePhoneParseKind.possible || state.number != number)
    throw ArgumentError('Invalid canonical phone');
  final p = native.PhoneNumber.parse(number);
  return international
      ? '+${p.countryCode} ${p.formatNsn(format: native.NsnFormat.international)}'
      : p.formatNsn();
}

String formatForgePhoneDraft(String text, {String? country}) {
  if (!RegExp(r'^\+?[0-9() .-]*$').hasMatch(text) ||
      !RegExp(r'[0-9+]').hasMatch(text)) return text;
  try {
    final p = native.PhoneNumber.parse(text,
        callerCountry:
            country == null ? null : native.IsoCode.values.byName(country));
    return text.startsWith('+')
        ? '+${p.countryCode} ${p.formatNsn(format: native.NsnFormat.international)}'
        : p.formatNsn();
  } on native.PhoneNumberException {
    return text;
  }
}

bool isValidForgePhone(String value, {String? country}) {
  final state = parseForgePhone(value, country: country);
  if (state.kind != ForgePhoneParseKind.possible) return false;
  try {
    return native.PhoneNumber.parse(state.number!).isValid();
  } on native.PhoneNumberException {
    return false;
  }
}

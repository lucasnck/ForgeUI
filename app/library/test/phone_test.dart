import 'dart:convert';
import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/src/helpers/phone.dart';

void main() {
  test('native phone helper matches existing Web country fixtures', () {
    final fixtures =
        jsonDecode(File('test/fixtures/phone-web.json').readAsStringSync())
            as List;
    final mismatches = <String>[];
    for (final raw in fixtures) {
      final c = raw as Map<String, dynamic>,
          expected = c['expected'] as Map<String, dynamic>;
      final r =
          parseForgePhone(c['text'] as String, country: c['country'] as String);
      if (r.kind.name != expected['kind'] ||
          r.number != expected['number'] ||
          r.country != expected['country']) {
        mismatches.add('$c => ${r.kind.name} ${r.number} ${r.country}');
      }
    }
    expect(mismatches, isEmpty, reason: mismatches.take(15).join('\n'));
  });
}

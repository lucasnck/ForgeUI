import 'dart:convert';
import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:forge_ui/src/helpers/odata_filter.dart';
import 'package:forge_ui/src/helpers/odata_filter_codec.dart';

void main() {
  test(
      'Dart OData serializer matches existing Web fixtures including exact decimal ranges',
      () {
    final cases =
        jsonDecode(File('test/fixtures/odata-web.json').readAsStringSync())
            as List;
    final mismatches = <String>[];
    for (final raw in cases) {
      final c = (raw as Map).cast<String, Object?>();
      String? result;
      Object? error;
      try {
        final fields = (c['fields'] as List)
            .map((f) =>
                decodeForgeODataFilterField((f as Map).cast<String, Object?>()))
            .toList();
        final value = decodeForgeODataFilterExpression(
            (c['expression'] as Map).cast<String, Object?>());
        result = serializeForgeODataFilter(value, fields);
        if (c['simple'] != null)
          expect(
              isForgeODataFilterSimpleExpression(value, fields), c['simple']);
      } catch (e) {
        error = e;
      }
      if (c['throws'] == true) {
        if (error == null) mismatches.add('Expected failure: $c => $result');
      } else if (error != null || result != c['expected'])
        mismatches.add('Mismatch: $c => $result ($error)');
    }
    expect(mismatches, isEmpty, reason: mismatches.take(10).join('\n'));
  });
}

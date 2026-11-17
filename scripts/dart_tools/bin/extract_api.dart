import 'dart:convert';
import 'dart:io';
import 'package:path/path.dart' as p;
import 'package:analyzer/dart/analysis/analysis_context_collection.dart';
import 'package:analyzer/dart/analysis/results.dart';
import 'package:analyzer/dart/element/element.dart';
import 'package:analyzer/dart/element/type.dart';

Future<void> main(List<String> args) async {
  final root = p.normalize(p.absolute('../..'));
  final rootDisplay = root.replaceAll('\\', '/');
  final library = p.join(root, 'app', 'library');
  final barrel = p.join(library, 'lib', 'forge_ui.dart');
  final collection = AnalysisContextCollection(includedPaths: [library]);
  final result = await collection
      .contextFor(barrel)
      .currentSession
      .getResolvedLibrary(barrel);
  if (result is! ResolvedLibraryResult)
    throw StateError('Unable to resolve public Flutter library.');
  final names = result.element.exportNamespace.definedNames2;
  final baseline =
      (jsonDecode(
                File(
                  '$root/docs/migration/coverage-matrix.json',
                ).readAsStringSync(),
              )
              as Map)['components']
          as List;
  final entries = <Map<String, Object?>>[], missing = <String>[];
  for (final raw in baseline) {
    final source = raw as Map<String, dynamic>,
        name = 'Forge' + (source['name'] as String);
    final element = names[name];
    InterfaceElement? type;
    if (element is InterfaceElement) type = element;
    if (element is TypeAliasElement && element.aliasedType is InterfaceType)
      type = (element.aliasedType as InterfaceType).element;
    if (type == null) {
      missing.add(name);
      continue;
    }
    final constructor = type.constructors
        .where((c) => c.name == null || c.name!.isEmpty || c.name == 'new')
        .firstOrNull;
    if (constructor == null) {
      missing.add('$name (default constructor)');
      continue;
    }
    final params = [
      for (final p in constructor.formalParameters)
        {
          'name': p.name,
          'type': p.type.getDisplayString(),
          'required': p.isRequiredNamed || p.isRequiredPositional,
          'named': p.isNamed,
          'defaultValue': p.defaultValueCode,
        },
    ];
    entries.add({
      'name': source['name'],
      'slug': source['slug'],
      'level': source['level'],
      'dartName': name,
      'aliasOf': element is TypeAliasElement ? type.name : null,
      'sourceFile': type.firstFragment.libraryFragment.source.fullName
          .replaceAll('\\', '/')
          .replaceFirst(rootDisplay + '/', ''),
      'signature': constructor.displayString().replaceFirst(RegExp(r'^[A-Za-z_][A-Za-z0-9_]*'), name),
      'parameters': params,
    });
  }
  final enums = <String, List<String>>{};
  for (final entry in names.entries) {
    final value = entry.value;
    if (value is EnumElement)
      enums[entry.key] = value.constants.map((c) => c.name!).toList();
  }
  if (missing.isNotEmpty)
    throw StateError('Missing public native APIs: ' + missing.join(', '));
  final output = {
    'schemaVersion': 1,
    'source':
        'Resolved Dart public export namespace and constructor parameters; not visual acceptance',
    'componentCount': entries.length,
    'components': entries,
    'enums': enums,
  };
  File(
    '$root/docs/sc/app/reference/native-component-api.json',
  ).writeAsStringSync(
    const JsonEncoder.withIndent('  ').convert(output) + '\n',
  );
  print(
    'Resolved ' +
        entries.length.toString() +
        ' public APIs and ' +
        enums.length.toString() +
        ' enum contracts.',
  );
}

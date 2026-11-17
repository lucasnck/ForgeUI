import '../types/odata_filter.dart';

ForgeODataFilterField decodeForgeODataFilterField(Map<String, Object?> json) =>
    ForgeODataFilterField(
        id: json['id'] as String,
        path: json['path'] as String,
        label: json['label'] as String,
        kind: ForgeODataFilterKind.values.byName(json['kind'] as String),
        placeholder: json['placeholder'] as String?,
        disabled: json['disabled'] as bool? ?? false,
        offset: json['offset'] as String?,
        editor: json['editor'] == null
            ? null
            : ForgeODataFilterEditor.values.byName(json['editor'] as String),
        operators: (json['operators'] as List?)
            ?.map((v) => ForgeODataFilterOperator.parse(v as String))
            .toList(),
        defaultOperator: json['defaultOperator'] == null
            ? null
            : ForgeODataFilterOperator.parse(json['defaultOperator'] as String),
        precision: json['precision'] as int?,
        scale: json['scale'] as int?,
        options: [
          for (final raw in json['options'] as List? ?? const [])
            () {
              final o = (raw as Map).cast<String, Object?>();
              return ForgeODataFilterOption(
                  value: o['value'] as String,
                  label: o['label'] as String,
                  disabled: o['disabled'] as bool? ?? false);
            }()
        ]);
ForgeODataFilterValueData? _value(Object? value, ForgeODataFilterOperator op) {
  if (value == null) return null;
  if (value is String) return ForgeODataTextValue(value);
  if (value is bool) return ForgeODataBooleanValue(value);
  if (value is num) return ForgeODataNumberValue(value);
  if (value is List) {
    if (op == ForgeODataFilterOperator.between) {
      if (value.length != 2) throw ArgumentError('Incomplete range.');
      return ForgeODataRangeValue(_value(value[0], op), _value(value[1], op));
    }
    return ForgeODataChoicesValue(value.cast<String>());
  }
  throw ArgumentError('Unsupported filter value.');
}

ForgeODataFilterExpression decodeForgeODataFilterExpression(
    Map<String, Object?> json) {
  if (json['kind'] == 'group')
    return ForgeODataFilterGroupData(
        id: json['id'] as String,
        operator: ForgeODataFilterConjunction.values
            .byName(json['operator'] as String),
        children: [
          for (final child in json['children'] as List)
            decodeForgeODataFilterExpression(
                (child as Map).cast<String, Object?>())
        ]);
  if (json['kind'] != 'condition')
    throw ArgumentError('Invalid expression node.');
  final operator = ForgeODataFilterOperator.parse(json['operator'] as String);
  return ForgeODataFilterConditionData(
      id: json['id'] as String,
      fieldId: json['fieldId'] as String,
      fieldKind:
          ForgeODataFilterKind.values.byName(json['fieldKind'] as String),
      operator: operator,
      value: _value(json['value'], operator));
}

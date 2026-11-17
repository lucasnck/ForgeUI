enum ForgeODataFilterConjunction { and, or }

enum ForgeODataFilterMode { simple, advanced }

enum ForgeODataFilterActionsLayout { inline, stack }

enum ForgeODataFilterKind {
  text,
  number,
  guid,
  decimal,
  date,
  time,
  datetime,
  boolean,
  choice,
  multiChoice
}

enum ForgeODataFilterEditor { input, search, radio, select, combobox }

enum ForgeODataFilterOperator {
  eq('eq'),
  ne('ne'),
  contains('contains'),
  startswith('startswith'),
  endswith('endswith'),
  gt('gt'),
  ge('ge'),
  lt('lt'),
  le('le'),
  between('between'),
  inValues('in');

  final String wire;
  const ForgeODataFilterOperator(this.wire);
  static ForgeODataFilterOperator parse(String value) =>
      values.firstWhere((v) => v.wire == value);
}

class ForgeODataFilterOption {
  final String value, label;
  final bool disabled;
  const ForgeODataFilterOption(
      {required this.value, required this.label, this.disabled = false});
}

class ForgeODataFilterField {
  final String id, path, label;
  final String? placeholder, offset;
  final bool disabled;
  final ForgeODataFilterKind kind;
  final ForgeODataFilterEditor? editor;
  final List<ForgeODataFilterOperator>? operators;
  final ForgeODataFilterOperator? defaultOperator;
  final int? precision, scale;
  final List<ForgeODataFilterOption> options;
  const ForgeODataFilterField(
      {required this.id,
      required this.path,
      required this.label,
      required this.kind,
      this.placeholder,
      this.disabled = false,
      this.offset,
      this.editor,
      this.operators,
      this.defaultOperator,
      this.precision,
      this.scale,
      this.options = const []});
}

sealed class ForgeODataFilterValueData {
  const ForgeODataFilterValueData();
}

class ForgeODataTextValue extends ForgeODataFilterValueData {
  final String value;
  const ForgeODataTextValue(this.value);
}

class ForgeODataNumberValue extends ForgeODataFilterValueData {
  final num value;
  const ForgeODataNumberValue(this.value);
}

class ForgeODataBooleanValue extends ForgeODataFilterValueData {
  final bool value;
  const ForgeODataBooleanValue(this.value);
}

class ForgeODataRangeValue extends ForgeODataFilterValueData {
  final ForgeODataFilterValueData? minimum, maximum;
  const ForgeODataRangeValue(this.minimum, this.maximum);
}

class ForgeODataChoicesValue extends ForgeODataFilterValueData {
  final List<String> values;
  ForgeODataChoicesValue(Iterable<String> values)
      : values = List.unmodifiable(values);
}

sealed class ForgeODataFilterExpression {
  final String id;
  const ForgeODataFilterExpression({required this.id});
}

class ForgeODataFilterConditionData extends ForgeODataFilterExpression {
  final String fieldId;
  final ForgeODataFilterKind fieldKind;
  final ForgeODataFilterOperator operator;
  final ForgeODataFilterValueData? value;
  const ForgeODataFilterConditionData(
      {required super.id,
      required this.fieldId,
      required this.fieldKind,
      required this.operator,
      required this.value});
  ForgeODataFilterConditionData withValue(ForgeODataFilterValueData? next) =>
      ForgeODataFilterConditionData(
          id: id,
          fieldId: fieldId,
          fieldKind: fieldKind,
          operator: operator,
          value: next);
}

class ForgeODataFilterGroupData extends ForgeODataFilterExpression {
  final ForgeODataFilterConjunction operator;
  final List<ForgeODataFilterExpression> children;
  ForgeODataFilterGroupData(
      {required super.id,
      required this.operator,
      Iterable<ForgeODataFilterExpression> children = const []})
      : children = List.unmodifiable(children);
  ForgeODataFilterGroupData copy(
          {ForgeODataFilterConjunction? operator,
          Iterable<ForgeODataFilterExpression>? children}) =>
      ForgeODataFilterGroupData(
          id: id,
          operator: operator ?? this.operator,
          children: children ?? this.children);
}

class ForgeODataFilterLabels {
  final String field,
      operator,
      value,
      remove,
      addCondition,
      addGroup,
      group,
      and,
      or,
      apply,
      clear,
      cancel,
      all,
      yes,
      no,
      minimum,
      maximum,
      invalid,
      unsupported;
  final Map<ForgeODataFilterOperator, String> operatorLabels;
  const ForgeODataFilterLabels(
      {required this.field,
      required this.operator,
      required this.value,
      required this.remove,
      required this.addCondition,
      required this.addGroup,
      required this.group,
      required this.and,
      required this.or,
      required this.apply,
      required this.clear,
      required this.cancel,
      required this.all,
      required this.yes,
      required this.no,
      required this.minimum,
      required this.maximum,
      required this.invalid,
      required this.unsupported,
      required this.operatorLabels});
}

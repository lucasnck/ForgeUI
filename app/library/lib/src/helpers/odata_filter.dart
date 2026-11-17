import 'dart:collection';
import '../types/odata_filter.dart';

List<ForgeODataFilterOperator> getForgeODataFilterOperators(
    ForgeODataFilterField field) {
  const compare = [
    ForgeODataFilterOperator.eq,
    ForgeODataFilterOperator.ne,
    ForgeODataFilterOperator.gt,
    ForgeODataFilterOperator.ge,
    ForgeODataFilterOperator.lt,
    ForgeODataFilterOperator.le,
    ForgeODataFilterOperator.between
  ];
  final supported = switch (field.kind) {
    ForgeODataFilterKind.text => [
        ForgeODataFilterOperator.eq,
        ForgeODataFilterOperator.ne,
        ForgeODataFilterOperator.contains,
        ForgeODataFilterOperator.startswith,
        ForgeODataFilterOperator.endswith
      ],
    ForgeODataFilterKind.boolean ||
    ForgeODataFilterKind.choice ||
    ForgeODataFilterKind.guid =>
      [ForgeODataFilterOperator.eq, ForgeODataFilterOperator.ne],
    ForgeODataFilterKind.multiChoice => [ForgeODataFilterOperator.inValues],
    _ => compare
  };
  final operators = field.operators ?? supported;
  if (operators.isEmpty ||
      operators.any((op) => !supported.contains(op)) ||
      (field.defaultOperator != null &&
          !operators.contains(field.defaultOperator)))
    throw ArgumentError('Invalid field operators.');
  return List.unmodifiable(operators);
}

ForgeODataFilterConditionData createForgeODataFilterCondition(
    ForgeODataFilterField field, String id,
    {ForgeODataFilterOperator? operator}) {
  final operators = getForgeODataFilterOperators(field),
      op = operator ??
          field.defaultOperator ??
          getForgeODataFilterOperators(field).first;
  if (!operators.contains(op)) throw ArgumentError('Invalid operator.');
  return ForgeODataFilterConditionData(
      id: id,
      fieldId: field.id,
      fieldKind: field.kind,
      operator: op,
      value: op == ForgeODataFilterOperator.between
          ? const ForgeODataRangeValue(null, null)
          : null);
}

String _quoted(String v) => "'" + v.replaceAll("'", "''") + "'";
bool _validDate(String value) {
  if (!RegExp(r'^\d{4}-\d{2}-\d{2}$').hasMatch(value)) return false;
  final year = int.parse(value.substring(0, 4)),
      month = int.parse(value.substring(5, 7)),
      day = int.parse(value.substring(8, 10));
  if (year < 1) return false;
  final d = DateTime.utc(year, month, day);
  return d.year == year && d.month == month && d.day == day;
}

String forgeODataNumberLiteral(num value) {
  if (!value.isFinite) throw ArgumentError('Invalid number.');
  final d = value.toDouble();
  if (d == 0) return '0';
  var text = d.abs().toString(), exponent = 0;
  if (text.contains('e')) {
    final pieces = text.split('e');
    text = pieces[0];
    exponent = int.parse(pieces[1]);
  }
  final point = text.indexOf('.'),
      position = (point < 0 ? text.length : point) + exponent;
  var digits = text.replaceAll('.', '');
  while (digits.length > 1 && digits.endsWith('0'))
    digits = digits.substring(0, digits.length - 1);
  final negative = d < 0 ? '-' : '';
  if (d.abs() >= 1e21 || d.abs() < 1e-6) {
    final exp = position - 1,
        mantissa =
            digits[0] + (digits.length > 1 ? '.' + digits.substring(1) : '');
    return negative + mantissa + 'e' + (exp >= 0 ? '+' : '') + exp.toString();
  }
  if (position <= 0)
    return negative + '0.' + List.filled(-position, '0').join() + digits;
  if (position >= digits.length)
    return negative +
        digits +
        List.filled(position - digits.length, '0').join();
  return negative +
      digits.substring(0, position) +
      '.' +
      digits.substring(position);
}

String _literal(ForgeODataFilterValueData? value, ForgeODataFilterField field) {
  if (value == null) throw ArgumentError('Incomplete value.');
  final kind = field.kind;
  if (kind == ForgeODataFilterKind.number) {
    if (value is! ForgeODataNumberValue) throw ArgumentError('Invalid number.');
    return forgeODataNumberLiteral(value.value);
  }
  if (kind == ForgeODataFilterKind.boolean) {
    if (value is! ForgeODataBooleanValue)
      throw ArgumentError('Invalid boolean.');
    return value.value.toString();
  }
  if (value is! ForgeODataTextValue)
    throw ArgumentError('Invalid text literal.');
  final text = value.value;
  if (kind == ForgeODataFilterKind.text) return _quoted(text);
  if (kind == ForgeODataFilterKind.guid) {
    if (text.length != 36 ||
        !RegExp(r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')
            .hasMatch(text)) throw ArgumentError('Invalid GUID.');
    return text.toLowerCase();
  }
  if (kind == ForgeODataFilterKind.decimal) {
    if (text.length > 1024 ||
        text != text.trim() ||
        !RegExp(r'^-?(?:0|[1-9]\d*)(?:\.\d+)?$').hasMatch(text))
      throw ArgumentError('Invalid decimal.');
    final parts = text.replaceFirst(RegExp(r'^-'), '').split('.'),
        integerDigits = parts[0] == '0' ? 0 : parts[0].length;
    if ((parts.length > 1 ? parts[1].length : 0) > field.scale! ||
        integerDigits > field.precision! - field.scale!)
      throw ArgumentError('Decimal outside schema precision.');
    return text;
  }
  if (kind == ForgeODataFilterKind.choice ||
      kind == ForgeODataFilterKind.multiChoice) {
    if (!field.options.any((o) => o.value == text && !o.disabled))
      throw ArgumentError('Unknown choice.');
    return _quoted(text);
  }
  if (kind == ForgeODataFilterKind.date) {
    if (!_validDate(text)) throw ArgumentError('Invalid date.');
    return text;
  }
  if (kind == ForgeODataFilterKind.time) {
    if (!RegExp(r'^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,7})?)?$')
        .hasMatch(text)) throw ArgumentError('Invalid time.');
    return text.length == 5 ? text + ':00' : text;
  }
  if (kind != ForgeODataFilterKind.datetime ||
      !RegExp(r'^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?$')
          .hasMatch(text) ||
      !_validDate(text.substring(0, 10)))
    throw ArgumentError('Invalid datetime.');
  final offset = field.offset;
  if (offset == null ||
      !RegExp(r'^(Z|[+-](0\d|1[0-3]):[0-5]\d|[+-]14:00)$').hasMatch(offset))
    throw ArgumentError('Invalid datetime offset.');
  return text + (text.length == 16 ? ':00' : '') + offset;
}

int _compareDecimal(String left, String right) {
  final a = left.split('.'),
      b = right.split('.'),
      scale =
          (a.length > 1 ? a[1].length : 0) > (b.length > 1 ? b[1].length : 0)
              ? (a.length > 1 ? a[1].length : 0)
              : (b.length > 1 ? b[1].length : 0);
  BigInt scaled(List<String> p) =>
      BigInt.parse(p.first + (p.length > 1 ? p[1] : '').padRight(scale, '0'));
  return scaled(a).compareTo(scaled(b));
}

String _timeComparable(String value) {
  final parts = value.split('.');
  return (parts.first.length == 5 ? parts.first + ':00' : parts.first) +
      '.' +
      (parts.length > 1 ? parts[1] : '').padRight(7, '0');
}

String serializeForgeODataFilter(
    ForgeODataFilterExpression expression, List<ForgeODataFilterField> fields) {
  final schema = <String, ForgeODataFilterField>{};
  for (final field in fields) {
    if (field.id.trim().isEmpty ||
        field.label.trim().isEmpty ||
        schema.containsKey(field.id) ||
        !RegExp(r'^[A-Za-z_][A-Za-z0-9_]*(?:/[A-Za-z_][A-Za-z0-9_]*)*$')
            .hasMatch(field.path)) throw ArgumentError('Invalid field schema.');
    if ((field.kind == ForgeODataFilterKind.choice ||
            field.kind == ForgeODataFilterKind.multiChoice) &&
        (field.options.map((o) => o.value).toSet().length !=
                field.options.length ||
            field.options
                .any((o) => o.value.isEmpty || o.label.trim().isEmpty)))
      throw ArgumentError('Invalid choices.');
    if (field.kind == ForgeODataFilterKind.decimal &&
        (field.precision == null ||
            field.scale == null ||
            field.precision! < 1 ||
            field.precision! > 1024 ||
            field.scale! < 0 ||
            field.scale! > field.precision!))
      throw ArgumentError('Invalid decimal schema.');
    getForgeODataFilterOperators(field);
    schema[field.id] = field;
  }
  final visited = HashSet<ForgeODataFilterExpression>.identity(),
      ids = <String>{};
  String visit(ForgeODataFilterExpression node, int depth) {
    if (depth > 32 ||
        !visited.add(node) ||
        node.id.trim().isEmpty ||
        !ids.add(node.id))
      throw ArgumentError('Invalid expression tree or identity.');
    if (node is ForgeODataFilterGroupData) {
      final parts = node.children
          .map((child) => visit(child, depth + 1))
          .where((p) => p.isNotEmpty)
          .toList();
      visited.remove(node);
      return parts.isEmpty
          ? ''
          : '(' + parts.join(' ' + node.operator.name + ' ') + ')';
    }
    final condition = node as ForgeODataFilterConditionData,
        field = schema[node.fieldId];
    if (field == null ||
        field.kind != condition.fieldKind ||
        !getForgeODataFilterOperators(field).contains(condition.operator))
      throw ArgumentError('Invalid condition.');
    final path = field.path, value = condition.value, op = condition.operator;
    if (op == ForgeODataFilterOperator.between) {
      if (value is! ForgeODataRangeValue)
        throw ArgumentError('Incomplete range.');
      final low = _literal(value.minimum, field),
          high = _literal(value.maximum, field);
      final reversed = switch (field.kind) {
        ForgeODataFilterKind.decimal => _compareDecimal(low, high) > 0,
        ForgeODataFilterKind.number =>
          (value.minimum as ForgeODataNumberValue).value.toDouble() >
              (value.maximum as ForgeODataNumberValue).value.toDouble(),
        ForgeODataFilterKind.datetime =>
          DateTime.parse(low).isAfter(DateTime.parse(high)),
        ForgeODataFilterKind.time =>
          _timeComparable(low).compareTo(_timeComparable(high)) > 0,
        _ => low.compareTo(high) > 0
      };
      if (reversed) throw ArgumentError('Reversed range.');
      return '(' + path + ' ge ' + low + ' and ' + path + ' le ' + high + ')';
    }
    if (op == ForgeODataFilterOperator.inValues) {
      if (value is! ForgeODataChoicesValue || value.values.isEmpty)
        throw ArgumentError('Incomplete choices.');
      return '(' +
          value.values
              .toSet()
              .map((v) =>
                  path + ' eq ' + _literal(ForgeODataTextValue(v), field))
              .join(' or ') +
          ')';
    }
    final literal = _literal(value, field);
    return [
      ForgeODataFilterOperator.contains,
      ForgeODataFilterOperator.startswith,
      ForgeODataFilterOperator.endswith
    ].contains(op)
        ? op.wire + '(' + path + ',' + literal + ')'
        : path + ' ' + op.wire + ' ' + literal;
  }

  return visit(expression, 0);
}

bool isForgeODataFilterSimpleExpression(
    ForgeODataFilterExpression expression, List<ForgeODataFilterField> fields) {
  if (expression is! ForgeODataFilterGroupData ||
      expression.operator != ForgeODataFilterConjunction.and) return false;
  final seen = <String>{};
  for (final node in expression.children) {
    if (node is! ForgeODataFilterConditionData || !seen.add(node.fieldId))
      return false;
    final field = fields.where((f) => f.id == node.fieldId).firstOrNull;
    if (field == null ||
        node.fieldKind != field.kind ||
        node.operator !=
            (field.defaultOperator ??
                getForgeODataFilterOperators(field).first)) return false;
  }
  return true;
}

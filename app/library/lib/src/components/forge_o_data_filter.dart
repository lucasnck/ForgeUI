import 'package:flutter/material.dart';
import '../types/odata_filter.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';
import '../helpers/odata_filter.dart';
import 'forge_layout.dart';
import 'forge_button.dart';
import 'forge_select.dart';
import 'forge_choice_group.dart';
import 'forge_input.dart';
import 'forge_number_input.dart';
import 'forge_search_input.dart';
import 'forge_masked_input.dart';
import 'forge_temporal_input.dart';
import 'forge_query_input.dart';
import 'forge_list_box.dart';

class ForgeODataFilter extends StatefulWidget {
  final ForgeODataFilterMode mode;
  final List<ForgeODataFilterField> fields;
  final ForgeODataFilterExpression value;
  final ValueChanged<ForgeODataFilterExpression> onValueChange;
  final void Function(ForgeODataFilterExpression value, String filter) onApply;
  final VoidCallback? onCancel;
  final ForgeODataFilterLabels labels;
  final bool disabled;
  final ForgeODataFilterActionsLayout actionsLayout;
  const ForgeODataFilter(
      {super.key,
      required this.mode,
      required this.fields,
      required this.value,
      required this.onValueChange,
      required this.onApply,
      required this.labels,
      this.onCancel,
      this.disabled = false,
      this.actionsLayout = ForgeODataFilterActionsLayout.inline});
  @override
  State<ForgeODataFilter> createState() => _FilterState();
}

class _FilterState extends State<ForgeODataFilter> {
  String? error;
  bool get unsupported =>
      widget.mode == ForgeODataFilterMode.simple &&
      !isForgeODataFilterSimpleExpression(widget.value, widget.fields);
  void change(ForgeODataFilterExpression next) {
    if (widget.disabled) return;
    setState(() => error = null);
    widget.onValueChange(next);
  }

  void simpleChange(ForgeODataFilterConditionData next) {
    final value = widget.value;
    if (widget.disabled || unsupported || value is! ForgeODataFilterGroupData)
      return;
    final empty = next.value == null ||
        (next.value is ForgeODataChoicesValue &&
            (next.value as ForgeODataChoicesValue).values.isEmpty) ||
        (next.value is ForgeODataRangeValue &&
            (next.value as ForgeODataRangeValue).minimum == null &&
            (next.value as ForgeODataRangeValue).maximum == null);
    final exists = value.children.any(
        (n) => n is ForgeODataFilterConditionData && n.fieldId == next.fieldId);
    change(value.copy(
        children: empty
            ? value.children.where((n) =>
                n is! ForgeODataFilterConditionData ||
                n.fieldId != next.fieldId)
            : exists
                ? value.children.map((n) =>
                    n is ForgeODataFilterConditionData &&
                            n.fieldId == next.fieldId
                        ? next
                        : n)
                : [...value.children, next]));
  }

  void apply() {
    if (widget.disabled || unsupported) return;
    String filter;
    try {
      filter = serializeForgeODataFilter(widget.value, widget.fields);
    } catch (_) {
      setState(() => error = widget.labels.invalid);
      return;
    }
    setState(() => error = null);
    widget.onApply(widget.value, filter);
  }

  @override
  Widget build(BuildContext context) {
    final value = widget.value;
    final actions = [
      ForgeButton(
          onPressed: apply,
          disabled: widget.disabled || unsupported,
          fullWidth:
              widget.actionsLayout == ForgeODataFilterActionsLayout.stack,
          tone: ForgeTone.neutral,
          appearance: ForgeAppearance.bordered,
          child: Text(widget.labels.apply)),
      ForgeButton(
          onPressed: () => change(ForgeODataFilterGroupData(
              id: value.id, operator: ForgeODataFilterConjunction.and)),
          disabled: widget.disabled,
          fullWidth:
              widget.actionsLayout == ForgeODataFilterActionsLayout.stack,
          tone: ForgeTone.neutral,
          appearance: ForgeAppearance.ghost,
          child: Text(widget.labels.clear)),
      if (widget.onCancel != null)
        ForgeButton(
            onPressed: widget.onCancel,
            disabled: widget.disabled,
            fullWidth:
                widget.actionsLayout == ForgeODataFilterActionsLayout.stack,
            tone: ForgeTone.neutral,
            appearance: ForgeAppearance.ghost,
            child: Text(widget.labels.cancel))
    ];
    return ForgeStack(gap: ForgeSpace.s3, children: [
      if (unsupported)
        Semantics(liveRegion: true, child: Text(widget.labels.unsupported))
      else if (widget.mode == ForgeODataFilterMode.simple)
        ForgeStack(gap: ForgeSpace.s3, children: [
          for (final field in widget.fields)
            ForgeODataFilterCondition(
                key: ValueKey(field.id),
                fields: widget.fields,
                labels: widget.labels,
                disabled: widget.disabled,
                simple: true,
                value: value is ForgeODataFilterGroupData
                    ? value.children
                            .whereType<ForgeODataFilterConditionData>()
                            .where((c) => c.fieldId == field.id)
                            .firstOrNull ??
                        createForgeODataFilterCondition(
                            field, value.id + '-' + field.id)
                    : createForgeODataFilterCondition(
                        field, value.id + '-' + field.id),
                onValueChange: simpleChange)
        ])
      else
        _ODataNode(
            key: ValueKey(value.id),
            node: value,
            fields: widget.fields,
            labels: widget.labels,
            disabled: widget.disabled,
            path: '1',
            onChange: change),
      if (error != null) Semantics(liveRegion: true, child: Text(error!)),
      widget.actionsLayout == ForgeODataFilterActionsLayout.stack
          ? ForgeStack(gap: ForgeSpace.s2, children: actions)
          : ForgeInline(gap: ForgeSpace.s2, children: actions)
    ]);
  }
}

class _ODataNode extends StatefulWidget {
  final ForgeODataFilterExpression node;
  final List<ForgeODataFilterField> fields;
  final ForgeODataFilterLabels labels;
  final bool disabled;
  final String path;
  final ValueChanged<ForgeODataFilterExpression> onChange;
  final VoidCallback? onRemove;
  const _ODataNode(
      {super.key,
      required this.node,
      required this.fields,
      required this.labels,
      required this.disabled,
      required this.path,
      required this.onChange,
      this.onRemove});
  @override
  State<_ODataNode> createState() => _ODataNodeState();
}

class _ODataNodeState extends State<_ODataNode> {
  int sequence = 0;
  String nextId() =>
      widget.node.id +
      '-forge-' +
      identityHashCode(this).toString() +
      '-' +
      (++sequence).toString();
  @override
  Widget build(BuildContext context) {
    final node = widget.node;
    if (node is ForgeODataFilterConditionData)
      return ForgeODataFilterCondition(
          fields: widget.fields,
          value: node,
          onValueChange: widget.onChange,
          labels: widget.labels,
          disabled: widget.disabled,
          onRemove: widget.onRemove);
    final group = node as ForgeODataFilterGroupData;
    void change(ForgeODataFilterGroupData next) {
      if (!widget.disabled) widget.onChange(next);
    }

    return ForgeODataFilterGroup(
        label: widget.labels.group + ' ' + widget.path,
        value: group.operator,
        onValueChange: (v) => change(group.copy(operator: v)),
        labels: widget.labels,
        disabled: widget.disabled,
        onRemove: widget.onRemove,
        onAddCondition: () {
          final field = widget.fields.where((f) => !f.disabled).firstOrNull;
          if (field != null)
            change(group.copy(children: [
              ...group.children,
              createForgeODataFilterCondition(field, nextId())
            ]));
        },
        onAddGroup: () => change(group.copy(children: [
              ...group.children,
              ForgeODataFilterGroupData(
                  id: nextId(), operator: ForgeODataFilterConjunction.or)
            ])),
        children: [
          for (var i = 0; i < group.children.length; i++)
            _ODataNode(
                key: ValueKey(group.children[i].id),
                node: group.children[i],
                fields: widget.fields,
                labels: widget.labels,
                disabled: widget.disabled,
                path: widget.path + '.' + (i + 1).toString(),
                onChange: (next) => change(group.copy(children: [
                      for (final child in group.children)
                        child.id == group.children[i].id ? next : child
                    ])),
                onRemove: () => change(group.copy(
                    children: group.children
                        .where((child) => child.id != group.children[i].id))))
        ]);
  }
}

class ForgeODataFilterGroup extends StatelessWidget {
  final String label;
  final ForgeODataFilterConjunction value;
  final ValueChanged<ForgeODataFilterConjunction> onValueChange;
  final ForgeODataFilterLabels labels;
  final bool disabled;
  final List<Widget> children;
  final VoidCallback? onAddCondition, onAddGroup, onRemove;
  const ForgeODataFilterGroup(
      {super.key,
      required this.label,
      required this.value,
      required this.onValueChange,
      required this.labels,
      required this.children,
      this.disabled = false,
      this.onAddCondition,
      this.onAddGroup,
      this.onRemove});
  @override
  Widget build(BuildContext context) {
    if (label.trim().isEmpty)
      throw ArgumentError('Filter groups require distinct labels.');
    return ForgeSurface(
        padding: ForgeSpace.s3,
        elevation: ForgeElevation.flat,
        child: ForgeChoiceGroup(legend: label, disabled: disabled, children: [
          ForgeChoiceGroupBody(
              child: ForgeStack(gap: ForgeSpace.s3, children: [
            ForgeSelect(
                label: labels.operator,
                value: value.name,
                disabled: disabled,
                options: [
                  ForgeOption(value: 'and', label: labels.and),
                  ForgeOption(value: 'or', label: labels.or)
                ],
                onChanged: (v) => onValueChange(
                    ForgeODataFilterConjunction.values.byName(v))),
            ForgeInline(gap: ForgeSpace.s2, children: [
              if (onAddCondition != null)
                ForgeButton(
                    onPressed: onAddCondition,
                    disabled: disabled,
                    tone: ForgeTone.neutral,
                    appearance: ForgeAppearance.ghost,
                    child: Text(labels.addCondition)),
              if (onAddGroup != null)
                ForgeButton(
                    onPressed: onAddGroup,
                    disabled: disabled,
                    tone: ForgeTone.neutral,
                    appearance: ForgeAppearance.ghost,
                    child: Text(labels.addGroup)),
              if (onRemove != null)
                ForgeButton(
                    onPressed: onRemove,
                    disabled: disabled,
                    tone: ForgeTone.neutral,
                    appearance: ForgeAppearance.ghost,
                    child: Text(labels.remove))
            ]),
            ...children
          ]))
        ]));
  }
}

class ForgeODataFilterCondition extends StatelessWidget {
  final List<ForgeODataFilterField> fields;
  final ForgeODataFilterConditionData value;
  final ValueChanged<ForgeODataFilterConditionData> onValueChange;
  final ForgeODataFilterLabels labels;
  final bool simple, disabled;
  final VoidCallback? onRemove;
  const ForgeODataFilterCondition(
      {super.key,
      required this.fields,
      required this.value,
      required this.onValueChange,
      required this.labels,
      this.simple = false,
      this.disabled = false,
      this.onRemove});
  @override
  Widget build(BuildContext context) {
    final field = fields.where((f) => f.id == value.fieldId).firstOrNull;
    if (field == null || field.kind != value.fieldKind)
      throw ArgumentError('Condition requires a matching field.');
    final operators = getForgeODataFilterOperators(field),
        blocked = disabled || field.disabled;
    if (!operators.contains(value.operator))
      throw ArgumentError('Unsupported condition operator.');
    return ForgeStack(gap: ForgeSpace.s2, children: [
      if (!simple)
        ForgeStack(gap: ForgeSpace.s2, children: [
          ForgeSelect(
              label: labels.field,
              value: field.id,
              disabled: blocked,
              options: [
                for (final f in fields)
                  ForgeOption(value: f.id, label: f.label, disabled: f.disabled)
              ],
              onChanged: (id) {
                if (blocked) return;
                final next = fields.firstWhere((f) => f.id == id);
                if (!next.disabled)
                  onValueChange(
                      createForgeODataFilterCondition(next, value.id));
              }),
          ForgeSelect(
              label: labels.operator,
              value: value.operator.wire,
              disabled: blocked,
              options: [
                for (final op in operators)
                  ForgeOption(
                      value: op.wire,
                      label: labels.operatorLabels[op] ??
                          (throw ArgumentError(
                              'Missing localized operator label.')))
              ],
              onChanged: (v) {
                if (!blocked)
                  onValueChange(createForgeODataFilterCondition(field, value.id,
                      operator: ForgeODataFilterOperator.parse(v)));
              })
        ]),
      ForgeODataFilterValue(
          key: ValueKey(field.id + '-' + value.operator.wire),
          field: field,
          value: value.value,
          operator: value.operator,
          onValueChange: (next) {
            if (!blocked) onValueChange(value.withValue(next));
          },
          label: field.label,
          labels: labels,
          disabled: blocked),
      if (!simple && onRemove != null)
        ForgeButton(
            onPressed: onRemove,
            disabled: blocked,
            appearance: ForgeAppearance.ghost,
            tone: ForgeTone.neutral,
            semanticLabel: labels.remove + ': ' + field.label,
            child: Text(labels.remove))
    ]);
  }
}

class _NumberDraft {
  final String text;
  final ForgeODataFilterValueData? expected, baseline;
  const _NumberDraft(this.text, this.expected, this.baseline);
}

class ForgeODataFilterValue extends StatefulWidget {
  final ForgeODataFilterField field;
  final ForgeODataFilterValueData? value;
  final ValueChanged<ForgeODataFilterValueData?> onValueChange;
  final String label;
  final ForgeODataFilterLabels labels;
  final ForgeODataFilterOperator? operator;
  final bool disabled;
  final bool? invalid;
  const ForgeODataFilterValue(
      {super.key,
      required this.field,
      required this.value,
      required this.onValueChange,
      required this.label,
      required this.labels,
      this.operator,
      this.disabled = false,
      this.invalid});
  @override
  State<ForgeODataFilterValue> createState() => _FilterValueState();
}

class _FilterValueState extends State<ForgeODataFilterValue> {
  String? query;
  final Map<int, _NumberDraft> drafts = {};
  bool get disabled => widget.disabled || widget.field.disabled;
  bool equivalent(ForgeODataFilterValueData? a, ForgeODataFilterValueData? b) =>
      a == b ||
      (a is ForgeODataNumberValue &&
          b is ForgeODataNumberValue &&
          (a.value == b.value || (a.value.isNaN && b.value.isNaN)));
  @override
  void didUpdateWidget(covariant ForgeODataFilterValue old) {
    super.didUpdateWidget(old);
    if (old.field.id != widget.field.id || old.operator != widget.operator) {
      drafts.clear();
      query = null;
    }
  }

  void change(ForgeODataFilterValueData? next) {
    if (!disabled) widget.onValueChange(next);
  }

  String text(ForgeODataFilterValueData? value) => switch (value) {
        ForgeODataTextValue v => v.value,
        ForgeODataNumberValue v =>
          v.value.isFinite ? forgeODataNumberLiteral(v.value) : '',
        _ => ''
      };
  String date(String raw) => raw.isEmpty
      ? ''
      : raw.substring(0, raw.length.clamp(0, 4)) +
          (raw.length > 4
              ? '-' + raw.substring(4, raw.length.clamp(4, 6))
              : '') +
          (raw.length > 6
              ? '-' + raw.substring(6, raw.length.clamp(6, 8))
              : '');
  Widget control(ForgeODataFilterValueData? value, String label, int index,
      ValueChanged<ForgeODataFilterValueData?> onChange) {
    final field = widget.field, shown = text(value), kind = field.kind;
    void emitText(String raw) =>
        onChange(raw.isEmpty ? null : ForgeODataTextValue(raw));
    if (kind == ForgeODataFilterKind.date)
      return ForgeDateInput(
          value: shown.replaceAll('-', ''),
          mask: '0000-00-00',
          onValueChange: (raw) =>
              onChange(raw.isEmpty ? null : ForgeODataTextValue(date(raw))),
          label: label,
          placeholder: field.placeholder ?? 'YYYY-MM-DD',
          disabled: disabled,
          invalid: widget.invalid);
    if (kind == ForgeODataFilterKind.time)
      return ForgeTimeInput(
          value: shown,
          onChanged: emitText,
          label: label,
          pickerLabel: MaterialLocalizations.of(context).timePickerDialHelpText,
          placeholder: field.placeholder,
          disabled: disabled,
          invalid: widget.invalid);
    if (kind == ForgeODataFilterKind.datetime)
      return ForgeDateTimeInput(
          value: shown,
          onChanged: emitText,
          label: label,
          pickerLabel: MaterialLocalizations.of(context).datePickerHelpText,
          placeholder: field.placeholder,
          disabled: disabled,
          invalid: widget.invalid);
    if (kind == ForgeODataFilterKind.number) {
      final draft = drafts[index],
          useDraft = draft != null &&
              (equivalent(value, draft.expected) ||
                  equivalent(value, draft.baseline) &&
                      draft.expected is ForgeODataNumberValue &&
                      (draft.expected as ForgeODataNumberValue).value.isNaN);
      final display = useDraft ? draft.text : shown;
      return ForgeNumberInput(
          value: display,
          label: label,
          placeholder: field.placeholder,
          disabled: disabled,
          invalid: widget.invalid,
          onChanged: (raw) {
            final next = raw.isEmpty
                ? null
                : ForgeODataNumberValue(double.tryParse(raw) ?? double.nan);
            drafts[index] = _NumberDraft(raw, next, value);
            onChange(next);
          });
    }
    if (kind == ForgeODataFilterKind.text &&
        field.editor == ForgeODataFilterEditor.search)
      return ForgeSearchInput(
          value: shown,
          label: label,
          onChanged: emitText,
          disabled: disabled,
          invalid: widget.invalid,
          placeholder: field.placeholder);
    return ForgeInput(
        value: shown,
        label: label,
        onChanged: emitText,
        disabled: disabled,
        invalid: widget.invalid,
        placeholder: field.placeholder,
        keyboardType: kind == ForgeODataFilterKind.decimal
            ? const TextInputType.numberWithOptions(decimal: true, signed: true)
            : TextInputType.text,
        capitalization: TextCapitalization.none,
        spellCheck: kind != ForgeODataFilterKind.guid &&
            kind != ForgeODataFilterKind.decimal);
  }

  @override
  Widget build(BuildContext context) {
    final f = widget.field, value = widget.value, labels = widget.labels;
    if (f.kind == ForgeODataFilterKind.boolean)
      return ForgeRadioGroup(
          name: 'filter-' + identityHashCode(this).toString(),
          legend: widget.label,
          disabled: disabled,
          value:
              value is ForgeODataBooleanValue ? value.value.toString() : 'all',
          onValueChange: (v) =>
              change(v == 'all' ? null : ForgeODataBooleanValue(v == 'true')),
          children: [
            ForgeChoiceGroupBody(
                child: ForgeStack(gap: ForgeSpace.s2, children: [
              ForgeRadioGroupItem(value: 'all', label: labels.all),
              ForgeRadioGroupItem(value: 'true', label: labels.yes),
              ForgeRadioGroupItem(value: 'false', label: labels.no)
            ]))
          ]);
    if (f.kind == ForgeODataFilterKind.multiChoice)
      return ForgeCheckboxGroup(
          name: 'filter-' + identityHashCode(this).toString(),
          legend: widget.label,
          value: value is ForgeODataChoicesValue ? value.values : const [],
          disabled: disabled,
          onValueChange: (v) => change(ForgeODataChoicesValue(v)),
          children: [
            ForgeChoiceGroupBody(
                child: ForgeStack(gap: ForgeSpace.s2, children: [
              for (final o in f.options)
                ForgeCheckboxGroupItem(
                    value: o.value, label: o.label, disabled: o.disabled)
            ]))
          ]);
    if (f.kind == ForgeODataFilterKind.choice) {
      final selected = value is ForgeODataTextValue ? value.value : null;
      if (f.editor == ForgeODataFilterEditor.radio)
        return ForgeRadioGroup(
            name: 'filter-' + identityHashCode(this).toString(),
            legend: widget.label,
            value: selected ?? '',
            disabled: disabled,
            onValueChange: (v) =>
                change(v.isEmpty ? null : ForgeODataTextValue(v)),
            children: [
              ForgeChoiceGroupBody(
                  child: ForgeStack(gap: ForgeSpace.s2, children: [
                ForgeRadioGroupItem(value: '', label: labels.all),
                for (final o in f.options)
                  ForgeRadioGroupItem(
                      value: o.value, label: o.label, disabled: o.disabled)
              ]))
            ]);
      if (f.editor == ForgeODataFilterEditor.combobox)
        return ForgeCombobox(
            query: query ??
                f.options
                    .where((o) => o.value == selected)
                    .firstOrNull
                    ?.label ??
                '',
            onQueryChange: (v) => setState(() => query = v),
            selectedValue: selected,
            onSelectionChange: (v) {
              change(v == null ? null : ForgeODataTextValue(v));
              if (v != null) setState(() => query = null);
            },
            label: widget.label,
            semanticLabel: widget.label,
            listboxLabel: widget.label,
            disabled: disabled,
            invalid: widget.invalid,
            options: [
              for (final o in f.options)
                if (query == null ||
                    o.label.toLowerCase().contains(query!.toLowerCase()))
                  ForgeChoiceOption(
                      value: o.value, label: o.label, disabled: o.disabled)
            ],
            children: const [
              ForgeComboboxBody()
            ]);
      return ForgeSelect(
          value: selected ?? '',
          label: widget.label,
          disabled: disabled,
          invalid: widget.invalid,
          options: [
            ForgeOption(value: '', label: labels.all),
            for (final o in f.options)
              ForgeOption(value: o.value, label: o.label, disabled: o.disabled)
          ],
          onChanged: (v) => change(v.isEmpty ? null : ForgeODataTextValue(v)));
    }
    if (widget.operator == ForgeODataFilterOperator.between) {
      final range = value is ForgeODataRangeValue
          ? value
          : const ForgeODataRangeValue(null, null);
      return ForgeStack(gap: ForgeSpace.s2, children: [
        control(range.minimum, widget.label + ' — ' + labels.minimum, 0,
            (v) => change(ForgeODataRangeValue(v, range.maximum))),
        control(range.maximum, widget.label + ' — ' + labels.maximum, 1,
            (v) => change(ForgeODataRangeValue(range.minimum, v)))
      ]);
    }
    return control(value, widget.label, 0, change);
  }
}

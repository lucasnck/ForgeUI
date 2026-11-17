import 'dart:convert';
import 'package:flutter/material.dart';
import '../controllers/popup_listbox_controller.dart';
import '../types/component_capabilities.dart';
import 'internal/configured_input.dart';
import 'forge_layout.dart';
import 'forge_list_box.dart';
import 'forge_popup_listbox.dart';

enum _QueryKind { autocomplete, combobox }

enum _QueryPartKind { header, body, footer }

abstract class _QueryInput extends ForgeConfiguredInput {
  final List<ForgeChoiceOption> options;
  final String query, listboxLabel;
  final ValueChanged<String> onQueryChange;
  final List<Widget> children;
  final _QueryKind kind;
  const _QueryInput(
      {super.key,
      required this.options,
      required this.query,
      required this.onQueryChange,
      required this.listboxLabel,
      required this.children,
      required this.kind,
      super.controller,
      super.focusNode,
      super.control,
      super.name,
      super.semanticLabel,
      super.placeholder,
      super.label,
      super.hint,
      super.error,
      super.pattern,
      super.validationMessage,
      super.form,
      super.disabled,
      super.readOnly,
      super.required,
      super.autofocus,
      super.fullWidth,
      super.animated,
      super.invalid,
      super.minLength,
      super.maxLength,
      super.size,
      super.tone,
      super.appearance,
      super.shape,
      super.keyboardType,
      super.textInputAction,
      super.autofillHints,
      super.autocorrect,
      super.spellCheck,
      super.capitalization,
      super.onFocusChange,
      super.onSubmitted});
  @override
  State<_QueryInput> createState() => _QueryState();
}

class ForgeAutocomplete extends _QueryInput {
  const ForgeAutocomplete(
      {super.key,
      required super.options,
      required super.query,
      required super.onQueryChange,
      required super.listboxLabel,
      required super.children,
      super.controller,
      super.focusNode,
      super.control,
      super.name,
      super.semanticLabel,
      super.placeholder,
      super.label,
      super.hint,
      super.error,
      super.pattern,
      super.validationMessage,
      super.form,
      super.disabled,
      super.readOnly,
      super.required,
      super.autofocus,
      super.fullWidth,
      super.animated,
      super.invalid,
      super.minLength,
      super.maxLength,
      super.size,
      super.tone,
      super.appearance,
      super.shape,
      super.keyboardType,
      super.textInputAction,
      super.autofillHints,
      super.autocorrect,
      super.spellCheck,
      super.capitalization,
      super.onFocusChange,
      super.onSubmitted})
      : super(kind: _QueryKind.autocomplete);
}

class ForgeCombobox extends _QueryInput {
  final String? selectedValue;
  final ValueChanged<String?> onSelectionChange;
  const ForgeCombobox(
      {super.key,
      required super.options,
      required super.query,
      required super.onQueryChange,
      required this.selectedValue,
      required this.onSelectionChange,
      required super.listboxLabel,
      required super.children,
      super.controller,
      super.focusNode,
      super.control,
      super.name,
      super.semanticLabel,
      super.placeholder,
      super.label,
      super.hint,
      super.error,
      super.pattern,
      super.validationMessage,
      super.form,
      super.disabled,
      super.readOnly,
      super.required,
      super.autofocus,
      super.fullWidth,
      super.animated,
      super.invalid,
      super.minLength,
      super.maxLength,
      super.size,
      super.tone,
      super.appearance,
      super.shape,
      super.keyboardType,
      super.textInputAction,
      super.autofillHints,
      super.autocorrect,
      super.spellCheck,
      super.capitalization,
      super.onFocusChange,
      super.onSubmitted})
      : super(kind: _QueryKind.combobox);
}

class _QueryState extends ConfiguredInputState<_QueryInput> {
  late final ForgePopupListboxController popup;
  String? accepted;
  String? skipChange;
  bool composing = false;
  List<ForgeChoiceOption> get enabledOptions =>
      widget.options.where((o) => !o.disabled).toList();
  @override
  String get initialText => widget.query;
  @override
  void initState() {
    super.initState();
    popup = ForgePopupListboxController(onAcceptOption: accept);
    configure();
  }

  void configure() {
    final options = enabledOptions;
    final key = widget.query == accepted
        ? null
        : jsonEncode([
            widget.query,
            widget.disabled,
            widget.readOnly,
            for (final o in options) [o.value, o.label]
          ]);
    popup.configure(
        count: widget.disabled || widget.readOnly ? 0 : options.length,
        queryKey: key,
        notify: false);
  }

  @override
  void didUpdateWidget(covariant _QueryInput old) {
    super.didUpdateWidget(old);
    if (old.query != widget.query && accepted != widget.query) accepted = null;
    configure();
  }

  void accept(int index) {
    final options = enabledOptions;
    if (widget.disabled ||
        widget.readOnly ||
        index < 0 ||
        index >= options.length) return;
    final option = options[index];
    setState(() => accepted = option.label);
    widget.onQueryChange(option.label);
    if (widget case ForgeCombobox c) c.onSelectionChange(option.value);
    configure();
  }

  void edit(String text) {
    if (widget.disabled || widget.readOnly) return;
    widget.onQueryChange(text);
    if (widget case ForgeCombobox c when !composing) {
      if (c.selectedValue != null &&
          widget.options
                  .where((o) => o.value == c.selectedValue)
                  .firstOrNull
                  ?.label !=
              text) c.onSelectionChange(null);
    }
  }

  Widget editor() => Focus(
      onKeyEvent: (_, event) => popup.handle(event),
      child: buildInput(
          useDisplayValue: true,
          displayValue: widget.query,
          onChanged: (text) {
            if (skipChange == text) {
              skipChange = null;
              return;
            }
            edit(text);
          },
          onFocusChange: (v) {
            popup.setFocused(v);
            widget.onFocusChange?.call(v);
          },
          onEditingValueChange: (v) {
            final active = v.composing.isValid && !v.composing.isCollapsed;
            popup.composing = active;
            if (composing && !active) {
              skipChange = v.text;
              composing = false;
              edit(v.text);
            }
            composing = active;
          }));
  @override
  void dispose() {
    popup.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    configure();
    final parts = <_QueryPartKind, Widget>{};
    for (final child in widget.children) {
      if (child is! _QueryPart || child.kind != widget.kind)
        throw ArgumentError(
            'Query input accepts its matching canonical parts only.');
      if (parts.containsKey(child.part))
        throw ArgumentError('Duplicate query part.');
      parts[child.part] = child;
    }
    if (!parts.containsKey(_QueryPartKind.body))
      throw ArgumentError('Query input requires Body.');
    return _QueryScope(
        state: this,
        child: ForgeStack(gap: ForgeSpace.s2, children: [
          for (final part in _QueryPartKind.values)
            if (parts[part] != null) parts[part]!
        ]));
  }
}

class _QueryScope extends InheritedWidget {
  final _QueryState state;
  const _QueryScope({required this.state, required super.child});
  static _QueryState of(BuildContext context, _QueryKind kind) {
    final s = context.dependOnInheritedWidgetOfExactType<_QueryScope>();
    if (s == null || s.state.widget.kind != kind)
      throw StateError('Query part requires its matching owner.');
    return s.state;
  }

  @override
  bool updateShouldNotify(_QueryScope old) => true;
}

abstract class _QueryPart extends StatelessWidget {
  final _QueryKind kind;
  final _QueryPartKind part;
  final Widget? child;
  const _QueryPart(
      {super.key, required this.kind, required this.part, this.child});
  @override
  Widget build(BuildContext context) {
    final s = _QueryScope.of(context, kind);
    if (part == _QueryPartKind.header)
      return GestureDetector(onTap: s.inputFocus.requestFocus, child: child);
    if (part == _QueryPartKind.body) return _QueryBody(owner: s, child: child);
    return child ?? const SizedBox.shrink();
  }
}

class ForgeAutocompleteHeader extends _QueryPart {
  const ForgeAutocompleteHeader({super.key, super.child})
      : super(kind: _QueryKind.autocomplete, part: _QueryPartKind.header);
}

class ForgeAutocompleteBody extends _QueryPart {
  const ForgeAutocompleteBody({super.key, super.child})
      : super(kind: _QueryKind.autocomplete, part: _QueryPartKind.body);
}

class ForgeAutocompleteFooter extends _QueryPart {
  const ForgeAutocompleteFooter({super.key, super.child})
      : super(kind: _QueryKind.autocomplete, part: _QueryPartKind.footer);
}

class ForgeComboboxHeader extends _QueryPart {
  const ForgeComboboxHeader({super.key, super.child})
      : super(kind: _QueryKind.combobox, part: _QueryPartKind.header);
}

class ForgeComboboxBody extends _QueryPart {
  const ForgeComboboxBody({super.key, super.child})
      : super(kind: _QueryKind.combobox, part: _QueryPartKind.body);
}

class ForgeComboboxFooter extends _QueryPart {
  const ForgeComboboxFooter({super.key, super.child})
      : super(kind: _QueryKind.combobox, part: _QueryPartKind.footer);
}

class _QueryBody extends StatefulWidget {
  final _QueryState owner;
  final Widget? child;
  const _QueryBody({required this.owner, this.child});
  @override
  State<_QueryBody> createState() => _QueryBodyState();
}

class _QueryBodyState extends State<_QueryBody> {
  final portal = OverlayPortalController(), link = LayerLink();
  double width = 320;
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) portal.show();
    });
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.owner;
    return OverlayPortal(
        controller: portal,
        overlayChildBuilder: (context) => Positioned.fill(
            child: CompositedTransformFollower(
                link: link,
                showWhenUnlinked: false,
                targetAnchor: Alignment.bottomLeft,
                followerAnchor: Alignment.topLeft,
                child: Align(
                    alignment: Alignment.topLeft,
                    child: SizedBox(
                        width: width,
                        child: TextFieldTapRegion(
                            child: ForgePopupListbox<ForgeChoiceOption>(
                                popup: s.popup,
                                items: s.enabledOptions,
                                getOptionLabel: (o) => o.label,
                                getOptionKey: (o, i) => o.value,
                                listboxLabel: s.widget.listboxLabel)))))),
        child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              CompositedTransformTarget(
                  link: link,
                  child: LayoutBuilder(builder: (context, c) {
                    width = c.hasBoundedWidth ? c.maxWidth : 320;
                    return s.editor();
                  })),
              if (widget.child != null) widget.child!
            ]));
  }
}

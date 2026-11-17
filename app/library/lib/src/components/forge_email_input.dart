import 'package:flutter/material.dart';
import '../helpers/email.dart';
import 'internal/configured_input.dart';
import 'forge_input.dart';

class ForgeEmailInput extends ForgeConfiguredInput {
  final List<String> providers;
  final int maxSuggestions;
  final ValueChanged<String> onValueChange;
  final String listboxLabel;
  const ForgeEmailInput(
      {super.key,
      required String value,
      required this.onValueChange,
      required this.providers,
      this.maxSuggestions = 4,
      required this.listboxLabel,
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
      super.onFocusChange,
      super.onSubmitted})
      : super(value: value, autocorrect: false, spellCheck: false);
  @override
  State<ForgeEmailInput> createState() => _EmailState();
}

class _EmailState extends ConfiguredInputState<ForgeEmailInput> {
  @override
  Widget build(BuildContext context) => RawAutocomplete<String>(
      textEditingController: textController,
      focusNode: inputFocus,
      optionsBuilder: (editing) => widget.disabled ||
              widget.readOnly ||
              (editing.composing.isValid && !editing.composing.isCollapsed)
          ? const Iterable<String>.empty()
          : forgeEmailSuggestions(editing.text, widget.providers,
              maxSuggestions: widget.maxSuggestions),
      displayStringForOption: (provider) =>
          forgeEmailWithProvider(widget.value ?? '', provider),
      onSelected: (provider) {
        final next = forgeEmailWithProvider(widget.value ?? '', provider);
        widget.onValueChange(next);
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (mounted && widget.value != next) setText(widget.value ?? '');
        });
      },
      fieldViewBuilder: (context, controller, focus, submit) => buildInput(
          kind: ForgeInputKind.email,
          autofillHints: const [AutofillHints.email],
          onChanged: widget.onValueChange),
      optionsViewBuilder: (context, select, options) => Align(
          alignment: AlignmentDirectional.topStart,
          child: Material(
              elevation: 4,
              child: ConstrainedBox(
                  constraints:
                      const BoxConstraints(maxHeight: 240, maxWidth: 320),
                  child: Semantics(
                      label: widget.listboxLabel,
                      child: ListView.builder(
                          padding: EdgeInsets.zero,
                          shrinkWrap: true,
                          itemCount: options.length,
                          itemBuilder: (context, index) {
                            final option = options.elementAt(index);
                            return ListTile(
                                selected:
                                    AutocompleteHighlightedOption.of(context) ==
                                        index,
                                title: Text('@' + option),
                                onTap: () => select(option));
                          }))))));
}

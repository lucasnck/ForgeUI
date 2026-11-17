import 'dart:typed_data';
import 'package:flutter/widgets.dart';
import 'primitives.dart';

class ForgeFileReference {
  final String name, mimeType;
  final int size;
  final Stream<List<int>> Function() openRead;
  final String? path;
  const ForgeFileReference(
      {required this.name,
      required this.size,
      required this.openRead,
      this.mimeType = '',
      this.path});
  Future<Uint8List> readBytes() async {
    final bytes = BytesBuilder(copy: false);
    await for (final chunk in openRead()) bytes.add(chunk);
    return bytes.takeBytes();
  }
}

class ForgeFormEntry {
  final String name;
  final Object value;
  ForgeFormEntry(this.name, this.value) {
    if (value is! String && value is! ForgeFileReference)
      throw ArgumentError('Form values must be strings or file references.');
  }
}

class ForgeFormData {
  final List<ForgeFormEntry> entries;
  ForgeFormData(Iterable<ForgeFormEntry> values)
      : entries = List.unmodifiable(values);
  Object? get(String name) {
    for (final e in entries) if (e.name == name) return e.value;
    return null;
  }

  List<Object> getAll(String name) => List.unmodifiable(
      entries.where((e) => e.name == name).map((e) => e.value));
}

class ForgeSubmitContext {
  final String? name, value;
  bool _cancelled = false;
  ForgeSubmitContext({this.name, this.value});
  bool get cancelled => _cancelled;
  void cancel() {
    _cancelled = true;
  }
}

typedef ForgeFormSubmitContext = ForgeSubmitContext;
typedef ForgeSubmitInterceptor = void Function(ForgeSubmitContext context);
typedef ForgeResetInterceptor = void Function(ForgeSubmitContext context);

class ForgeFieldRegistration {
  final String name;
  final bool Function() enabled;
  final List<Object> Function() values;
  final bool Function() validate;
  final VoidCallback reset;
  final FocusNode? focusNode;
  ForgeFieldRegistration(
      {required this.name,
      required this.enabled,
      required this.values,
      required this.validate,
      required this.reset,
      this.focusNode});
}

class ForgeFormBinding extends ChangeNotifier {
  final Map<Object, ForgeFieldRegistration> _fields = {};
  final Map<String, String> errors = {};
  final Set<String> dirty = {}, touched = {};
  bool disabled = false;
  VoidCallback? onSubmitRequested;
  void register(Object owner, ForgeFieldRegistration field) {
    _fields[owner] = field;
  }

  void unregister(Object owner) {
    _fields.remove(owner);
  }

  void changed(String name) {
    dirty.add(name);
    notifyListeners();
  }

  void blurred(String name) {
    touched.add(name);
    notifyListeners();
  }

  void setError(String name, String? message) {
    if (message == null) {
      errors.remove(name);
    } else {
      errors[name] = message;
    }
    notifyListeners();
  }

  bool validate() {
    var valid = true;
    FocusNode? first;
    for (final f in _fields.values)
      if (f.enabled()) {
        final fieldValid = f.validate();
        if (!fieldValid || errors.containsKey(f.name)) {
          valid = false;
          first ??= f.focusNode;
        }
      }
    first?.requestFocus();
    return valid;
  }

  ForgeFormData data({ForgeSubmitContext? submitter}) => ForgeFormData([
        for (final f in _fields.values)
          if (f.enabled())
            for (final value in f.values()) ForgeFormEntry(f.name, value),
        if (submitter?.name != null)
          ForgeFormEntry(submitter!.name!, submitter.value ?? ''),
      ]);
  void reset() {
    for (final f in _fields.values) f.reset();
    errors.clear();
    dirty.clear();
    touched.clear();
    notifyListeners();
  }
}

class ForgeFormScope extends InheritedWidget {
  final ForgeFormBinding binding;
  final bool loading;
  final String? loadingLabel;
  const ForgeFormScope(
      {super.key,
      required this.binding,
      this.loading = false,
      this.loadingLabel,
      required super.child});
  static ForgeFormScope? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<ForgeFormScope>();
  @override
  bool updateShouldNotify(ForgeFormScope oldWidget) =>
      binding != oldWidget.binding ||
      loading != oldWidget.loading ||
      loadingLabel != oldWidget.loadingLabel;
}

class ForgeFieldPath<TValues> {
  final String name;
  final String Function(TValues values) read;
  final TValues Function(TValues values, String text) write;
  const ForgeFieldPath(this.name, {required this.read, required this.write});
}

class ForgeLocaleProvider extends InheritedWidget {
  final ForgeLocale locale;
  const ForgeLocaleProvider(
      {super.key, required this.locale, required super.child});
  static ForgeLocale of(BuildContext context) =>
      context
          .dependOnInheritedWidgetOfExactType<ForgeLocaleProvider>()
          ?.locale ??
      switch (Localizations.maybeLocaleOf(context)?.languageCode) {
        'pt' => ForgeLocale.ptBR,
        'es' => ForgeLocale.es,
        _ => ForgeLocale.en
      };
  @override
  bool updateShouldNotify(ForgeLocaleProvider oldWidget) =>
      locale != oldWidget.locale;
}

String forgeValidationMessage(BuildContext context, String key) =>
    switch (ForgeLocaleProvider.of(context)) {
      ForgeLocale.ptBR => switch (key) {
          'required' => 'Preencha este campo.',
          'pattern' => 'Valor em formato inválido.',
          'length' => 'Confira o tamanho do valor.',
          _ => 'Valor inválido.'
        },
      ForgeLocale.es => switch (key) {
          'required' => 'Completa este campo.',
          'pattern' => 'Formato no válido.',
          'length' => 'Comprueba la longitud.',
          _ => 'Valor no válido.'
        },
      ForgeLocale.en => switch (key) {
          'required' => 'Please fill out this field.',
          'pattern' => 'Invalid format.',
          'length' => 'Check the value length.',
          _ => 'Invalid value.'
        },
    };

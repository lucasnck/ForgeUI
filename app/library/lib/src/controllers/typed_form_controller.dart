import 'package:flutter/widgets.dart';
import '../types/forms.dart';

class ForgeTypedFormController<T> extends ForgeFormBinding {
  final T defaults;
  T _values;
  ForgeTypedFormController({required T initialValues})
      : defaults = initialValues,
        _values = initialValues;
  T get values => _values;
  String readField(ForgeFieldPath<T> path) => path.read(_values);
  void writeField(ForgeFieldPath<T> path, String text, {bool notify = true}) {
    _values = path.write(_values, text);
    if (notify) notifyListeners();
  }

  void replaceValues(T values) {
    _values = values;
    notifyListeners();
  }

  @override
  void reset() {
    _values = defaults;
    super.reset();
  }

  void setDisabled(bool value) {
    if (disabled == value) return;
    disabled = value;
    notifyListeners();
  }
}

class ForgeTypedFormScope<T>
    extends InheritedNotifier<ForgeTypedFormController<T>> {
  const ForgeTypedFormScope(
      {super.key,
      required ForgeTypedFormController<T> controller,
      required super.child})
      : super(notifier: controller);
  static ForgeTypedFormController<T> of<T>(BuildContext context) {
    final scope =
        context.dependOnInheritedWidgetOfExactType<ForgeTypedFormScope<T>>();
    if (scope?.notifier == null)
      throw StateError('FormFieldInput requires a matching typed form scope.');
    return scope!.notifier!;
  }
}

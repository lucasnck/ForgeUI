import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

class ForgePopupListboxController extends ChangeNotifier {
  final void Function(int index) onAcceptOption;
  bool focused = false, composing = false;
  int count = 0, _active = -1;
  String? queryKey, _dismissed;
  ForgePopupListboxController({required this.onAcceptOption});
  bool get isOpen =>
      focused && queryKey != null && count > 0 && _dismissed != queryKey;
  int get activeIndex =>
      isOpen && _active >= 0 ? _active.clamp(0, count - 1) : -1;
  void configure(
      {required int count, required String? queryKey, bool notify = true}) {
    if (count < 0) throw ArgumentError('Popup count must be nonnegative.');
    if (this.queryKey != queryKey) {
      _active = -1;
      _dismissed = null;
    }
    this.count = count;
    this.queryKey = queryKey;
    if (notify) notifyListeners();
  }

  void setFocused(bool value) {
    focused = value;
    if (!value) {
      _dismissed = null;
      _active = -1;
    }
    notifyListeners();
  }

  void dismiss() {
    _dismissed = queryKey;
    _active = -1;
    notifyListeners();
  }

  void acceptOption(int index) {
    if (!isOpen || composing || index < 0 || index >= count) return;
    _active = -1;
    _dismissed = null;
    onAcceptOption(index);
    notifyListeners();
  }

  KeyEventResult handle(KeyEvent event) {
    if (composing ||
        event is! KeyDownEvent ||
        count == 0 ||
        queryKey == null ||
        HardwareKeyboard.instance.isControlPressed ||
        HardwareKeyboard.instance.isAltPressed ||
        HardwareKeyboard.instance.isMetaPressed) return KeyEventResult.ignored;
    final key = event.logicalKey;
    if (key == LogicalKeyboardKey.arrowDown) {
      _active = isOpen ? (activeIndex + 1) % count : 0;
      _dismissed = null;
      notifyListeners();
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.arrowUp) {
      _active = isOpen && activeIndex > 0 ? activeIndex - 1 : count - 1;
      _dismissed = null;
      notifyListeners();
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.enter && activeIndex >= 0) {
      acceptOption(activeIndex);
      return KeyEventResult.handled;
    }
    if (key == LogicalKeyboardKey.escape && isOpen) {
      dismiss();
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }
}

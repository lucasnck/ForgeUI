class _MaskSlot {
  final String token, literals;
  String value = '';
  _MaskSlot(this.token, this.literals);
}

bool _slot(String c) => ['0', '9', 'A', 'S'].contains(c);
bool _matches(String c, String token) => switch (token) {
      '0' || '9' => RegExp(r'^[0-9]$').hasMatch(c),
      'A' => RegExp(r'^[A-Za-z]$').hasMatch(c),
      'S' => RegExp(r'^[A-Za-z0-9]$').hasMatch(c),
      _ => false
    };
List<_MaskSlot> _parse(String value, String mask, {bool formatted = false}) {
  final slots = <_MaskSlot>[];
  var literals = '';
  for (final token in mask.split('')) {
    if (!_slot(token)) {
      literals += token;
    } else {
      slots.add(_MaskSlot(token, literals));
      literals = '';
    }
  }
  var cursor = 0;
  bool fits(int start, int position) {
    for (final s in slots.skip(start)) {
      if (formatted && value.startsWith(s.literals, position))
        position += s.literals.length;
      if (s.token == '9') continue;
      while (position < value.length && !_matches(value[position], s.token))
        position++;
      if (position == value.length) return false;
      position++;
    }
    return true;
  }

  for (var i = 0; i < slots.length; i++) {
    final s = slots[i];
    if (formatted && value.startsWith(s.literals, cursor))
      cursor += s.literals.length;
    if (s.token == '9') {
      if (cursor < value.length &&
          _matches(value[cursor], s.token) &&
          fits(i + 1, cursor + 1)) s.value = value[cursor++];
      continue;
    }
    while (cursor < value.length && !_matches(value[cursor], s.token)) cursor++;
    if (cursor < value.length) s.value = value[cursor++];
  }
  return slots;
}

String unmaskForge(String display, String mask) =>
    _parse(display, mask, formatted: true).map((s) => s.value).join();
String applyForgeMask(String raw, String mask) {
  var result = '', literal = '';
  for (final s in _parse(raw, mask)) {
    literal += s.literals;
    if (s.value.isNotEmpty) {
      result += literal + s.value;
      literal = '';
    }
  }
  return result;
}

bool isForgeMaskComplete(String raw, String mask) =>
    _parse(raw, mask).every((s) => s.token == '9' || s.value.isNotEmpty);
int forgeCaretForIndex(String display, String mask, int rawIndex) {
  final count = rawIndex.clamp(0, unmaskForge(display, mask).length);
  if (count == 0) return 0;
  var consumed = 0, position = 0;
  for (final s in _parse(display, mask, formatted: true)) {
    position += s.literals.length;
    if (s.value.isEmpty) continue;
    position += s.value.length;
    if (++consumed == count) return position.clamp(0, display.length);
  }
  return display.length;
}

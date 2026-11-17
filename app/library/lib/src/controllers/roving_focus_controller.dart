import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../types/primitives.dart';

class ForgeFocusItem {
  final String id;
  final String text;
  final bool disabled;

  const ForgeFocusItem(this.id, {this.text = '', this.disabled = false});
}

/// Internal, owner-scoped keyboard focus behavior for native compositions.
/// Owns its FocusNodes; it never owns selection or action activation.
class ForgeRovingFocusController {
  final Map<String, FocusNode> _nodes = {};
  final Set<FocusNode> _pendingDisposal = {};
  List<ForgeFocusItem> _items = [];
  String? active;
  String _query = '';
  DateTime? _typedAt;
  bool _disposed = false;

  List<ForgeFocusItem> get enabled =>
      _items.where((item) => !item.disabled).toList(growable: false);

  void update(List<ForgeFocusItem> items, {String? initialId}) {
    if (_disposed) throw StateError('Focus controller is disposed.');
    if (items.any((item) => item.id.trim().isEmpty) ||
        items.map((item) => item.id).toSet().length != items.length) {
      throw ArgumentError('Focus identities must be nonempty and unique.');
    }

    final previousEnabled = enabled;
    final previousActive = active;
    final previousNode = previousActive == null ? null : _nodes[previousActive];
    final hadFocus = previousNode?.hasFocus ?? false;
    final removed = _nodes.keys
        .where((id) => !items.any((item) => item.id == id))
        .toList(growable: false);

    for (final id in removed) {
      final node = _nodes.remove(id)!;
      _pendingDisposal.add(node);
      WidgetsBinding.instance.addPostFrameCallback((_) {
        // The owner may have been disposed before this callback executes.
        if (_pendingDisposal.remove(node)) node.dispose();
      });
    }

    _items = List.unmodifiable(items);
    for (final item in items) {
      _nodes.putIfAbsent(item.id, () => FocusNode(debugLabel: item.id));
    }

    final available = enabled;
    if (!available.any((item) => item.id == previousActive)) {
      final oldIndex =
          previousEnabled.indexWhere((item) => item.id == previousActive);
      String? replacement;
      if (oldIndex >= 0) {
        for (var i = oldIndex + 1; i < previousEnabled.length; i++) {
          if (available.any((item) => item.id == previousEnabled[i].id)) {
            replacement = previousEnabled[i].id;
            break;
          }
        }
        if (replacement == null) {
          for (var i = oldIndex - 1; i >= 0; i--) {
            if (available.any((item) => item.id == previousEnabled[i].id)) {
              replacement = previousEnabled[i].id;
              break;
            }
          }
        }
      }
      active = replacement ??
          (available.any((item) => item.id == initialId) ? initialId : null) ??
          available.firstOrNull?.id;
      _query = '';
      _typedAt = null;
    }

    for (final item in items) {
      final node = _nodes[item.id]!;
      node.skipTraversal = item.disabled || item.id != active;
      node.canRequestFocus = !item.disabled;
    }

    if (hadFocus && previousActive != active) {
      final next = active == null ? null : _nodes[active];
      if (next == null) {
        previousNode?.unfocus();
      } else {
        // Do not try to focus the target before its new widget is attached.
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (!_disposed && _nodes[active] == next && next.canRequestFocus) {
            next.requestFocus();
          }
        });
      }
    }
  }

  FocusNode node(String id) =>
      _nodes[id] ?? (throw StateError('Unregistered focus identity: $id'));

  bool _syncPending = false;
  void _scheduleTraversalSync() {
    if (_syncPending || _disposed) return;
    _syncPending = true;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _syncPending = false;
      if (_disposed) return;
      for (final item in _items) {
        _nodes[item.id]!.skipTraversal = item.disabled || item.id != active;
      }
    });
  }

  void focused(String id) {
    if (_disposed || !enabled.any((item) => item.id == id)) return;
    active = id;
    _scheduleTraversalSync();
  }

  void focus(String id) {
    if (_disposed || !enabled.any((item) => item.id == id)) return;
    focused(id);
    _nodes[id]!.requestFocus();
  }

  KeyEventResult handle(
    KeyEvent event, {
    ForgeNavigationOrientation orientation =
        ForgeNavigationOrientation.horizontal,
    ForgeNavigationDirection direction = ForgeNavigationDirection.ltr,
    bool loop = true,
    bool typeahead = true,
  }) {
    if (_disposed || (event is! KeyDownEvent && event is! KeyRepeatEvent)) {
      return KeyEventResult.ignored;
    }
    if (HardwareKeyboard.instance.isAltPressed ||
        HardwareKeyboard.instance.isControlPressed ||
        HardwareKeyboard.instance.isMetaPressed) {
      return KeyEventResult.ignored;
    }
    final options = enabled;
    if (options.isEmpty) return KeyEventResult.ignored;
    final key = event.logicalKey;
    var index = options.indexWhere((item) => node(item.id).hasFocus);
    if (index < 0) index = options.indexWhere((item) => item.id == active);

    var delta = 0;
    int? target;
    if (key == LogicalKeyboardKey.home) {
      target = 0;
    } else if (key == LogicalKeyboardKey.end) {
      target = options.length - 1;
    } else if (orientation == ForgeNavigationOrientation.vertical) {
      if (key == LogicalKeyboardKey.arrowDown) delta = 1;
      if (key == LogicalKeyboardKey.arrowUp) delta = -1;
    } else {
      if (key == LogicalKeyboardKey.arrowRight) {
        delta = direction == ForgeNavigationDirection.rtl ? -1 : 1;
      }
      if (key == LogicalKeyboardKey.arrowLeft) {
        delta = direction == ForgeNavigationDirection.rtl ? 1 : -1;
      }
    }

    if (delta != 0) {
      target = index + delta;
      if (loop) {
        target = target % options.length;
      } else if (target < 0) {
        target = 0;
      } else if (target >= options.length) {
        target = options.length - 1;
      }
    }
    if (target != null) {
      _query = '';
      _typedAt = null;
      focus(options[target].id);
      return KeyEventResult.handled;
    }

    final char = event.character;
    if (typeahead &&
        char != null &&
        char.runes.length == 1 &&
        char.trim().isNotEmpty) {
      final now = DateTime.now();
      if (_typedAt == null || now.difference(_typedAt!).inMilliseconds > 500) {
        _query = '';
      }
      _typedAt = now;
      _query += char.toLowerCase();
      final query = _query.runes.toSet().length == 1 ? _query[0] : _query;
      for (var offset = 1; offset <= options.length; offset++) {
        final item = options[(index + offset) % options.length];
        if (item.text.toLowerCase().startsWith(query)) {
          focus(item.id);
          return KeyEventResult.handled;
        }
      }
    }
    return KeyEventResult.ignored;
  }

  void dispose() {
    if (_disposed) return;
    _disposed = true;
    for (final node in _nodes.values) {
      node.dispose();
    }
    _nodes.clear();
    for (final node in _pendingDisposal) {
      node.dispose();
    }
    _pendingDisposal.clear();
    _items = [];
    active = null;
  }
}

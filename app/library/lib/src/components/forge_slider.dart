import 'dart:math' as math;

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import '../theme/forge_action_palette.dart';
import '../theme/forge_theme_tokens.dart';
import '../types/component_capabilities.dart';
import '../types/forms.dart';

/// A token-rendered, platform-native adjustable range. No Material Slider,
/// Material theme, or implicit application navigation is involved.
class ForgeSlider extends StatefulWidget {
  final double? value;
  final double? defaultValue;
  final double min, max, step;
  final bool disabled, readOnly, required, fullWidth;
  final ValueChanged<double>? onChanged;
  final String? valueText, semanticLabel, name;
  final ForgeFormBinding? form;
  final FocusNode? focusNode;
  final bool autofocus;
  final ForgeSize size;
  final ForgeTone tone;
  final bool? invalid;

  const ForgeSlider({
    super.key,
    this.value,
    this.defaultValue,
    this.min = 0,
    this.max = 100,
    this.step = 1,
    this.disabled = false,
    this.readOnly = false,
    this.required = false,
    this.fullWidth = true,
    this.onChanged,
    this.valueText,
    this.semanticLabel,
    this.name,
    this.form,
    this.focusNode,
    this.autofocus = false,
    this.size = ForgeSize.md,
    this.tone = ForgeTone.neutral,
    this.invalid,
  });

  @override
  State<ForgeSlider> createState() => _SliderState();
}

class _SliderState extends State<ForgeSlider> {
  late double _local;
  late FocusNode _focus;
  late bool _ownsFocus;
  bool _focused = false;
  ForgeFormBinding? _form;

  bool get _enabled => !widget.disabled && !widget.readOnly &&
      !(_form?.disabled ?? false);
  double get _current => _normalize(widget.value ?? _local);

  void _check() {
    if (!widget.min.isFinite || !widget.max.isFinite ||
        widget.max <= widget.min || !widget.step.isFinite ||
        widget.step <= 0) {
      throw ArgumentError('Slider requires finite min < max and step > 0.');
    }
  }

  double _normalize(double value) {
    if (!value.isFinite) return widget.min;
    final clamped = value.clamp(widget.min, widget.max).toDouble();
    return (widget.min +
            ((clamped - widget.min) / widget.step).round() * widget.step)
        .clamp(widget.min, widget.max)
        .toDouble();
  }

  String _canonical(double value) => value == value.roundToDouble()
      ? value.toInt().toString()
      : value.toString();

  void _attachFocus() {
    _ownsFocus = widget.focusNode == null;
    _focus = widget.focusNode ?? FocusNode(debugLabel: 'ForgeSlider');
  }

  @override
  void initState() {
    super.initState();
    _check();
    _local = _normalize(widget.defaultValue ??
        (widget.min + (widget.max - widget.min) / 2));
    _attachFocus();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _bindForm();
  }

  void _bindForm() {
    final next = widget.form ?? ForgeFormScope.maybeOf(context)?.binding;
    if (next != _form) {
      _form?.unregister(this);
      _form = next;
    }
    _form?.register(this, ForgeFieldRegistration(
      name: widget.name ?? '',
      enabled: () => !widget.disabled &&
          !(_form?.disabled ?? false) && widget.name?.isNotEmpty == true,
      values: () => [_canonical(_current)],
      validate: () => true,
      reset: () {
        if (mounted && widget.value == null) {
          setState(() => _local = _normalize(widget.defaultValue ??
              (widget.min + (widget.max - widget.min) / 2)));
        }
      },
      focusNode: _focus,
    ));
  }

  @override
  void didUpdateWidget(covariant ForgeSlider oldWidget) {
    super.didUpdateWidget(oldWidget);
    _check();
    if (oldWidget.focusNode != widget.focusNode) {
      if (_ownsFocus) _focus.dispose();
      _attachFocus();
    }
    _bindForm();
  }

  void _change(double proposed) {
    if (!_enabled) return;
    final next = _normalize(proposed);
    if (next == _current) return;
    if (widget.value == null) setState(() => _local = next);
    widget.onChanged?.call(next);
    if (widget.name != null) _form?.changed(widget.name!);
  }

  void _step(int delta) => _change(_current + widget.step * delta);

  void _pointer(double localX, double width, double thumbSize, bool rtl) {
    final travel = math.max(1.0, width - thumbSize);
    var fraction = ((localX - thumbSize / 2) / travel)
        .clamp(0.0, 1.0).toDouble();
    if (rtl) fraction = 1.0 - fraction;
    _change(widget.min + fraction * (widget.max - widget.min));
  }

  KeyEventResult _key(KeyEvent event, bool rtl) {
    if (!_enabled || event is! KeyDownEvent) {
      return KeyEventResult.ignored;
    }
    final key = event.logicalKey;
    if (key == LogicalKeyboardKey.arrowRight) {
      _step(rtl ? -1 : 1);
    } else if (key == LogicalKeyboardKey.arrowLeft) {
      _step(rtl ? 1 : -1);
    } else if (key == LogicalKeyboardKey.arrowUp) {
      _step(1);
    } else if (key == LogicalKeyboardKey.arrowDown) {
      _step(-1);
    } else if (key == LogicalKeyboardKey.home) {
      _change(widget.min);
    } else if (key == LogicalKeyboardKey.end) {
      _change(widget.max);
    } else {
      return KeyEventResult.ignored;
    }
    return KeyEventResult.handled;
  }

  @override
  void dispose() {
    _form?.unregister(this);
    if (_ownsFocus) _focus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final p = ForgeThemeTokens.of(context).palette;
    final rtl = Directionality.of(context) == TextDirection.rtl;
    final trackHeight = switch (widget.size) {
      ForgeSize.xs || ForgeSize.sm => p.length1,
      ForgeSize.md => p.length2,
      ForgeSize.lg || ForgeSize.xl => p.length3,
    };
    final thumbSize = switch (widget.size) {
      ForgeSize.xs => p.length2,
      ForgeSize.sm || ForgeSize.md => p.length3,
      ForgeSize.lg || ForgeSize.xl => p.length4,
    };
    final ratio = ((_current - widget.min) / (widget.max - widget.min))
        .clamp(0.0, 1.0).toDouble();
    final foreground = forgeActionColors(p, widget.tone).background;
    final currentText = widget.valueText ?? _canonical(_current);
    final nextText = _canonical(_normalize(_current + widget.step));
    final previousText = _canonical(_normalize(_current - widget.step));

    Widget result = LayoutBuilder(builder: (context, limits) {
      final width = widget.fullWidth && limits.hasBoundedWidth
          ? limits.maxWidth
          : math.min(p.length20, limits.maxWidth);
      final height = math.max(48.0, thumbSize);
      return GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTapUp: _enabled
            ? (d) => _pointer(d.localPosition.dx, width, thumbSize, rtl)
            : null,
        onHorizontalDragStart: _enabled
            ? (d) => _pointer(d.localPosition.dx, width, thumbSize, rtl)
            : null,
        onHorizontalDragUpdate: _enabled
            ? (d) => _pointer(d.localPosition.dx, width, thumbSize, rtl)
            : null,
        child: SizedBox(
          width: width,
          height: height,
          child: CustomPaint(
            painter: _ForgeSliderPainter(
              fraction: ratio,
              rtl: rtl,
              thumbSize: thumbSize,
              trackHeight: trackHeight,
              track: p.colorSurfaceSubtle,
              fill: foreground,
              thumb: p.colorSurfaceRaised,
              border: widget.invalid == true
                  ? p.colorTextDanger : p.colorBorderDefault,
              focus: _focused ? p.colorFocusRing : null,
              borderWidth: p.borderWidthThin,
              focusWidth: p.borderWidthFocus,
              radius: p.radiusFull,
            ),
          ),
        ),
      );
    });

    result = Semantics(
      label: widget.semanticLabel,
      value: currentText,
      increasedValue: nextText,
      decreasedValue: previousText,
      enabled: _enabled,
      focusable: _enabled,
      focused: _focused,
      onIncrease: _enabled ? () => _step(1) : null,
      onDecrease: _enabled ? () => _step(-1) : null,
      child: ExcludeSemantics(
        child: Focus(
          focusNode: _focus,
          autofocus: widget.autofocus,
          canRequestFocus: _enabled,
          skipTraversal: !_enabled,
          onFocusChange: (value) {
            if (mounted && _focused != value) {
              setState(() => _focused = value);
            }
          },
          onKeyEvent: (_, event) => _key(event, rtl),
          child: result,
        ),
      ),
    );
    return Opacity(
      opacity: _enabled ? p.opacityFull : p.opacityDisabled,
      child: result,
    );
  }
}

class _ForgeSliderPainter extends CustomPainter {
  final double fraction, thumbSize, trackHeight, borderWidth, focusWidth, radius;
  final bool rtl;
  final Color track, fill, thumb, border;
  final Color? focus;

  const _ForgeSliderPainter({
    required this.fraction,
    required this.rtl,
    required this.thumbSize,
    required this.trackHeight,
    required this.track,
    required this.fill,
    required this.thumb,
    required this.border,
    required this.focus,
    required this.borderWidth,
    required this.focusWidth,
    required this.radius,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final left = thumbSize / 2;
    final right = math.max(left, size.width - left);
    final y = size.height / 2;
    final bounds = Rect.fromLTRB(left, y - trackHeight / 2,
        right, y + trackHeight / 2);
    final round = Radius.circular(math.min(radius, trackHeight / 2));
    canvas.drawRRect(RRect.fromRectAndRadius(bounds, round),
        Paint()..color = track);
    final activeX = rtl ? right - (right - left) * fraction
        : left + (right - left) * fraction;
    final filled = Rect.fromLTRB(rtl ? activeX : left,
        bounds.top, rtl ? right : activeX, bounds.bottom);
    canvas.drawRRect(RRect.fromRectAndRadius(filled, round),
        Paint()..color = fill);
    final center = Offset(activeX, y);
    canvas.drawCircle(center, thumbSize / 2,
        Paint()..color = thumb);
    canvas.drawCircle(center, thumbSize / 2 - borderWidth / 2,
        Paint()
          ..color = border
          ..style = PaintingStyle.stroke
          ..strokeWidth = borderWidth);
    if (focus != null) {
      canvas.drawCircle(center, thumbSize / 2 + focusWidth,
          Paint()
            ..color = focus!
            ..style = PaintingStyle.stroke
            ..strokeWidth = focusWidth);
    }
  }

  @override
  bool shouldRepaint(covariant _ForgeSliderPainter old) =>
      fraction != old.fraction || rtl != old.rtl ||
      thumbSize != old.thumbSize || trackHeight != old.trackHeight ||
      track != old.track || fill != old.fill || thumb != old.thumb ||
      border != old.border || focus != old.focus ||
      borderWidth != old.borderWidth || focusWidth != old.focusWidth ||
      radius != old.radius;
}

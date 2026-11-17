import 'package:flutter/material.dart';
import '../generated/forge_tokens.g.dart';
import '../types/component_capabilities.dart';
import '../types/primitives.dart';

double forgeSpace(ForgeTokenSet p, ForgeSpace? value, {double fallback = 0}) =>
    value == null ? fallback : p.number('--space-${value.name.substring(1)}');
BorderRadius forgeRadius(ForgeTokenSet p, ForgeShape shape) =>
    BorderRadius.circular(switch (shape) {
      ForgeShape.square => 0,
      ForgeShape.rounded => p.radiusMd,
      ForgeShape.pill => p.radiusFull
    });
TextStyle forgeTextStyle(ForgeTokenSet p,
        {ForgeTextSize? size, ForgeTextTone? tone, ForgeFontWeight? weight}) =>
    TextStyle(
        fontSize: p.number('--font-size-${size?.token ?? 'md'}'),
        color: p.color(
            '--color-text-${tone == null || tone == ForgeTextTone.defaultTone ? 'default' : tone.name}'),
        fontWeight: weight == null
            ? FontWeight.w400
            : FontWeight.values[
                (p.number('--font-weight-${weight.name}') ~/ 100 - 1)
                    .clamp(0, 8)],
        height: p.lineHeightNormal);
CrossAxisAlignment forgeCross(ForgeAlign align) => switch (align) {
      ForgeAlign.start => CrossAxisAlignment.start,
      ForgeAlign.end => CrossAxisAlignment.end,
      ForgeAlign.center => CrossAxisAlignment.center,
      ForgeAlign.stretch => CrossAxisAlignment.stretch,
      ForgeAlign.baseline => CrossAxisAlignment.baseline
    };

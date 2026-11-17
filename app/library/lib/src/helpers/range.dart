class ForgeProgressRange {
  final double? value;
  final double max;
  const ForgeProgressRange(this.value, this.max);
}

ForgeProgressRange normalizeForgeProgress(double? value, double? max) {
  final maximum = max != null && max.isFinite && max > 0 ? max : 100.0;
  return ForgeProgressRange(
      value == null || !value.isFinite
          ? null
          : value.clamp(0, maximum).toDouble(),
      maximum);
}

class ForgeMeterRange {
  final double value, min, max, low, high, optimum;
  const ForgeMeterRange(
      this.value, this.min, this.max, this.low, this.high, this.optimum);
  double get ratio {
    final extent = max - min;
    return extent.isFinite
        ? (value - min) / extent
        : (value / 2 - min / 2) / (max / 2 - min / 2);
  }
}

ForgeMeterRange normalizeForgeMeter(
    {required double value,
    double? min,
    double? max,
    double? low,
    double? high,
    double? optimum}) {
  var minimum = min != null && min.isFinite ? min : 0.0;
  var maximum =
      max != null && max.isFinite && max > minimum ? max : minimum + 100;
  if (!maximum.isFinite || maximum <= minimum) {
    minimum = 0;
    maximum = 100;
  }
  double clamp(double v) => v.clamp(minimum, maximum).toDouble();
  final lower = clamp(low != null && low.isFinite ? low : minimum);
  final upper = clamp(high != null && high.isFinite ? high : maximum)
      .clamp(lower, maximum)
      .toDouble();
  return ForgeMeterRange(
      clamp(value.isFinite ? value : minimum),
      minimum,
      maximum,
      lower,
      upper,
      clamp(optimum != null && optimum.isFinite
          ? optimum
          : minimum / 2 + maximum / 2));
}

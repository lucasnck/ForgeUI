import 'inputs_generated.dart';

bool validInputProperties(String slug, Map properties) {
  final fields = inputContracts[slug];
  if (fields is! Map) return false;
  for (final entry in properties.entries) {
    if (entry.key == 'theme' || entry.key == 'scenario') continue;
    final field = fields[entry.key], v = entry.value;
    if (field is! Map) return false;
    switch (field['kind']) {
      case 'select':
        if (!(field['options'] as List).contains(v)) return false;
      case 'boolean':
        if (v is! bool) return false;
      case 'text':
        if (v is! String || v.length > 200) return false;
      case 'number':
        if (v is! num || !v.isFinite || v < 0 || v > 100) return false;
    }
    if (field['nonblank']==true &&
        (v is! String || v.trim().isEmpty)) return false;
  }
  return true;
}

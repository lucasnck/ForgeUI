/// Bridge properties for *implemented* native composition examples.
/// These are editor controls, not additions to the public Forge widget APIs.
const compositeContracts = <String, Map<String, Map<String, Object?>>>{
  'breadcrumb': {
    'label': {'kind': 'text', 'defaultValue': 'Localização', 'nonblank': true},
    'ancestorLabel': {'kind': 'text', 'defaultValue': 'Catálogo', 'nonblank': true},
    'currentLabel': {'kind': 'text', 'defaultValue': 'Detalhes', 'nonblank': true},
  },
  'pagination': {
    'label': {'kind': 'text', 'defaultValue': 'Páginas', 'nonblank': true},
    'page': {'kind': 'number', 'defaultValue': 2, 'min': 1, 'max': 12},
    'pageCount': {'kind': 'number', 'defaultValue': 5, 'min': 1, 'max': 12},
    'disabled': {'kind': 'boolean', 'defaultValue': false},
  },
  'tag-group': {
    'label': {'kind': 'text', 'defaultValue': 'Habilidades', 'nonblank': true},
    'fullWidth': {'kind': 'boolean', 'defaultValue': true},
    'tagText': {'kind': 'text', 'defaultValue': 'Flutter', 'nonblank': true},
    'removeLabel': {'kind': 'text', 'defaultValue': 'Remover Flutter', 'nonblank': true},
    'disabled': {'kind': 'boolean', 'defaultValue': false},
  },
  'page-header': {
    'titleId': {'kind': 'text', 'defaultValue': 'forge-page-title', 'nonblank': true},
    'pageTitle': {'kind': 'text', 'defaultValue': 'Meus registros', 'nonblank': true},
    'description': {'kind': 'text', 'defaultValue': 'Gerencie seus registros'},
    'divider': {'kind': 'boolean', 'defaultValue': false},
  },
};

/// Fail closed: unknown keys, malformed types and invalid root ranges are refused.
bool validCompositeProperties(String slug, Map properties) {
  final schema = compositeContracts[slug];
  if (schema == null) return false;
  for (final entry in properties.entries) {
    if (entry.key == 'theme' || entry.key == 'scenario') continue;
    if (entry.key is! String) return false;
    final field = schema[entry.key];
    if (field == null) return false;
    final value = entry.value;
    switch (field['kind']) {
      case 'text':
        if (value is! String || value.length > 200 ||
            (field['nonblank'] == true && value.trim().isEmpty)) return false;
      case 'boolean':
        if (value is! bool) return false;
      case 'number':
        if (value is! int || value < (field['min'] as int) ||
            value > (field['max'] as int)) return false;
      default:
        return false;
    }
  }
  if (slug == 'pagination') {
    final page = properties['page'] ?? schema['page']!['defaultValue'];
    final count = properties['pageCount'] ?? schema['pageCount']!['defaultValue'];
    if (page is! int || count is! int || page > count) return false;
  }
  return true;
}

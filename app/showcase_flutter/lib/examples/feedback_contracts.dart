/// Editor-only, finite controls for the existing public Forge feedback widgets.
/// Widget composition and action ownership stay inside the Dart examples.
const feedbackContracts = <String, Map<String, Map<String, Object?>>>{
  'card': {
    'titleText': {'kind': 'text', 'defaultValue': 'Resumo do projeto', 'nonblank': true},
    'bodyText': {'kind': 'text', 'defaultValue': 'Dados do projeto disponíveis.', 'nonblank': true},
    'actionLabel': {'kind': 'text', 'defaultValue': 'Abrir', 'nonblank': true},
    'fullWidth': {'kind': 'boolean', 'defaultValue': true},
    'elevation': {'kind': 'select', 'options': ['flat', 'raised', 'floating'], 'defaultValue': 'raised'},
  },
  'alert': {
    'titleText': {'kind': 'text', 'defaultValue': 'Aviso', 'nonblank': true},
    'bodyText': {'kind': 'text', 'defaultValue': 'Alterações não foram enviadas.', 'nonblank': true},
    'actionLabel': {'kind': 'text', 'defaultValue': 'Entendi', 'nonblank': true},
    'announcement': {'kind': 'select', 'options': ['off', 'polite', 'assertive'], 'defaultValue': 'polite'},
  },
  'empty-state': {
    'titleText': {'kind': 'text', 'defaultValue': 'Nenhum resultado', 'nonblank': true},
    'bodyText': {'kind': 'text', 'defaultValue': 'Não há registros nesta lista.', 'nonblank': true},
    'actionLabel': {'kind': 'text', 'defaultValue': 'Criar registro', 'nonblank': true},
    'showAction': {'kind': 'boolean', 'defaultValue': true},
  },
  'error-state': {
    'titleText': {'kind': 'text', 'defaultValue': 'Não foi possível carregar', 'nonblank': true},
    'bodyText': {'kind': 'text', 'defaultValue': 'Confira a conexão e tente novamente.', 'nonblank': true},
    'actionLabel': {'kind': 'text', 'defaultValue': 'Tentar novamente', 'nonblank': true},
    'announcement': {'kind': 'select', 'options': ['off', 'polite', 'assertive'], 'defaultValue': 'polite'},
  },
  'loading-state': {
    'label': {'kind': 'text', 'defaultValue': 'Carregando registros', 'nonblank': true},
    'bodyText': {'kind': 'text', 'defaultValue': 'Preparando os dados...'},
    'titleText': {'kind': 'text', 'defaultValue': 'Atualização em andamento'},
  },
};

bool validFeedbackProperties(String slug, Map properties) {
  final schema = feedbackContracts[slug];
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
      case 'select':
        if (value is! String || !(field['options'] as List).contains(value)) return false;
      default:
        return false;
    }
  }
  return true;
}

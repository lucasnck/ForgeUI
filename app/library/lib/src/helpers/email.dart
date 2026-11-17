List<String> forgeEmailSuggestions(String value, List<String> providers,
    {int maxSuggestions = 4}) {
  final at = value.lastIndexOf('@');
  if (at < 1 || maxSuggestions < 1) return const [];
  final fragment = value.substring(at + 1).toLowerCase();
  return providers
      .where((p) =>
          p.length > fragment.length && p.toLowerCase().startsWith(fragment))
      .take(maxSuggestions)
      .toList(growable: false);
}

String forgeEmailWithProvider(String value, String provider) =>
    value.substring(0, value.lastIndexOf('@') + 1) + provider;

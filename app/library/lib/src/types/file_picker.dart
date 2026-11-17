import 'forms.dart';

enum ForgeCapturePreference { any, user, environment }

class ForgeFilePickerRequest {
  final String? accept;
  final bool multiple;
  final ForgeCapturePreference? capture;
  const ForgeFilePickerRequest(
      {this.accept, this.multiple = false, this.capture});
}

class ForgeFilePickerResult {
  final bool cancelled;
  final List<ForgeFileReference> files;
  ForgeFilePickerResult.accepted(Iterable<ForgeFileReference> values)
      : cancelled = false,
        files = List.unmodifiable(values);
  const ForgeFilePickerResult.cancelled()
      : cancelled = true,
        files = const [];
}

typedef ForgeFilePicker = Future<ForgeFilePickerResult> Function(
    ForgeFilePickerRequest request);

class ForgeFileChangeContext {
  final List<ForgeFileReference> files;
  bool _cancelled = false;
  ForgeFileChangeContext(Iterable<ForgeFileReference> values)
      : files = List.unmodifiable(values);
  bool get cancelled => _cancelled;
  void cancel() {
    _cancelled = true;
  }
}

typedef ForgeFileChangeInterceptor = void Function(
    ForgeFileChangeContext context);

import 'package:flutter/material.dart';
import '../types/file_picker.dart';
import '../types/forms.dart';
import '../types/component_capabilities.dart';
import 'forge_button.dart';

class ForgeFileInput extends StatefulWidget {
  final ForgeFilePicker picker;
  final String chooserLabel;
  final String? accept, name, semanticLabel;
  final ForgeCapturePreference? capture;
  final bool multiple, disabled, readOnly, required, autofocus, fullWidth;
  final ValueChanged<List<ForgeFileReference>>? onFilesChange;
  final ForgeFileChangeInterceptor? onChanged;
  final ValueChanged<Object>? onPickerError;
  final ForgeFormBinding? form;
  final FocusNode? focusNode;
  final ForgeSize size;
  final ForgeTone tone;
  final ForgeAppearance appearance;
  final ForgeShape? shape;
  final bool? invalid;
  const ForgeFileInput(
      {super.key,
      required this.picker,
      required this.chooserLabel,
      this.accept,
      this.name,
      this.semanticLabel,
      this.capture,
      this.multiple = false,
      this.disabled = false,
      this.readOnly = false,
      this.required = false,
      this.autofocus = false,
      this.fullWidth = true,
      this.onFilesChange,
      this.onChanged,
      this.onPickerError,
      this.form,
      this.focusNode,
      this.size = ForgeSize.md,
      this.tone = ForgeTone.neutral,
      this.appearance = ForgeAppearance.bordered,
      this.shape,
      this.invalid});
  @override
  State<ForgeFileInput> createState() => _FileState();
}

class _FileState extends State<ForgeFileInput> {
  List<ForgeFileReference> files = const [];
  ForgeFormBinding? form;
  bool picking = false;
  int generation = 0;
  String? error;
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    bind();
  }

  void bind() {
    final next = widget.form ?? ForgeFormScope.maybeOf(context)?.binding;
    if (next != form) {
      form?.unregister(this);
      form = next;
    }
    form?.register(
        this,
        ForgeFieldRegistration(
            name: widget.name ?? '',
            enabled: () => !widget.disabled && widget.name?.isNotEmpty == true,
            values: () => files,
            validate: () {
              final valid = !widget.required || files.isNotEmpty;
              setState(() => error =
                  valid ? null : forgeValidationMessage(context, 'required'));
              return valid;
            },
            reset: () {
              generation++;
              if (mounted)
                setState(() {
                  files = const [];
                  error = null;
                });
            },
            focusNode: widget.focusNode));
  }

  @override
  void didUpdateWidget(covariant ForgeFileInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    bind();
    if (widget.disabled) generation++;
  }

  Future<void> choose() async {
    if (picking ||
        widget.disabled ||
        widget.readOnly ||
        (form?.disabled ?? false)) return;
    picking = true;
    final revision = ++generation;
    try {
      final result = await widget.picker(ForgeFilePickerRequest(
          accept: widget.accept,
          multiple: widget.multiple,
          capture: widget.capture));
      if (!mounted ||
          revision != generation ||
          result.cancelled ||
          widget.disabled ||
          widget.readOnly) return;
      if (!widget.multiple && result.files.length > 1)
        throw StateError(
            'The file-picker adapter returned multiple files for a single-file request.');
      setState(() {
        files = result.files;
        error = null;
      });
      final event = ForgeFileChangeContext(files);
      widget.onChanged?.call(event);
      if (!event.cancelled) widget.onFilesChange?.call(files);
      if (widget.name != null) form?.changed(widget.name!);
    } catch (e) {
      if (mounted && revision == generation) {
        if (widget.onPickerError != null) {
          widget.onPickerError!(e);
        } else {
          Error.throwWithStackTrace(e, StackTrace.current);
        }
      }
    } finally {
      picking = false;
    }
  }

  @override
  void dispose() {
    generation++;
    form?.unregister(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ForgeButton(
                onPressed: choose,
                disabled: widget.disabled ||
                    widget.readOnly ||
                    (form?.disabled ?? false),
                focusNode: widget.focusNode,
                autofocus: widget.autofocus,
                semanticLabel: widget.semanticLabel,
                size: widget.size,
                tone: widget.tone,
                appearance: widget.appearance,
                shape: widget.shape,
                fullWidth: widget.fullWidth,
                child: Text(widget.chooserLabel)),
            for (final file in files) Text(file.name),
            if (error != null) Semantics(liveRegion: true, child: Text(error!))
          ]);
}

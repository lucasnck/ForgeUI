import 'dart:js_interop';

@JS('forgePreview.subscribe')
external void _subscribe(JSFunction callback);
@JS('forgePreview.unsubscribe')
external void _unsubscribe(JSFunction callback);
@JS('forgePreview.ready')
external void _ready();

void Function() connectPreview(void Function(String) receive) {
  final callback = ((JSString message) => receive(message.toDart)).toJS;
  _subscribe(callback);
  return () => _unsubscribe(callback);
}

void notifyPreviewReady() => _ready();

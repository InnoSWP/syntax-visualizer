import { EditorView } from "@codemirror/view"

export default function updateListeners(listeners: {
  onChange?: (newDoc: string) => void
  onBlur?: () => void
  onFocus?: () => void
}) {
  const { onChange, onBlur, onFocus } = listeners

  return EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      onChange?.(update.state.doc.toString())
    }
    if (update.focusChanged) {
      update.view.hasFocus ? onFocus?.() : onBlur?.()
    }
  })
}

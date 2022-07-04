import { EditorView, showPanel } from "@codemirror/view"
import { EditorSelection, StateEffect, StateField } from "@codemirror/state"
import type { ParseError } from "@/core/types"

export const ShowErrorEffect = StateEffect.define<ParseError | null>()

export const errorPanelState = StateField.define<ParseError | null>({
  create: () => null,
  update: (value, transaction) => {
    for (const effect of transaction.effects) {
      if (effect.is(ShowErrorEffect)) {
        value = effect.value ? effect.value : null
      }
    }
    return value
  },
  provide: (field) =>
    showPanel.from(field, (error) => (error ? createErrorPanel(error) : null)),
})

function createErrorPanel(parseError: ParseError) {
  return (view: EditorView) => {
    const div = document.createElement("div")
    div.textContent = parseError.message
    div.classList.add("codemirror-error-panel")
    if (parseError.location) {
      div.classList.add("codemirror-error-panel__with-location")
      div.onclick = () => {
        if (parseError.location) {
          view.dispatch({
            selection: EditorSelection.cursor(parseError.location.start.index),
            scrollIntoView: true,
          })
          view.focus()
        }
      }
    }
    return { bottom: true, dom: div }
  }
}

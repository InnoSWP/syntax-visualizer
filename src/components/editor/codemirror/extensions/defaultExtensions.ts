import type { Extension } from "@codemirror/state"
import { EditorState } from "@codemirror/state"
import {
  drawSelection,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection,
} from "@codemirror/view"
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete"
import { ThemeManager } from "@/components/editor/codemirror/extensions/themes/manager";
import { basicLight } from "@/components/editor/codemirror/extensions/themes/light";

// Customized basic extensions for CodeMirror
// Default setup: https://github.com/codemirror/basic-setup/blob/main/src/codemirror.ts
export const defaultExtensions: Extension[] = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  ThemeManager.of(basicLight),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
  ]),
]

export default defaultExtensions

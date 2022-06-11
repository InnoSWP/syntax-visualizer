import { defineStore } from "pinia"
import type { LanguageID } from "@/core/languages"

export type ColorTheme = "light" | "dark" | "system"
export type CodeEditorVariant = "monaco-editor" | "codemirror"
export type ASTVariant = "graph" | "json"

export interface SettingsState {
  theme: ColorTheme
  codeEditorVariant: CodeEditorVariant
  astVariant: ASTVariant
  languageId: LanguageID
}

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => ({
    theme: "system",
    codeEditorVariant: "monaco-editor",
    astVariant: "json",
    languageId: "javascript",
  }),
})

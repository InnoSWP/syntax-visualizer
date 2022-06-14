import { defineStore } from "pinia"
import type { LanguageID } from "@/core/languages"

export type ThemeColor = "light" | "dark" | "system"
export type CodeEditorVariant = "monaco-editor" | "codemirror"
export type ASTVariant = "graph" | "json"

export interface SettingsState {
  theme: ThemeColor
  codeEditorVariant: CodeEditorVariant
  astVariant: ASTVariant
  languageId: LanguageID
}

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => ({
    theme: "system",
    codeEditorVariant: "monaco-editor",
    astVariant: "graph",
    languageId: "javascript",
  }),
  actions: {
    toggleTheme() {
      if (this.theme === "light") {
        this.theme = "dark"
      } else if (this.theme === "dark") {
        this.theme = "system"
      } else {
        this.theme = "light"
      }
    },
  },
})

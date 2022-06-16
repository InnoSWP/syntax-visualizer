import { defineStore } from "pinia"
import type { LanguageID } from "@/core/languages"
import languages from "@/core/languages"

export type ColorTheme = "light" | "dark" | "system"
export type CodeEditorVariant = "monaco-editor" | "codemirror"
export type ASTVariant = "graph" | "json"

export interface SettingsState {
  theme: ColorTheme
  codeEditorVariant: CodeEditorVariant
  astVariant: ASTVariant
  languageId: LanguageID
  parserName: string
}

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => ({
    theme: "system",
    codeEditorVariant: "monaco-editor",
    astVariant: "graph",
    languageId: "javascript",
    parserName: languages["javascript"].defaultParserName,
  }),
  actions: {
    setLanguageId(languageId: LanguageID) {
      this.languageId = languageId

      // Change parser name too since it depends on language
      this.setParserName(languages[languageId].defaultParserName)
    },
    setParserName(parserName: string) {
      this.parserName = parserName
    },
  },
})

import { defineStore } from "pinia"

export type ColorTheme = "light" | "dark" | "system"
export type CodeEditorVariant = "monaco-editor" | "codemirror"
export type ASTVariant = "graph" | "json"

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    theme: "system" as ColorTheme,
    codeEditorVariant: "monaco-editor" as CodeEditorVariant,
    astVariant: "graph" as ASTVariant,
  }),
})
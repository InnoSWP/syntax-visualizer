import { defineStore } from "pinia"

export type ColorTheme = "light" | "dark" | "system"
export type CodeEditorVariant = "monaco-editor" | "codemirror"
export type CodeEditorLanguage = "typescript" | "python"
export type CodeEditorDefaultText = Record<CodeEditorLanguage, string>
export type ASTVariant = "graph" | "json"

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    theme: "system" as ColorTheme,
    codeEditorVariant: "monaco-editor" as CodeEditorVariant,
    codeEditorLanguage: "typescript" as CodeEditorLanguage,
    codeEditorDefaultText: {
      python: 'print("Hello, World")',
      typescript: 'console.log("Hello, World")',
    } as CodeEditorDefaultText,
    astVariant: "graph" as ASTVariant,
  }),
})

import { defineStore } from "pinia"
import type { LanguageID, ParserName } from "@/core/languages"

export type ThemeColor = "light" | "dark" | "system"
export type ASTVariant = "graph" | "json"

export interface SettingsState<L extends LanguageID = "javascript"> {
  theme: ThemeColor
  astVariant: ASTVariant
  languageId: L
  parserName: ParserName<L>
}

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => ({
    theme: "system",
    astVariant: "graph",
    languageId: "javascript",
    parserName: "@babel/parser",
  }),
  actions: {
    toggleTheme() {
      this.theme = getNextTheme(this.theme)
    },
  },
})

export const getNextTheme = (currentTheme: ThemeColor): ThemeColor => {
  switch (currentTheme) {
    case "light":
      return "dark"
    case "dark":
      return "system"
    default:
      return "light"
  }
}

import { defineStore } from "pinia"
import type { LanguageId, ParserIdOfLanguage } from "@/core/languages"
import { setTheme } from "@/core/themes/themer"

export type ThemeColor = "light" | "dark" | "system"
export type ASTVariant = "graph" | "json"

export interface SettingsState<L extends LanguageId = "javascript"> {
  theme: ThemeColor
  astVariant: ASTVariant
  languageId: L
  parserId: ParserIdOfLanguage<L>
}

export const useSettingsStore = defineStore("settings", {
  state: (): SettingsState => ({
    theme: "system",
    astVariant: "graph",
    languageId: "javascript",
    parserId: "babel",
  }),
  actions: {
    toggleTheme() {
      this.theme = getNextTheme(this.theme)
      setTheme(this.theme)
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

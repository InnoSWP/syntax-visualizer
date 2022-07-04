import { defineStore } from "pinia"

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    theme: "system" as Theme,
  }),
  actions: {
    toggleTheme() {
      this.theme = getNextTheme(this.theme)
    },
  },
  persist: true,
})

export type Theme = "light" | "dark" | "system"

export const getNextTheme = (currentTheme: Theme): Theme => {
  switch (currentTheme) {
    case "light":
      return "dark"
    case "dark":
      return "system"
    default:
      return "light"
  }
}

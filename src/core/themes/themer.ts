import type { ThemeColor } from "@/stores/settings"
import { usePreferredDark } from "@vueuse/core"
import { ref, watch } from "vue"
import type { Ref, ToRefs } from "vue"
import { useSettingsStore } from "@/stores/settings"
import { storeToRefs } from "pinia"

let wasInitialized = false
let root: HTMLElement
let settings: ToRefs
let systemThemeIsDark: Ref<boolean>
let useSystemTheme: Ref<boolean>

/**
 * Sets application theme.
 * @param theme The theme to use.
 */
export function setTheme(theme: ThemeColor): void {
  if (!wasInitialized) {
    throw new Error("Themer was not initialized")
  }

  switch (theme) {
    case "system":
      setTheme(systemThemeIsDark.value ? "dark" : "light")
      break
    case "light":
      useSystemTheme.value = settings.theme.value === "system"
      root.classList.remove("dark")
      break
    case "dark":
      useSystemTheme.value = settings.theme.value === "system"
      root.classList.add("dark")
      break
  }
}

/**
 * Initializes themer.
 */
export function init() {
  wasInitialized = true

  root = document.querySelector(":root") as HTMLElement
  settings = storeToRefs(useSettingsStore())
  systemThemeIsDark = usePreferredDark()
  useSystemTheme = ref(settings.theme.value === "system")

  watch(systemThemeIsDark, () => {
    if (useSystemTheme.value) setTheme("system")
  })
}

export default { init, setTheme }

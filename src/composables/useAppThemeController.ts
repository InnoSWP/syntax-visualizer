import { watchEffect } from "vue"
import { useIsDark } from "./useIsDark"

export function useAppThemeController() {
  const isDark = useIsDark()
  const root = document.querySelector(":root")

  watchEffect(() => {
    if (isDark.value) {
      root?.classList.add("dark")
    } else {
      root?.classList.remove("dark")
    }
  })
}

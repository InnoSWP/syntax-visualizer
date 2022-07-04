import { computed, watchEffect } from "vue"
import { storeToRefs } from "pinia"
import { usePreferredDark } from "@vueuse/core"
import { useSettingsStore } from "@/stores/settings"

export function useAppThemeController() {
  const settings = useSettingsStore()
  const { theme } = storeToRefs(settings)
  const isDarkPreferred = usePreferredDark()
  const isDark = computed(() =>
    theme.value === "system" ? isDarkPreferred.value : theme.value === "dark"
  )
  const root = document.querySelector(":root")

  watchEffect(() => {
    if (isDark.value) {
      root?.classList.add("dark")
    } else {
      root?.classList.remove("dark")
    }
  })
}

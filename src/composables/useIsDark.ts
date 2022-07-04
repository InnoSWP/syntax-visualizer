import { useSettingsStore } from "@/stores/settings"
import { storeToRefs } from "pinia"
import { usePreferredDark } from "@vueuse/core"
import { computed } from "vue"

export function useIsDark() {
  const settings = useSettingsStore()
  const { theme } = storeToRefs(settings)
  const isDarkPreferred = usePreferredDark()
  const isDark = computed(() =>
    theme.value === "system" ? isDarkPreferred.value : theme.value === "dark"
  )
  return isDark
}

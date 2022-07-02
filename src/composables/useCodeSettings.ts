import { computed } from "vue"
import { storeToRefs } from "pinia"
import type { FullParserId } from "@/core/languages"
import { useSettingsStore } from "@/stores/settings"

export function useCodeSettings() {
  const { languageId, parserId } = storeToRefs(useSettingsStore())
  const fullParserId = computed(
    (): FullParserId => `${languageId.value}>${parserId.value}`
  )

  return {
    languageId,
    parserId,
    fullParserId,
  }
}

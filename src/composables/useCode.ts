import type { Ref } from "vue"
import { ref, watch } from "vue"
import { watchDebounced } from "@vueuse/core"
import type { LanguageId } from "@/core/languages"
import { useLanguageSampleCode } from "./useLanguageSampleCode"
import { useSavedCode } from "./useSavedCode"

export function useCode(languageId: Ref<LanguageId>) {
  const code = ref("")
  const sampleCode = useLanguageSampleCode(languageId)
  const savedCode = useSavedCode(languageId)
  const isCodeSyncedWithLanguage = ref(false)

  const save = (codeToSave: string) => {
    savedCode.value = codeToSave
  }

  // If code was updated, assume that it was synced with language
  watch(code, () => {
    isCodeSyncedWithLanguage.value = true
  })

  watch(languageId, () => {
    isCodeSyncedWithLanguage.value = false
  })

  watch(
    sampleCode,
    () => {
      if (!isCodeSyncedWithLanguage.value && sampleCode.value) {
        code.value = sampleCode.value
      }
    },
    { immediate: true }
  )

  watch(
    savedCode,
    () => {
      if (!isCodeSyncedWithLanguage.value && savedCode.value) {
        code.value = savedCode.value
      }
    },
    { immediate: true }
  )

  watchDebounced(code, (newCode) => save(newCode), {
    debounce: 1000,
    maxWait: 5000,
  })

  return {
    code,
    save: () => save(code.value),
  }
}

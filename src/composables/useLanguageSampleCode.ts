import type { Ref } from "vue"
import { ref, watch } from "vue"
import type { LanguageId } from "@/core/languages"
import { loadLanguageSampleCode } from "@/core/languages"

export function useLanguageSampleCode(languageId: Ref<LanguageId>) {
  const sampleCode = ref<string>()

  watch(
    languageId,
    (newLanguageId) => {
      loadLanguageSampleCode(languageId.value).then((loaded) => {
        if (newLanguageId === languageId.value && loaded) {
          sampleCode.value = loaded
        }
      })
    },
    { immediate: true }
  )

  return sampleCode
}

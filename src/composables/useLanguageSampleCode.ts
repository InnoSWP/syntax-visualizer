import { watch } from "vue"
import { useParsingStore } from "@/stores/parsing"
import { loadLanguageSampleCode } from "@/core/languages"

export function useLanguageSampleCode() {
  const parsingStore = useParsingStore()

  watch(
    () => parsingStore.languageId,
    (newLanguageId) => {
      loadLanguageSampleCode(newLanguageId).then((sampleCode) => {
        if (
          !parsingStore.userHasEnteredCode &&
          !parsingStore.code.trim() &&
          newLanguageId === parsingStore.languageId &&
          sampleCode
        ) {
          parsingStore.updateCodeExternally(sampleCode)
        }
      })
    },
    { immediate: true }
  )
}

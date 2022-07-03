import type { Ref } from "vue"
import { computed, ref, watch } from "vue"
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string"
import type { LanguageId } from "@/core/languages"

/**
 * Composable that returns a ref to the code that automatically
 * loaded from the local storage and saved to it on changes.
 *
 * @param languageId Identifier of the language of the saved code.
 */
export function useSavedCode(languageId: Ref<LanguageId>) {
  const savedCode = ref<string>()
  const savedCodeKey = computed(() => `code-${languageId.value}`)

  watch(
    savedCodeKey,
    (newKey) => {
      const code = loadCodeFromLocalStorage(newKey)
      if (code) {
        savedCode.value = code
      }
    },
    { immediate: true }
  )

  watch(savedCode, (newCode) => {
    saveCodeToLocalStorage(savedCodeKey.value, newCode)
  })

  return savedCode
}

const loadCodeFromLocalStorage = (key: string) => {
  const code = localStorage.getItem(key)
  if (code) {
    return decompressFromEncodedURIComponent(code)
  }
  return null
}

const saveCodeToLocalStorage = (key: string, code?: string) => {
  if (code) {
    localStorage.setItem(key, compressToEncodedURIComponent(code))
  } else {
    localStorage.removeItem(key)
  }
}

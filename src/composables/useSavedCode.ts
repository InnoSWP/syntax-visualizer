import type { Ref } from "vue"
import { computed, ref, watch } from "vue"
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string"
import type { LanguageId } from "@/core/languages"

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
    if (newCode) {
      saveCodeToLocalStorage(savedCodeKey.value, newCode)
    } else {
      localStorage.removeItem(savedCodeKey.value)
    }
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

const saveCodeToLocalStorage = (key: string, code: string) => {
  localStorage.setItem(key, compressToEncodedURIComponent(code))
}

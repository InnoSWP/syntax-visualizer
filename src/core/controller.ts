import type { Ref } from "vue"
import { ref, watch } from "vue"
import { watchDebounced, watchThrottled } from "@vueuse/core"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/stores/settings"
import type { LanguageID } from "@/core/languages"
import { loadLanguageSampleCode } from "@/core/languages"
import type { ASTNodes, ParseError } from "@/core/types"
import Parser from "@/core/parser"

export function useParsingController() {
  const { languageId, parserName } = storeToRefs(useSettingsStore())
  const parser = new Parser(`${languageId.value}>${parserName.value}`)
  const code = useCode(languageId)
  const debounceTime = useDebounceTimeBasedOnCode(code)
  const isPending = ref(false)
  const loadingParsePromiseVersion = ref()
  const isLoading = ref(false)
  const lastNodes = ref<ASTNodes>()
  const error = ref<ParseError>()

  watch(code, () => {
    isPending.value = true
  })

  watchDebounced(
    code,
    () => {
      const [versionId, promise] = parser.parse(code.value)

      loadingParsePromiseVersion.value = versionId
      isPending.value = false
      isLoading.value = true

      promise.then((result) => {
        if (loadingParsePromiseVersion.value === versionId) {
          isPending.value = false
          isLoading.value = false

          if (result.success) {
            lastNodes.value = result.nodes
            error.value = undefined
          } else {
            error.value = result.error
          }
        }
      })
    },
    { debounce: debounceTime, immediate: true }
  )

  return {
    code,
    lastNodes,
    error,
    isPending,
    isLoading,
  }
}

function useCode(languageId: Ref<LanguageID>) {
  const code = ref("")

  // Set the code to a sample code when the language changes
  watch(
    [code, languageId],
    async ([newCode, newLanguageId], [oldCode, oldLanguageId]) => {
      const wasCodeUpdated = newCode !== oldCode && oldCode !== undefined
      if (wasCodeUpdated) return

      const wasLanguageUpdated = newLanguageId !== oldLanguageId
      if (wasLanguageUpdated) {
        const sampleCode = await loadLanguageSampleCode(newLanguageId)
        code.value = sampleCode || ""
      }
    },
    { immediate: true }
  )

  return code
}

function useDebounceTimeBasedOnCode(code: Ref<string>) {
  const debounceTime = ref(0)

  watchThrottled(
    code,
    () => {
      debounceTime.value = getDebounceTimeForCode(code.value)
    },
    { throttle: 2000 }
  )

  return debounceTime
}

function getDebounceTimeForCode(code: string) {
  const codeSize = code.length
  for (const [maxCodeSize, debounceTime] of DEBOUNCE_TIME_THRESHOLDS) {
    if (codeSize <= maxCodeSize) return debounceTime
  }
  return DEBOUNCE_TIME_THRESHOLDS[DEBOUNCE_TIME_THRESHOLDS.length - 1][0]
}

const DEBOUNCE_TIME_THRESHOLDS = [
  [100, 150],
  [300, 200],
  [500, 250],
  [1000, 300],
  [0, 350],
]

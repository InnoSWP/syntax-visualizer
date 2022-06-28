import type { Ref } from "vue"
import { ref, watch } from "vue"
import { watchDebounced, watchThrottled } from "@vueuse/core"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/stores/settings"
import type { LanguageId, ParserId } from "./languages"
import { loadLanguageSampleCode } from "./languages"
import type { ASTNodes, ParseError } from "./types"
import { ParsingManager } from "./parsing"

export function useController() {
  const { languageId, parserId } = storeToRefs(useSettingsStore())
  const code = useCode(languageId)
  const { isPending, isLoading, lastNodes, error } = useParsingManager(
    code,
    languageId,
    parserId
  )

  return {
    code,
    isPending,
    isLoading,
    lastNodes,
    error,
  }
}

function useCode(languageId: Ref<LanguageId>) {
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

function useParsingManager(
  code: Ref<string>,
  languageId: Ref<LanguageId>,
  parserId: Ref<ParserId>
) {
  const parsingManager = new ParsingManager(
    `${languageId.value}>${parserId.value}`
  )
  const isPending = ref(false)
  const loadingParsePromiseVersion = ref<number>()
  const isLoading = ref(false)
  const lastNodes = ref<ASTNodes>()
  const error = ref<ParseError>()
  const debounceTime = useDebounceTimeBasedOnCode(code)

  watch([languageId, parserId], ([newLanguageId, newParserId]) => {
    parsingManager.setParser(`${newLanguageId}>${newParserId}`)
  })

  watch(
    code,
    () => {
      isPending.value = true
    },
    { immediate: true }
  )

  watchDebounced(
    code,
    () => {
      const [versionId, promise] = parsingManager.parse(code.value)

      loadingParsePromiseVersion.value = versionId
      isPending.value = false
      isLoading.value = true

      promise.then((result) => {
        if (loadingParsePromiseVersion.value === versionId) {
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
    isPending,
    isLoading,
    lastNodes,
    error,
  }
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

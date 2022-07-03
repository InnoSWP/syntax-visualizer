import type { Ref } from "vue"
import { ref, watch } from "vue"
import type { FullParserId } from "@/core/languages"
import { ParsingManager } from "@/core/parsing"
import type { ASTNodes, ParseError } from "@/core/types"
import { watchDebounced } from "@vueuse/core"
import type { TextDebounceTimeThresholds } from "./useDebounceTimeBasedOnTextSize"
import { useDebounceTimeBasedOnTextSize } from "./useDebounceTimeBasedOnTextSize"

export function useParsingManager(
  code: Ref<string>,
  fullParserId: Ref<FullParserId>
) {
  const parsingManager = new ParsingManager()
  const isPending = ref(false)
  const loadingParsePromiseVersion = ref<number>()
  const isLoading = ref(false)
  const lastNodes = ref<ASTNodes>()
  const error = ref<ParseError>()

  watch(
    fullParserId,
    (newParser) => {
      parsingManager.setParser(newParser)
    },
    { immediate: true }
  )

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
    {
      debounce: useDebounceTimeBasedOnTextSize(
        code,
        CODE_SIZE_DEBOUNCE_TIME_THRESHOLDS
      ),
      immediate: true,
    }
  )

  return {
    isPending,
    isLoading,
    lastNodes,
    error,
  }
}

const CODE_SIZE_DEBOUNCE_TIME_THRESHOLDS: TextDebounceTimeThresholds = [
  [100, 150],
  [300, 200],
  [500, 250],
  [1000, 300],
]

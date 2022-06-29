import type { Ref } from "vue"
import { ref, watch } from "vue"
import type { FullParserId } from "@/core/languages"
import { ParsingManager } from "@/core/parsing"
import type { ASTNodes, ParseError } from "@/core/types"
import { watchDebounced, watchThrottled } from "@vueuse/core"

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
  const debounceTime = useDebounceTimeBasedOnCode(code)

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

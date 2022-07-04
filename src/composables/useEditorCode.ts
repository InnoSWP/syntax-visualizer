import { ref, watch } from "vue"
import { watchDebounced, watchIgnorable } from "@vueuse/core"
import { useParsingStore } from "@/stores/parsing"
import type { TextDebounceTimeThresholds } from "./useDebounceTimeBasedOnTextSize"
import { useDebounceTimeBasedOnTextSize } from "./useDebounceTimeBasedOnTextSize"

export function useEditorCode() {
  const parsingStore = useParsingStore()
  const editorCode = ref("")
  const debounceTime = useDebounceTimeBasedOnTextSize(
    editorCode,
    CODE_SIZE_DEBOUNCE_TIME_THRESHOLDS
  )

  const { ignoreUpdates } = watchIgnorable(editorCode, () => {
    parsingStore.userStartedTyping()
  })

  watch(
    () => parsingStore.code,
    (newCode) => {
      ignoreUpdates(() => {
        editorCode.value = newCode
      })
    },
    { immediate: true }
  )

  watchDebounced(
    editorCode,
    (newCode) => {
      parsingStore.userStoppedTyping(newCode)
    },
    { debounce: debounceTime }
  )

  return editorCode
}

const CODE_SIZE_DEBOUNCE_TIME_THRESHOLDS: TextDebounceTimeThresholds = [
  [100, 150],
  [300, 200],
  [500, 250],
  [1000, 300],
]

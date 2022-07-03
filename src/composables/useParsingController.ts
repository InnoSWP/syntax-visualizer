import { watchEffect } from "vue"
import { storeToRefs } from "pinia"
import { useParsingStore } from "@/stores/parsing"
import { useParsingManager } from "./useParsingManager"

export function useParsingController() {
  const parsingStore = useParsingStore()
  const { code, fullParserId } = storeToRefs(parsingStore)
  const { isLoading, nodes, error } = useParsingManager(code, fullParserId)

  watchEffect(() => {
    parsingStore.isParsing = isLoading.value
    if (nodes.value) {
      parsingStore.lastNodes = nodes.value
    }
    parsingStore.error = error.value ?? null
  })
}

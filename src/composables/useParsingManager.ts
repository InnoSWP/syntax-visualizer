import type { Ref } from "vue"
import { ref, watch, watchEffect } from "vue"
import type { ASTNodes, ParseError } from "@/core/types"
import type { FullParserId } from "@/core/languages"
import { ParsingManager } from "@/core/parsing"

export function useParsingManager(
  code: Ref<string>,
  fullParserId: Ref<FullParserId>
) {
  const parsingManager = new ParsingManager()
  const loadingParsePromiseVersion = ref<number>()
  const isLoading = ref(false)
  const nodes = ref<ASTNodes>()
  const error = ref<ParseError>()

  watchEffect(() => {
    parsingManager.setParser(fullParserId.value)
  })

  watch(
    code,
    () => {
      const [versionId, promise] = parsingManager.parse(code.value)

      loadingParsePromiseVersion.value = versionId
      isLoading.value = true

      promise.then((result) => {
        if (versionId === loadingParsePromiseVersion.value) {
          isLoading.value = false

          if (result.success) {
            nodes.value = result.nodes
            error.value = undefined
          } else {
            nodes.value = undefined
            error.value = result.error
          }
        }
      })
    },
    { immediate: true }
  )

  return { isLoading, nodes, error }
}

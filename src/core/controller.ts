import type { Ref } from "vue"
import { ref, watch } from "vue"
import { watchDebounced } from "@vueuse/core"
import { useSettingsStore } from "@/stores/settings"
import languages from "@/core/languages"
import type { AST, FailedParseResult } from "@/core/types"

export function useParsingController(
  debounceTime: Ref<number> | number
): ControllerReturn {
  const { parse, sampleCode } = useLanguageSettings()
  const code = ref<string>(sampleCode)
  const ast = ref<AST | null>(null)
  const error = ref<Omit<FailedParseResult, "success"> | null>(null)
  const isActual = ref<boolean>(false)

  watch(code, () => {
    if (isActual.value) isActual.value = false
  })

  watchDebounced(
    code,
    () => {
      const result = parse(code.value)

      if (result.success) {
        ast.value = result.ast
        error.value = null
      } else {
        error.value = result
      }

      isActual.value = true
    },
    { debounce: debounceTime, immediate: true }
  )

  return { code, ast, error, isActual }
}

export interface ControllerReturn {
  code: Ref<string>
  ast: Ref<AST | null>
  error: Ref<Omit<FailedParseResult, "success"> | null>
  isActual: Ref<boolean>
}

function useLanguageSettings() {
  const { languageId, parserName } = useSettingsStore()

  const language = languages[languageId]
  const parse = language.parsers[parserName].parse
  const sampleCodeRaw = language.sampleCode
  const sampleCode =
    typeof sampleCodeRaw === "string" ? sampleCodeRaw : sampleCodeRaw.join("\n")

  return { parse, sampleCode }
}

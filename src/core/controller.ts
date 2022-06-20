import type { Ref } from "vue"
import { ref, watch } from "vue"
import { watchDebounced } from "@vueuse/core"
import { useSettingsStore } from "@/stores/settings"
import languages from "@/core/languages"
import type { AST, ParseError } from "@/core/types"

export function useParsingController(debounceTime: Ref<number> | number) {
  const { parse, sampleCode } = useLanguageSettings()
  const code = ref<string>(sampleCode)
  const ast = ref<AST | null>(null)
  const error = ref<ParseError | null>(null)
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
        error.value = result.error
      }

      isActual.value = true
    },
    { debounce: debounceTime, immediate: true }
  )

  return { code, ast, error, isActual }
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

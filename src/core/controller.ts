import type { Ref } from "vue"
import { computed, ref, watch } from "vue"
import { watchDebounced, watchThrottled } from "@vueuse/core"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/stores/settings"
import languages, { loadLanguageSampleCode } from "@/core/languages"
import type { AST, ParseError } from "@/core/types"

export function useParsingController() {
  const { languageId, parserName } = storeToRefs(useSettingsStore())
  const parse = computed(
    () => languages[languageId.value].parsers[parserName.value].parse
  )
  const code = useCode()
  const debounceTime = useDebounceTimeBasedOnCode(code)
  const ast = ref<AST>()
  const error = ref<ParseError>()
  const isParsing = ref<boolean>(false)

  watch(code, () => {
    isParsing.value = false
  })

  watchDebounced(
    code,
    () => {
      const result = parse.value(code.value)

      if (result.success) {
        ast.value = result.ast
        error.value = undefined
      } else {
        error.value = result.error
      }

      isParsing.value = true
    },
    { debounce: debounceTime, immediate: true }
  )

  return { code, ast, error, isParsing }
}

function useCode() {
  const code = ref("")
  const { languageId } = storeToRefs(useSettingsStore())

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

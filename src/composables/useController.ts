import { useCodeSettings } from "./useCodeSettings"
import { useCode } from "./useCode"
import { useParsingManager } from "./useParsingManager"

export function useController() {
  const { languageId, parserId, fullParserId } = useCodeSettings()
  const { code, save } = useCode(languageId)
  const { isPending, isLoading, lastNodes, error } = useParsingManager(
    code,
    fullParserId
  )

  return {
    languageId,
    parserId,
    fullParserId,
    code,
    save,
    isPending,
    isLoading,
    lastNodes,
    error,
  }
}

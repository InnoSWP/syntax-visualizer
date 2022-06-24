import type { LanguageSupport } from "@codemirror/language"
import type { LanguageID } from "@/core/languages"
import languages from "@/core/languages"

export default async function (
  languageId: LanguageID
): Promise<LanguageSupport | null> {
  const loader = languages[languageId].codemirrorLoader
  if (loader == null) return null
  try {
    return await loader()
  } catch (error) {
    console.error(`Failed to load support for language "${languageId}".`, error)
    return null
  }
}

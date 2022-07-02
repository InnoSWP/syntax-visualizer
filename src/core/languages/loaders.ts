import type { LanguageSupport } from "@codemirror/language"
import type { LanguageId } from "@/core/languages"
import languages from "@/core/languages"

export async function loadLanguageSampleCode(
  languageId: LanguageId
): Promise<string | null> {
  const language = languages[languageId]
  try {
    const module = await import(
      `./${language.id}/sample.code.${language.fileExtension}`
    )
    return module.default
  } catch (error) {
    return null
  }
}

export async function loadCodemirrorLanguageSupport(
  languageId: LanguageId
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

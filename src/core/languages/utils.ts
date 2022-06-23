import type { LanguageID } from "@/core/languages"
import languages from "@/core/languages"

export async function loadLanguageSampleCode(
  languageId: LanguageID
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

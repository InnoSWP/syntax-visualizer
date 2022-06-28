import type { LanguageSupport } from "@codemirror/language"
import type { FullParserName, LanguageID, ParserName } from "@/core/languages"
import languages from "@/core/languages"
import type { LanguageParserImplementation } from "@/core/types"

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

export async function loadCodemirrorLanguageSupport(
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

export async function loadParserImplementation(
  fullParserName: FullParserName
): Promise<{
  name: FullParserName
  implementation: LanguageParserImplementation<unknown, unknown>
}> {
  const [languageId, parserName] = fullParserName.split(">") as Split<
    FullParserName,
    ">"
  >

  const parser = languages[languageId].parsers[parserName as ParserName]

  return {
    name: fullParserName,
    implementation: await parser.loadImplementation(),
  }
}

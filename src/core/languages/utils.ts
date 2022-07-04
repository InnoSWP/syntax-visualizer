import languages from "@/core/languages/all"
import type {
  LanguageId,
  ParserId,
  ParserIdOfLanguage,
} from "@/core/languages/types"

export function getLanguageDefaultParserId<L extends LanguageId>(
  languageId: L
): ParserIdOfLanguage<L> {
  return languages[languageId].defaultParserId as ParserIdOfLanguage<L>
}

export function isLanguageId(languageId: string): languageId is LanguageId {
  return languages[languageId as LanguageId] != null
}

export function isParserIdOfLanguage<L extends LanguageId>(
  parserId: string,
  languageId: L
): parserId is ParserIdOfLanguage<L> {
  return languages[languageId].parsers[parserId as ParserId] != null
}

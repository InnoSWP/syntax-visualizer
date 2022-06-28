import languages from "./all"

export {
  loadLanguageSampleCode,
  loadCodemirrorLanguageSupport,
} from "./loaders"

export type Languages = typeof languages
export type LanguageID = keyof Languages
export type ParserName = keyof Languages[LanguageID]["parsers"]
export type ParserNameOfLanguage<L extends LanguageID> = Extract<
  keyof Languages[L]["parsers"],
  string
>
export type FullParserNameOfLanguage<L extends LanguageID> =
  `${L}>${ParserNameOfLanguage<L>}`
export type FullParserName = FullParserNameOfLanguage<LanguageID>

export default languages

import javascript from "@/core/languages/javascript"

const languages = {
  [javascript.id]: javascript,
} as const

export default languages

export type Languages = typeof languages
export type LanguageID = keyof Languages
export type ParserName = keyof Languages[LanguageID]["parsers"]
export type ParserNameOfLanguage<L extends LanguageID> =
  keyof Languages[L]["parsers"]

export { loadLanguageSampleCode, loadCodemirrorLanguageSupport } from "./utils"

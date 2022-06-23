import javascript from "@/core/languages/javascript"

const languages = {
  [javascript.id]: javascript,
} as const

export default languages

export type Languages = typeof languages
export type LanguageID = keyof Languages
export type ParserName<L extends LanguageID> = keyof Languages[L]["parsers"]

export { loadLanguageSampleCode } from "./utils"

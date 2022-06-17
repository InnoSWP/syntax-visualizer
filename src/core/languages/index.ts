import javascript from "@/core/languages/javascript"

const languages = {
  [javascript.id]: javascript,
} as const

export type Languages = typeof languages
export type LanguageID = keyof Languages
export type ParserName = keyof Languages[LanguageID]["parsers"]

export default languages

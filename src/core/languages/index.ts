import javascript from "@/core/languages/javascript"

const languages = {
  [javascript.id]: javascript,
} as const

export type Languages = typeof languages
export type LanguageID = keyof Languages
export type ParserName<L extends LanguageID> = keyof Languages[L]["parsers"]

export default languages

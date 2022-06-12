import javascript from "@/core/languages/javascript"

const languages = {
  [javascript.id]: javascript,
} as const

export type LanguageID = keyof typeof languages

export default languages

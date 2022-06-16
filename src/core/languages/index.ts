import javascript from "@/core/languages/javascript"
import type { Language } from "@/core/types"

const languages = {
  [javascript.id]: javascript,
} as Record<string, Language<any, any>>

export type LanguageID = keyof typeof languages

export default languages

import { defineStore } from "pinia"
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string"
import type {
  FullParserId,
  LanguageId,
  ParserId,
  ParserIdOfLanguage,
} from "@/core/languages"
import type { ASTNodes, ParseError } from "@/core/types"
import {
  getLanguageDefaultParserId,
  isLanguageId,
  isParserIdOfLanguage,
} from "@/core/languages/utils"

export const useParsingStore = defineStore("parsing", {
  state: () => ({
    astVariant: "graph" as ASTVariant,
    languageId: "javascript" as LanguageId,
    statesPerLanguage: {} as {
      [key in LanguageId]?: StatePerLanguage<key>
    },
    userHasEnteredCode: false,
    userIsTyping: false,
    isParsing: false,
    lastNodes: null as null | ASTNodes,
    error: null as null | ParseError,
  }),
  getters: {
    currentLanguageState: (state) => {
      if (state.statesPerLanguage[state.languageId] == null) {
        state.statesPerLanguage[state.languageId] = {
          code: "",
          parserId: getLanguageDefaultParserId(state.languageId),
        }
      }

      return state.statesPerLanguage[
        state.languageId
      ] as StatePerLanguage<LanguageId>
    },
    code(): string {
      return this.currentLanguageState.code
    },
    parserId(): ParserId {
      return this.currentLanguageState.parserId
    },
    fullParserId(): FullParserId {
      return `${this.languageId}>${this.parserId}`
    },
    compressedCode(): string {
      return compressToEncodedURIComponent(this.code)
    },
    isError: (state) => state.error != null,
    toObjectForShare(): Record<string, string> {
      return {
        lang: this.languageId,
        parser: this.parserId,
        code: this.compressedCode,
      }
    },
  },
  actions: {
    setLanguage(languageId: LanguageId) {
      if (this.languageId !== languageId) {
        this.userHasEnteredCode = false
        this.languageId = languageId
      }
    },
    userStartedTyping() {
      this.userIsTyping = true
      this.userHasEnteredCode = true
    },
    userStoppedTyping(code: string) {
      this.userIsTyping = false
      this.currentLanguageState.code = code
    },
    updateCodeExternally(code: string) {
      this.currentLanguageState.code = code
    },
    loadFromObjectForShare(obj: {
      lang?: string
      parser?: string
      code?: string
    }) {
      const languageId = obj.lang
      const parserId = obj.parser
      const code = obj.code

      if (languageId != null) {
        if (isLanguageId(languageId)) {
          this.setLanguage(languageId)
          if (parserId != null) {
            if (isParserIdOfLanguage(parserId, languageId)) {
              this.currentLanguageState.parserId = parserId
            } else {
              console.error(
                `Invalid parser ID "${parserId}" for language "${languageId}"`
              )
            }
          }
        } else {
          console.error(`Invalid language ID "${languageId}"`)
        }
      }

      if (code) {
        try {
          const decompressed = decompressFromEncodedURIComponent(code)
          if (decompressed != null) {
            this.currentLanguageState.code = decompressed
          }
        } catch (e) {
          console.error("Failed to decompress code", e)
        }
      }
    },
  },
  persist: {
    paths: ["astVariant", "languageId", "statesPerLanguage"],
  },
})

export type ASTVariant = "graph" | "json"
export type StatePerLanguage<L extends LanguageId> = {
  code: string
  parserId: ParserIdOfLanguage<L>
}

import type { FullParserName } from "@/core/languages"
import type { ParseResult } from "@/core/types"

export type WorkerRequestSetParser = {
  type: "set-parser"
  parser: FullParserName
}

export type WorkerRequestParse = {
  type: "parse"
  version: number
  code: string
  options?: Record<string, unknown>
}

export type WorkerRequest = WorkerRequestSetParser | WorkerRequestParse

export type WorkerResponseParse = {
  type: "parse-result"
  version: number
  result: ParseResult
}

export type WorkerResponse = WorkerResponseParse

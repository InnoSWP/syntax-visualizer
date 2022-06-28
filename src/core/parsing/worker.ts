import type { LanguageParserImplementation } from "@/core/types"
import type { FullParserId } from "@/core/languages"
import type {
  WorkerRequest,
  WorkerRequestParse,
  WorkerResponseParse,
} from "./types"
import { parse } from "./transform"

let parserImplementation: LanguageParserImplementation<
  unknown,
  unknown
> | null = null
let currentParserId: FullParserId | null = null
let requiredParserId: FullParserId | null = null
let parseRequestToExecute: WorkerRequestParse | null = null

onmessage = (event: MessageEvent) => {
  const request = event.data as WorkerRequest

  switch (request.type) {
    case "parse":
      addParseRequest(request)
      executeParseRequestIfPossible()
      break
    case "set-parser":
      requiredParserId = request.parser
      if (currentParserId !== requiredParserId) {
        loadParserImplementation(requiredParserId).then((loaded) => {
          if (loaded.parser === requiredParserId) {
            currentParserId = loaded.parser
            parserImplementation = loaded.implementation
            executeParseRequestIfPossible()
          }
        })
      }
      break
  }
}

function addParseRequest(request: WorkerRequestParse): void {
  parseRequestToExecute = request
}

function executeParseRequestIfPossible(): void {
  if (
    parseRequestToExecute != null &&
    parserImplementation != null &&
    currentParserId != null &&
    currentParserId === requiredParserId
  ) {
    // This might take a while...
    const result = parse(
      parserImplementation,
      parseRequestToExecute.code,
      parseRequestToExecute.options
    )

    const response: WorkerResponseParse = {
      type: "parse-result",
      version: parseRequestToExecute.version,
      result,
    }
    postMessage(response)

    parseRequestToExecute = null
  }
}

export async function loadParserImplementation<P extends FullParserId>(
  fullParserId: P
): Promise<{
  parser: P
  implementation: LanguageParserImplementation<unknown, unknown>
}> {
  const [languageId, parserId] = fullParserId.split(">") as Split<
    FullParserId,
    ">"
  >

  return {
    parser: fullParserId,
    implementation: (
      await import(
        `../languages/${languageId}/parsers/${parserId}/implementation.ts`
      )
    ).default,
  }
}

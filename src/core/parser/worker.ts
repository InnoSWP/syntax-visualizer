import type { LanguageParserImplementation } from "@/core/types"
import type { FullParserName } from "@/core/languages"
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
let currentParserName: FullParserName | null = null
let requiredParserName: FullParserName | null = null
let parseRequestToExecute: WorkerRequestParse | null = null

onmessage = (event: MessageEvent) => {
  const request = event.data as WorkerRequest
  console.log("Worker received message:\n", request)

  switch (request.type) {
    case "parse":
      addParseRequest(request)
      executeParseRequestIfPossible()
      break
    case "set-parser":
      requiredParserName = request.parser
      if (currentParserName !== requiredParserName) {
        loadParserImplementation(requiredParserName).then((loaded) => {
          if (loaded.name === requiredParserName) {
            currentParserName = loaded.name
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
    currentParserName != null &&
    currentParserName === requiredParserName
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

export async function loadParserImplementation(
  fullParserName: FullParserName
): Promise<{
  name: FullParserName
  implementation: LanguageParserImplementation<unknown, unknown>
}> {
  const [languageId, parserName] = fullParserName.split(">") as Split<
    FullParserName,
    ">"
  >
  console.log("LOADING PARSER", languageId, parserName)

  return {
    name: fullParserName,
    implementation: (
      await import(
        `../languages/${languageId}/parsers/${parserName}/implementation.ts`
      )
    ).default,
  }
}
